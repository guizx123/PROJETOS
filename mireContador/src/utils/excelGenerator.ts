import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx';
import { ScannedItem } from '../types';

export const exportToExcel = async (items: ScannedItem[]) => {
    const ws = XLSX.utils.json_to_sheet(items.map(item => ({
        Codigo: item.code,
        Quantidade: item.quantity,
        Ultimo_Bip: new Date(item.lastScannedAt).toLocaleString()
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contagem");

    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
    // @ts-ignore
    const uri = FileSystem.cacheDirectory + 'coleta.xlsx';

    await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: 'base64'
    });

    await Sharing.shareAsync(uri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: 'Exportar Coleta'
    });
};
