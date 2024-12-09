import { processExcelFile } from './excelProcessor';

interface UpdateItem {
  description: string;
  justification: string;
}

export async function readExcelFile(file: File): Promise<UpdateItem[]> {
  try {
    return await processExcelFile(file);
  } catch (error) {
    console.error('Error processing Excel file:', error);
    throw error;
  }
}