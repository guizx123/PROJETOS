export interface ScannedItem {
    code: string;
    quantity: number;
    lastScannedAt: string; // ISO string
}

export type BalanceStatus = 'pending' | 'completed' | 'canceled' | 'deleted';

export interface Balance {
    id: string;
    name: string;
    createdAt: string; // ISO string
    status: BalanceStatus;
    items: ScannedItem[];
}
