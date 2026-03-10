import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Balance, ScannedItem } from '../types';
import * as Crypto from 'expo-crypto';
import { dbService } from '../services/database';

interface AppState {
    balances: Balance[];
    activeBalanceId: string | null;
    isInitialized: boolean;

    // Ações (Funções para modificar o estado)
    initStore: () => Promise<void>;
    createBalance: (name: string) => Promise<void>;
    deleteBalance: (id: string) => Promise<void>;
    updateBalanceStatus: (id: string, status: Balance['status']) => Promise<void>;
    setActiveBalance: (id: string | null) => void;

    // Ações de Itens (operam sobre o balanço ativo)
    addItem: (code: string) => Promise<void>;
    removeItem: (code: string) => Promise<void>;
    updateItemQuantity: (code: string, quantity: number) => Promise<void>;
    clearCurrentBalance: () => Promise<void>;

    // Ajudantes (Helpers)
    getActiveBalance: () => Balance | undefined;
}

export const useStore = create<AppState>((set, get) => ({
    balances: [],
    activeBalanceId: null,
    isInitialized: false,

    initStore: async () => {
        if (get().isInitialized) return;

        try {
            await dbService.init();

            // Verifica se há dados legados do AsyncStorage e migra para o SQLite
            const legacyData = await AsyncStorage.getItem('mire-contador-storage');
            if (legacyData) {
                console.log('Migrating legacy data to SQLite...');
                const parsed = JSON.parse(legacyData);
                const oldBalances: Balance[] = parsed.state?.balances || [];

                for (const balance of oldBalances) {
                    await dbService.saveBalance(balance);
                    if (balance.items && balance.items.length > 0) {
                        await dbService.batchInsertItems(balance.id, balance.items);
                    }
                }

                await AsyncStorage.removeItem('mire-contador-storage');
                console.log('Migration complete!');
            }

            // Carrega do SQLite
            const balances = await dbService.getAllBalances();
            set({ balances, isInitialized: true });
        } catch (error) {
            console.error('Failed to initialize store with SQLite:', error);
        }
    },

    createBalance: async (name) => {
        const newBalance: Balance = {
            id: Crypto.randomUUID(),
            name,
            createdAt: new Date().toISOString(),
            status: 'pending',
            items: [],
        };

        await dbService.saveBalance(newBalance);
        set((state) => ({
            balances: [newBalance, ...state.balances],
            activeBalanceId: newBalance.id,
        }));
    },

    deleteBalance: async (id) => {
        await dbService.deleteBalance(id);
        set((state) => ({
            balances: state.balances.filter((b) => b.id !== id),
            activeBalanceId: state.activeBalanceId === id ? null : state.activeBalanceId,
        }));
    },

    updateBalanceStatus: async (id, status) => {
        await dbService.updateBalanceStatus(id, status);
        set((state) => ({
            balances: state.balances.map((b) =>
                b.id === id ? { ...b, status } : b
            ),
        }));
    },

    setActiveBalance: (id) => set({ activeBalanceId: id }),

    getActiveBalance: () => {
        const state = get();
        return state.balances.find((b) => b.id === state.activeBalanceId);
    },

    addItem: async (code) => {
        const state = get();
        const activeId = state.activeBalanceId;
        if (!activeId) return;

        // Normaliza o código: limpa espaços e remove zeros à esquerda
        const normalizedCode = code.trim().replace(/^0+/, '');
        if (!normalizedCode) return; // Ignora se estiver vazio após a normalização
        const now = new Date().toISOString();

        const balanceIndex = state.balances.findIndex((b) => b.id === activeId);
        if (balanceIndex === -1) return;

        const currentBalance = state.balances[balanceIndex];
        const itemIndex = currentBalance.items.findIndex((i) => i.code === normalizedCode);

        let updatedItem: ScannedItem;
        if (itemIndex >= 0) {
            updatedItem = {
                ...currentBalance.items[itemIndex],
                quantity: currentBalance.items[itemIndex].quantity + 1,
                lastScannedAt: now,
            };
        } else {
            updatedItem = { code: normalizedCode, quantity: 1, lastScannedAt: now };
        }

        try {
            // Aguarda a sincronização com o banco para evitar problemas de concorrência
            await dbService.upsertItem(activeId, updatedItem);

            set((state) => {
                const bIdx = state.balances.findIndex((b) => b.id === activeId);
                if (bIdx === -1) return state;

                const newBalances = [...state.balances];
                const targetBalance = { ...newBalances[bIdx] };
                const newItems = [...targetBalance.items];

                const iIdx = newItems.findIndex(i => i.code === normalizedCode);
                if (iIdx >= 0) {
                    newItems[iIdx] = updatedItem;
                } else {
                    newItems.unshift(updatedItem);
                }

                targetBalance.items = newItems;
                newBalances[bIdx] = targetBalance;
                return { balances: newBalances };
            });
        } catch (error) {
            console.error('Failed to add item to DB:', error);
            throw error;
        }
    },

    removeItem: async (code) => {
        const activeId = get().activeBalanceId;
        if (!activeId) return;

        await dbService.removeItem(activeId, code);

        set((state) => {
            const balanceIndex = state.balances.findIndex((b) => b.id === activeId);
            if (balanceIndex === -1) return state;

            const currentBalance = state.balances[balanceIndex];
            const newItems = currentBalance.items.filter((i) => i.code !== code);

            const newBalances = [...state.balances];
            newBalances[balanceIndex] = { ...currentBalance, items: newItems };
            return { balances: newBalances };
        });
    },

    updateItemQuantity: async (code, quantity) => {
        const state = get();
        const activeId = state.activeBalanceId;
        if (!activeId) return;

        const now = new Date().toISOString();
        const balanceIndex = state.balances.findIndex((b) => b.id === activeId);
        if (balanceIndex === -1) return;

        const currentBalance = state.balances[balanceIndex];
        const itemIndex = currentBalance.items.findIndex((i) => i.code === code);
        if (itemIndex === -1) return;

        const updatedItem = {
            ...currentBalance.items[itemIndex],
            quantity,
            lastScannedAt: now,
        };

        try {
            await dbService.upsertItem(activeId, updatedItem);

            set((state) => {
                const bIdx = state.balances.findIndex((b) => b.id === activeId);
                if (bIdx === -1) return state;

                const newItems = [...state.balances[bIdx].items];
                const iIdx = newItems.findIndex(i => i.code === code);
                if (iIdx !== -1) {
                    newItems[iIdx] = updatedItem;
                }

                const newBalances = [...state.balances];
                newBalances[bIdx] = { ...newBalances[bIdx], items: newItems };
                return { balances: newBalances };
            });
        } catch (error) {
            console.error('Failed to update item quantity in DB:', error);
            throw error;
        }
    },

    clearCurrentBalance: async () => {
        const activeId = get().activeBalanceId;
        if (!activeId) return;

        await dbService.clearBalanceItems(activeId);

        set((state) => {
            const balanceIndex = state.balances.findIndex((b) => b.id === activeId);
            if (balanceIndex === -1) return state;

            const newBalances = [...state.balances];
            newBalances[balanceIndex] = { ...newBalances[balanceIndex], items: [] };
            return { balances: newBalances };
        });
    },
}));
