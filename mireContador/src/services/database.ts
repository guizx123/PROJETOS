import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Balance, ScannedItem } from '../types';

const DATABASE_NAME = 'mire_coletor.db';

let _db: SQLite.SQLiteDatabase | null = null;

export const dbService = {
    async getDb() {
        if (!_db) {
            _db = await SQLite.openDatabaseAsync(DATABASE_NAME);
        }
        return _db;
    },

    async init() {
        try {
            const db = await this.getDb();

            // Tabela para Balanços (Inventários)
            await db.runAsync(`
                CREATE TABLE IF NOT EXISTS balances (
                    id TEXT PRIMARY KEY NOT NULL,
                    name TEXT NOT NULL,
                    createdAt TEXT NOT NULL,
                    status TEXT NOT NULL DEFAULT 'pending'
                );
            `);

            // Migração para usuários existentes: Adiciona a coluna 'status' se ela não existir
            try {
                await db.runAsync('ALTER TABLE balances ADD COLUMN status TEXT NOT NULL DEFAULT "pending"');
            } catch (_e) {
                // A coluna provavelmente já existe, o que não tem problema
            }

            // Tabela para Itens Escaneados
            await db.runAsync(`
                CREATE TABLE IF NOT EXISTS items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    balanceId TEXT NOT NULL,
                    code TEXT NOT NULL,
                    quantity REAL NOT NULL,
                    lastScannedAt TEXT NOT NULL,
                    FOREIGN KEY (balanceId) REFERENCES balances (id) ON DELETE CASCADE
                );
            `);

            // Adiciona índices para melhorar a performance das consultas
            await db.runAsync('CREATE INDEX IF NOT EXISTS idx_items_balanceId ON items(balanceId)');
            await db.runAsync('CREATE INDEX IF NOT EXISTS idx_items_code_balanceId ON items(code, balanceId)');

            console.log('SQLite Database Initialized');
        } catch (error) {
            console.error('Database Init Error:', error);
            Alert.alert("Erro de Banco", "Não foi possível inicializar o banco de dados.");
        }
    },

    // --- Balanços (Inventários) ---
    async getAllBalances(): Promise<Balance[]> {
        const db = await this.getDb();
        const balances = await db.getAllAsync<any>('SELECT * FROM balances ORDER BY createdAt DESC');

        // Carrega os itens de cada balanço para manter a estrutura original da Store
        const results: Balance[] = [];
        for (const b of balances) {
            const items = await db.getAllAsync<ScannedItem>(
                'SELECT code, quantity, lastScannedAt FROM items WHERE balanceId = ? ORDER BY lastScannedAt DESC',
                [b.id]
            );
            results.push({ ...b, items });
        }
        return results;
    },

    async saveBalance(balance: Balance) {
        const db = await this.getDb();
        await db.runAsync(
            'INSERT OR REPLACE INTO balances (id, name, createdAt, status) VALUES (?, ?, ?, ?)',
            [balance.id, balance.name, balance.createdAt, balance.status || 'pending']
        );
    },

    async updateBalanceStatus(id: string, status: string) {
        const db = await this.getDb();
        await db.runAsync('UPDATE balances SET status = ? WHERE id = ?', [status, id]);
    },

    async deleteBalance(id: string) {
        const db = await this.getDb();
        await db.runAsync('DELETE FROM balances WHERE id = ?', [id]);
        await db.runAsync('DELETE FROM items WHERE balanceId = ?', [id]);
    },

    // --- Itens ---
    async upsertItem(balanceId: string, item: ScannedItem) {
        const db = await this.getDb();

        // Verifica se o item já existe para este balanço
        const existing = await db.getFirstAsync<any>(
            'SELECT id FROM items WHERE balanceId = ? AND code = ?',
            [balanceId, item.code]
        );

        if (existing) {
            await db.runAsync(
                'UPDATE items SET quantity = ?, lastScannedAt = ? WHERE balanceId = ? AND code = ?',
                [item.quantity, item.lastScannedAt, balanceId, item.code]
            );
        } else {
            await db.runAsync(
                'INSERT INTO items (balanceId, code, quantity, lastScannedAt) VALUES (?, ?, ?, ?)',
                [balanceId, item.code, item.quantity, item.lastScannedAt]
            );
        }
    },

    async removeItem(balanceId: string, code: string) {
        const db = await this.getDb();
        await db.runAsync('DELETE FROM items WHERE balanceId = ? AND code = ?', [balanceId, code]);
    },

    async clearBalanceItems(balanceId: string) {
        const db = await this.getDb();
        await db.runAsync('DELETE FROM items WHERE balanceId = ?', [balanceId]);
    },

    async batchInsertItems(balanceId: string, items: ScannedItem[]) {
        const db = await this.getDb();

        // Tamanho do lote: 100 itens por vez para evitar limites de parâmetros ou timeouts
        const CHUNK_SIZE = 100;
        for (let i = 0; i < items.length; i += CHUNK_SIZE) {
            const chunk = items.slice(i, i + CHUNK_SIZE);

            await db.withTransactionAsync(async () => {
                for (const item of chunk) {
                    await db.runAsync(
                        'INSERT INTO items (balanceId, code, quantity, lastScannedAt) VALUES (?, ?, ?, ?)',
                        [balanceId, item.code, item.quantity, item.lastScannedAt]
                    );
                }
            });
            console.log(`Inserted chunk ${Math.floor(i / CHUNK_SIZE) + 1} of ${Math.ceil(items.length / CHUNK_SIZE)}`);
        }
    }
};
