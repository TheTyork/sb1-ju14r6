import React, { useState } from 'react';
import { UpdateForm } from './components/UpdateForm';
import { FileText, HelpCircle } from 'lucide-react';
import { InstructionModal } from './components/InstructionModal';

function App() {
  const [isInstructionOpen, setIsInstructionOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Система автоматизации отчетов по обновлениям
              </h1>
            </div>
            <button
              onClick={() => setIsInstructionOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <HelpCircle className="h-5 w-5" />
              Инструкция
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
              <UpdateForm />
            </div>
          </div>
        </div>
      </main>

      <InstructionModal
        isOpen={isInstructionOpen}
        onClose={() => setIsInstructionOpen(false)}
      />
    </div>
  );
}

export default App;
