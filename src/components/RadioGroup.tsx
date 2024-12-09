import React from 'react';

interface RadioGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  disabled?: boolean;
}

export function RadioGroup({ options, value, onChange, name, disabled }: RadioGroupProps) {
  return (
    <div className="flex gap-4">
      {options.map((option) => (
        <label 
          key={option} 
          className={`flex items-center space-x-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
          />
          <span className="text-sm text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );
}