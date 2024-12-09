import React, { useRef } from 'react';
import { Copy, Check } from 'lucide-react';

interface UpdateSummaryProps {
  startDate: string;
  endDate: string;
  notificationType: string;
  copied: boolean;
  onCopy: () => void;
}

export function UpdateSummary({ 
  startDate, 
  endDate,
  notificationType,
  copied,
  onCopy
}: UpdateSummaryProps) {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getSummaryText = () => {
    if (notificationType === 'Обоснование в чат Методологии') {
      return '';
    }
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    return `Обновление системы ВКД АО запланировано на ${formattedStartDate} с 23:00 по 02:00 ${formattedEndDate} МСК\nОбновление системы ВГФК запланировано на ${formattedStartDate} с 23:00 по 02:00 ${formattedEndDate} МСК`;
  };

  const handleCopy = () => {
    if (textRef.current) {
      navigator.clipboard.writeText(textRef.current.value);
      onCopy();
    }
  };

  const summaryText = getSummaryText();
  if (!summaryText) return null;

  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-700">Для новостей</h4>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? 'Скопировано!' : 'Копировать'}
        </button>
      </div>
      <textarea
        ref={textRef}
        value={summaryText}
        readOnly
        className="w-full min-h-[80px] p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 resize-y"
      />
    </div>
  );
}