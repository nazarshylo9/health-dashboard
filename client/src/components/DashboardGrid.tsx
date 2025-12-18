import React from 'react';
import type { Biomarker } from '../../../shared/types';
import { BiomarkerTable } from './BiomarkerTable';
import { BiomarkerChart } from './BiomarkerChart';

interface Props {
  biomarkers: Biomarker[];
  loading: boolean;
  category: string;
  setCategory: (cat: string) => void;
}

export const DashboardGrid: React.FC<Props> = ({ 
  biomarkers, 
  loading, 
  category, 
  setCategory 
}) => {
  const categories = ['all', 'metabolic', 'cardiovascular', 'hormonal'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column: Filters + Table */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Category Filters */}
        <div className="bg-white p-1 rounded-lg border inline-flex">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-all ${
                category === cat 
                  ? 'bg-indigo-100 text-indigo-700 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <BiomarkerTable biomarkers={biomarkers} loading={loading} />
      </div>

      {/* Right Column: Chart */}
      <div className="lg:col-span-1">
        <BiomarkerChart biomarkers={biomarkers} />
      </div>
    </div>
  );
};