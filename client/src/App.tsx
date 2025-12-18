import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { api } from './api';
import type { Patient } from '../../shared/types';
import { PatientList } from './components/PatientList';
import { Dashboard } from './components/Dashboard';

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    api.getPatients()
      .then(data => {
        if (data.length > 0) {
          setPatients(data);
          setSelectedId(data[0].id); 
        }
      })
      .catch(err => {
        console.error("Failed to load patients", err);
      });
  }, []);

  const selectedPatient = patients.find(p => p.id === selectedId);

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900">
      <Toaster 
        position="bottom-right" 
        toastOptions={{ 
          duration: 4000,
          className: '!text-lg !font-medium !p-5 !max-w-md !rounded-xl !shadow-2xl !bg-white !text-gray-800 !border !border-gray-100',
          success: {
            className: '!border-l-4 !border-l-green-500 !shadow-green-50',
          },
          error: {
            className: '!border-l-4 !border-l-red-500 !shadow-red-50',
          },
          loading: {
            className: '!border-l-4 !border-l-blue-500',
          },
        }} 
      />

      <PatientList 
        patients={patients} 
        selectedId={selectedId} 
        onSelect={setSelectedId} 
      />
      
      <main className="flex-1 bg-gray-50 h-full overflow-hidden">
        {selectedPatient ? (
          <Dashboard patient={selectedPatient} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a patient to view details
          </div>
        )}
      </main>
    </div>
  );
}

export default App;