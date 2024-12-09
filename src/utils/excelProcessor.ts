import { read, utils, write, WorkBook, WorkSheet } from 'xlsx';
import { saveAs } from 'file-saver';

interface RawRow {
  '#': string;
  'Проект': string;
  'Описание доработки': string;
  'Связанные обращения': string;
  [key: string]: string;
}

interface ProcessedRow {
  description: string;
  justification: string;
}

export async function processExcelFile(file: File): Promise<ProcessedRow[]> {
  const workbook = await readWorkbook(file);
  const worksheet = getFirstWorksheet(workbook);
  const jsonData = convertToJson(worksheet);
  const processedData = filterAndTransformRows(jsonData);
  
  // Automatically save the processed file
  await saveProcessedFile(processedData, file.name);
  
  return processedData;
}

function readWorkbook(file: File): Promise<WorkBook> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        resolve(workbook);
      } catch (error) {
        reject(new Error('Failed to read Excel file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

function getFirstWorksheet(workbook: WorkBook): WorkSheet {
  const firstSheetName = workbook.SheetNames[0];
  return workbook.Sheets[firstSheetName];
}

function convertToJson(worksheet: WorkSheet): RawRow[] {
  return utils.sheet_to_json(worksheet);
}

function filterAndTransformRows(rows: RawRow[]): ProcessedRow[] {
  return rows
    .filter(row => {
      const description = row['Описание доработки']?.trim();
      const justification = row['Связанные обращения']?.trim();
      return description && justification;
    })
    .map(row => ({
      description: row['Описание доработки'].trim(),
      justification: row['Связанные обращения'].trim()
    }));
}

async function saveProcessedFile(data: ProcessedRow[], originalFileName: string): Promise<void> {
  // Create a new workbook
  const workbook = utils.book_new();
  
  // Transform data back to the required format
  const worksheetData = data.map((row, index) => ({
    '#': (index + 1).toString(),
    'Проект': '',
    'Описание доработки': row.description,
    'Связанные обращения': row.justification
  }));
  
  // Create worksheet
  const worksheet = utils.json_to_sheet(worksheetData);
  
  // Add worksheet to workbook
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
  // Generate buffer
  const excelBuffer = write(workbook, { 
    bookType: 'xls',
    type: 'array'
  });
  
  // Create blob and save file
  const blob = new Blob([excelBuffer], { 
    type: 'application/vnd.ms-excel'
  });
  
  // Generate new filename
  const newFileName = originalFileName.replace(/\.[^/.]+$/, '') + '_processed.xls';
  
  // Save file
  saveAs(blob, newFileName);
}