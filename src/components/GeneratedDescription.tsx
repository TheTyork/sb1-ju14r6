import React, { useRef } from 'react';
import { Copy, Check } from 'lucide-react';

interface GeneratedDescriptionProps {
  description: string;
  onDescriptionChange: (value: string) => void;
  copied: boolean;
  onCopy: () => void;
}

export function GeneratedDescription({ 
  description, 
  onDescriptionChange,
  copied,
  onCopy
}: GeneratedDescriptionProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = () => {
    if (textareaRef.current) {
      navigator.clipboard.writeText(textareaRef.current.value);
      onCopy();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Сформированное описание</h3>
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
        ref={textareaRef}
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className="w-full min-h-[200px] p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-y"
      />
    </div>
  );
}