import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx';
import { ScannedItem } from '../types';
import { Share, Alert } from 'react-native';

export const exportToExcel = async (items: ScannedItem[], balanceName: string) => {
    try {
        // Formato simplificado solicitado: apenas Código e Quantidade
        const ws = XLSX.utils.json_to_sheet(items.map(item => ({
            Codigo: item.code,
            Quantidade: item.quantity
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Contagem");

        const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

        const safeName = balanceName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const fileName = `balanco_${safeName}.xlsx`;

        const dir = FileSystem.cacheDirectory;
        if (!dir) throw new Error("Memória temporária inacessível.");

        // Garante a barra no final do diretório
        const cleanDir = dir.endsWith('/') ? dir : `${dir}/`;
        const uri = cleanDir + fileName;

        await FileSystem.writeAsStringAsync(uri, wbout, {
            encoding: 'base64'
        });

        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(uri, {
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                dialogTitle: 'Enviar Excel',
                UTI: 'com.microsoft.excel.xlsx'
            });
        } else {
            Alert.alert("Aviso", "O envio de arquivos não está disponível. Tente a opção 'Texto'.");
        }
    } catch (error: any) {
        console.error("Excel Export Error:", error);
        Alert.alert("Erro no Excel", error.message);
    }
};

export const shareAsText = async (items: ScannedItem[], balanceName: string) => {
    // Formato estrito: codigo,quantidade (EX: 0000000,5)
    const textContent = items
        .map(item => `${item.code},${item.quantity}`)
        .join('\n');

    try {
        const safeName = balanceName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const fileName = `resumo_${safeName}.txt`;
        const dir = FileSystem.cacheDirectory;

        if (!dir) {
            await Share.share({ message: textContent });
            return;
        }

        const cleanDir = dir.endsWith('/') ? dir : `${dir}/`;
        const uri = cleanDir + fileName;

        await FileSystem.writeAsStringAsync(uri, textContent);

        const isSharingAvailable = await Sharing.isAvailableAsync();

        if (isSharingAvailable) {
            try {
                await Sharing.shareAsync(uri, {
                    mimeType: 'text/plain',
                    dialogTitle: 'Enviar Arquivo TXT',
                    UTI: 'public.plain-text'
                });
            } catch (shareError) {
                // Se falhar o envio do ARQUIVO, envia como MENSAGEM (texto puro)
                await Share.share({ message: textContent });
            }
        } else {
            // Se o sistema não suportar envio de arquivo TXT, manda texto direto
            await Share.share({ message: textContent });
        }

    } catch (error: any) {
        console.error("Text Export Error:", error);
        // Fallback final: envia apenas o texto
        try {
            await Share.share({ message: textContent });
        } catch (finalError) {
            Alert.alert("Erro", "Não foi possível enviar os dados.");
        }
    }
};
