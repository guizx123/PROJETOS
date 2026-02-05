import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Balance, ScannedItem } from '../types';
import * as Crypto from 'expo-crypto';

interface AppState {
    balances: Balance[];
    activeBalanceId: string | null;

    // Balance Actions
    createBalance: (name: string) => void;
    deleteBalance: (id: string) => void;
    setActiveBalance: (id: string | null) => void;

    // Item Actions (operate on active balance)
    addItem: (code: string) => void;
    removeItem: (code: string) => void;
    clearCurrentBalance: () => void;

    // Helpers
    getActiveBalance: () => Balance | undefined;
}

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            balances: [],
            activeBalanceId: null,

            createBalance: (name) => {
                const newBalance: Balance = {
                    id: Crypto.randomUUID(),
                    name,
                    createdAt: new Date().toISOString(),
                    items: [],
                };
                set((state) => ({
                    balances: [newBalance, ...state.balances],
                    activeBalanceId: newBalance.id,
                }));
            },

            deleteBalance: (id) =>
                set((state) => ({
                    balances: state.balances.filter((b) => b.id !== id),
                    activeBalanceId: state.activeBalanceId === id ? null : state.activeBalanceId,
                })),

            setActiveBalance: (id) => set({ activeBalanceId: id }),

            getActiveBalance: () => {
                const state = get();
                return state.balances.find((b) => b.id === state.activeBalanceId);
            },

            addItem: (code) =>
                set((state) => {
                    if (!state.activeBalanceId) return state;

                    const balanceIndex = state.balances.findIndex((b) => b.id === state.activeBalanceId);
                    if (balanceIndex === -1) return state;

                    const currentBalance = state.balances[balanceIndex];
                    const itemIndex = currentBalance.items.findIndex((i) => i.code === code);

                    let newItems = [...currentBalance.items];

                    if (itemIndex >= 0) {
                        // Update existing
                        newItems[itemIndex] = {
                            ...newItems[itemIndex],
                            quantity: newItems[itemIndex].quantity + 1,
                            lastScannedAt: new Date().toISOString(),
                        };
                    } else {
                        // Add new
                        newItems = [
                            { code, quantity: 1, lastScannedAt: new Date().toISOString() },
                            ...newItems,
                        ];
                    }

                    const newBalances = [...state.balances];
                    newBalances[balanceIndex] = { ...currentBalance, items: newItems };

                    return { balances: newBalances };
                }),

            removeItem: (code) =>
                set((state) => {
                    if (!state.activeBalanceId) return state;

                    const balanceIndex = state.balances.findIndex((b) => b.id === state.activeBalanceId);
                    if (balanceIndex === -1) return state;

                    const currentBalance = state.balances[balanceIndex];
                    const newItems = currentBalance.items.filter((i) => i.code !== code);

                    const newBalances = [...state.balances];
                    newBalances[balanceIndex] = { ...currentBalance, items: newItems };

                    return { balances: newBalances };
                }),

            clearCurrentBalance: () =>
                set((state) => {
                    if (!state.activeBalanceId) return state;

                    const balanceIndex = state.balances.findIndex((b) => b.id === state.activeBalanceId);
                    if (balanceIndex === -1) return state;

                    const newBalances = [...state.balances];
                    newBalances[balanceIndex] = { ...newBalances[balanceIndex], items: [] };

                    return { balances: newBalances };
                }),
        }),
        {
            name: 'mire-contador-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
