import React, { useState } from 'react';
import type { Patient } from '../../../shared/types';
import { PatientCard } from './PatientCard';
import { PatientSearch } from './PatientSearch';

interface Props {
  patients: Patient[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const PatientList: React.FC<Props> = ({ patients, selectedId, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Logic: Filter patients based on search term
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-64 border-r border-gray-200 h-screen bg-white p-4 flex flex-col">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Patients</h2>
      
      {/* 1. The Search Component */}
      <PatientSearch 
        value={searchTerm} 
        onChange={setSearchTerm} 
      />

      {/* 2. The List Area */}
      <div className="flex-1 overflow-y-auto space-y-2 -mx-2 px-2">
        {filteredPatients.length > 0 ? (
          filteredPatients.map(p => (
            <PatientCard
              key={p.id}
              patient={p}
              isSelected={selectedId === p.id} 
              onSelect={onSelect}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            No patients found
          </div>
        )}
      </div>
    </div>
  );
};