import React from 'react';
import { X } from 'lucide-react';

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InstructionModal({ isOpen, onClose }: InstructionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Инструкция</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="prose prose-sm max-w-none">
            <h3>Основные функции:</h3>
            <ol>
              <li>Выберите даты начала и окончания обновления</li>
              <li>Выберите систему (ВКД АО или ВГФК)</li>
              <li>Выберите тип оповещения</li>
              <li>Заполните описание пунктов и обоснования</li>
              <li>Используйте кнопки "Добавить пункт" и "Удалить пункт" для управления списком</li>
              <li>Нажмите "Сформировать описание" для генерации текста</li>
            </ol>

            <h3>Особенности:</h3>
            <ul>
              <li>При выборе ВКД АО автоматически выбирается "Оповещение в чат ТОФК"</li>
              <li>Поле "Для новостей" отображается только если не выбран тип "Обоснование в чат Методологии"</li>
              <li>Все текстовые поля автоматически расширяются при необходимости</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}