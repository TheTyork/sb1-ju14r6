import React, { useState, useEffect } from 'react';
import { DateRangePicker } from './DateRangePicker';
import { RadioGroup } from './RadioGroup';
import { GeneratedDescription } from './GeneratedDescription';
import { UpdateItem } from './UpdateItem';
import { ItemControls } from './ItemControls';
import { SystemNotification } from './SystemNotification';
import { UpdateSummary } from './UpdateSummary';
import { ClipboardList, FileUp } from 'lucide-react';
import { formatDescription } from '../utils/formatDescription';
import { readExcelFile } from '../utils/fileUtils';

interface UpdateItemData {
  description: string;
  justification: string;
}

export function UpdateForm() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [updateItems, setUpdateItems] = useState<UpdateItemData[]>([
    { description: '', justification: '' }
  ]);
  const [showGenerated, setShowGenerated] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [summaryCopied, setSummaryCopied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  // Radio group states
  const [systemType, setSystemType] = useState('');
  const [notificationType, setNotificationType] = useState('');

  // Update notification type when system type changes
  useEffect(() => {
    if (systemType === 'ВКД АО') {
      setNotificationType('Оповещение в чат ТОФК');
    }
  }, [systemType]);

  const handleClear = () => {
    setUpdateItems([{ description: '', justification: '' }]);
    setShowGenerated(false);
    setGeneratedText('');
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const items = await readExcelFile(file);
        setUpdateItems(items);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  const handleAddItem = () => {
    setUpdateItems([...updateItems, { description: '', justification: '' }]);
  };

  const handleDeleteItem = (index?: number) => {
    if (updateItems.length <= 1) return;
    
    const newItems = [...updateItems];
    if (index !== undefined) {
      newItems.splice(index, 1);
    } else {
      newItems.pop();
    }
    setUpdateItems(newItems);
  };

  const handleUpdateItem = (index: number, field: keyof UpdateItemData, value: string) => {
    const newItems = [...updateItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setUpdateItems(newItems);
  };

  const handleGenerateDescription = (e: React.FormEvent) => {
    e.preventDefault();
    const text = formatDescription(
      systemType,
      notificationType,
      startDate,
      endDate,
      updateItems
    );
    setGeneratedText(text);
    setShowGenerated(true);
    setShowNotification(true);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSummaryCopy = () => {
    setSummaryCopied(true);
    setTimeout(() => setSummaryCopied(false), 2000);
  };

  const showJustification = systemType === 'ВГФК' && notificationType === 'Обоснование в чат Методологии';

  return (
    <form onSubmit={handleGenerateDescription} className="space-y-6">
      <div className="flex gap-4">
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onClear={handleClear}
        />
        <label className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
          <FileUp className="h-5 w-5" />
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          File
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Система
          </label>
          <RadioGroup
            options={['ВКД АО', 'ВГФК']}
            value={systemType}
            onChange={setSystemType}
            name="systemType"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Тип оповещения
          </label>
          <RadioGroup
            options={['Оповещение в чат ТОФК', 'Обоснование в чат Методологии']}
            value={notificationType}
            onChange={setNotificationType}
            name="notificationType"
            disabled={systemType === 'ВКД АО'}
          />
        </div>
      </div>

      <div className="space-y-6">
        {updateItems.map((item, index) => (
          <UpdateItem
            key={index}
            index={index}
            description={item.description}
            justification={item.justification}
            onDescriptionChange={(value) => handleUpdateItem(index, 'description', value)}
            onJustificationChange={(value) => handleUpdateItem(index, 'justification', value)}
            showJustification={showJustification}
          />
        ))}
        
        <ItemControls
          onAddItem={handleAddItem}
          onDeleteItem={handleDeleteItem}
          totalItems={updateItems.length}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        <ClipboardList className="h-5 w-5" />
        Сформировать описание
      </button>

      {showGenerated && (
        <>
          <GeneratedDescription
            description={generatedText}
            onDescriptionChange={setGeneratedText}
            copied={copied}
            onCopy={handleCopy}
          />
          <UpdateSummary
            startDate={startDate}
            endDate={endDate}
            notificationType={notificationType}
            copied={summaryCopied}
            onCopy={handleSummaryCopy}
          />
        </>
      )}

      <SystemNotification
        systemType={systemType}
        notificationType={notificationType}
        show={showNotification}
      />
    </form>
  );
}