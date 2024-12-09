import React from 'react';

interface UpdateItemProps {
  index: number;
  description: string;
  justification: string;
  onDescriptionChange: (value: string) => void;
  onJustificationChange: (value: string) => void;
  showJustification: boolean;
}

export function UpdateItem({
  index,
  description,
  justification,
  onDescriptionChange,
  onJustificationChange,
  showJustification,
}: UpdateItemProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-gray-200 first:border-t-0 first:pt-0">
      <div>
        <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
          Описание пункта {index + 1}
        </label>
        <textarea
          id={`description-${index}`}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-y min-h-[100px]"
          placeholder="Опишите выполненные обновления..."
        />
      </div>

      {showJustification && (
        <div>
          <label htmlFor={`justification-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
            Обоснование
          </label>
          <textarea
            id={`justification-${index}`}
            value={justification}
            onChange={(e) => onJustificationChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-y min-h-[75px]"
            placeholder="Укажите обоснование..."
          />
        </div>
      )}
    </div>
  );
}