export interface ScannedItem {
    code: string;
    quantity: number;
    lastScannedAt: string; // ISO string
}

export interface Balance {
    id: string;
    name: string;
    createdAt: string; // ISO string
    items: ScannedItem[];
}
