import React from 'react';
import type { Biomarker } from '../../../shared/types'; 

interface Props {
  biomarkers: Biomarker[];
  loading: boolean;
}

export const BiomarkerTable: React.FC<Props> = ({ biomarkers, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">
        Loading biomarkers...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-auto max-h-[500px] min-h-[300px]">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b sticky top-0 z-10">
          <tr>
            <th className="p-4 font-semibold text-gray-600">Biomarker</th>
            <th className="p-4 font-semibold text-gray-600">Value</th>
            <th className="p-4 font-semibold text-gray-600">Ref Range</th>
            <th className="p-4 font-semibold text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {biomarkers.map(b => (
            <tr key={b.id} className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-900">{b.name}</td>
              <td className="p-4 font-mono text-gray-700">
                
                {/* THE TRICK: 
                   1. key={b.value}: Tells React "If value changes, destroy this span and make a new one".
                   2. className="animate-live-update": The new span immediately plays the CSS animation.
                */}
                <span 
                  key={b.value} 
                  className="inline-block px-1.5 py-0.5 rounded animate-live-update"
                >
                  {b.value}
                </span>

                <span className="text-gray-400 text-xs ml-1">{b.unit}</span>
              </td>
              <td className="p-4 text-gray-500">
                {b.referenceRange.min} - {b.referenceRange.max}
              </td>
              <td className="p-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                  ${b.status === 'normal' ? 'bg-green-100 text-green-800' : 
                    b.status === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};