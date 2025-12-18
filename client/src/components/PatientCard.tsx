import React from 'react';
import type { Patient } from '../../../shared/types';

interface PatientCardProps {
  patient: Patient;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(patient.id)}
      className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
        isSelected 
          ? '!bg-blue-50 !border-blue-200 !text-blue-700 !shadow-sm' 
          : 'hover:bg-gray-50 text-gray-600 border-transparent'
      }`}
    >
      <div className={`font-semibold ${isSelected ? '!text-blue-800' : ''}`}>
        {patient.name}
      </div>
      <div className="text-xs opacity-70">DOB: {patient.dateOfBirth}</div>
    </button>
  );
};