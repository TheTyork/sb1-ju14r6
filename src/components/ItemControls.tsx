import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface ItemControlsProps {
  onAddItem: () => void;
  onDeleteItem: (index?: number) => void;
  totalItems: number;
}

export function ItemControls({ onAddItem, onDeleteItem, totalItems }: ItemControlsProps) {
  const [deleteIndex, setDeleteIndex] = useState('');

  const handleDelete = () => {
    const index = deleteIndex ? parseInt(deleteIndex, 10) - 1 : undefined;
    if (index !== undefined && (index < 0 || index >= totalItems)) {
      return; // Invalid index
    }
    onDeleteItem(index);
    setDeleteIndex('');
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onAddItem}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Добавить пункт
      </button>

      <div className="flex items-center gap-2">
        <input
          type="number"
          value={deleteIndex}
          onChange={(e) => setDeleteIndex(e.target.value)}
          min="1"
          max={totalItems}
          placeholder="№"
          className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        />
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <Minus className="h-4 w-4" />
          Удалить пункт
        </button>
      </div>
    </div>
  );
}