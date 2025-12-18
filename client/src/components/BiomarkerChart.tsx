import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';
import type { Biomarker } from '../../../shared/types';

interface Props {
  biomarkers: Biomarker[];
}

export const BiomarkerChart: React.FC<Props> = ({ biomarkers }) => {
  // Process data: get latest value for each unique biomarker
  const chartData = Object.values(biomarkers.reduce((acc, curr) => {
    if (!acc[curr.name] || new Date(curr.measuredAt) > new Date(acc[curr.name].measuredAt)) {
      acc[curr.name] = curr;
    }
    return acc;
  }, {} as Record<string, Biomarker>)).map(b => ({
    name: b.name,
    value: b.value
  }));

  // --- DYNAMIC HEIGHT CALCULATION ---
  // Base height (header + padding) + (Height per bar * Number of bars)
  // We ensure a minimum height of 320px (h-80) so it never looks too small.
  const BAR_HEIGHT = 60; // Pixels per row
  const MIN_HEIGHT = 320;
  const containerHeight = Math.max(MIN_HEIGHT, (chartData.length * BAR_HEIGHT) + 60);

  return (
    <div>
      {/* Replaced fixed 'h-80' with inline style for dynamic height */}
      <div 
        className="bg-white p-4 rounded-xl shadow-sm border transition-all duration-300"
        style={{ height: `${containerHeight}px` }}
      >
        <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Analysis Overview</h3>
        
        {/* ResponsiveContainer will fill the dynamic parent height */}
        <ResponsiveContainer width="100%" height="100%">
          {/* Added 'margin' to prevent YAxis labels from getting cut off */}
          <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={100} 
              tick={{fontSize: 12, fill: '#6b7280'}} // Improved tick text color
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              cursor={{fill: '#f3f4f6'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar 
              dataKey="value" 
              fill="#6366f1" 
              radius={[0, 4, 4, 0]} 
              barSize={24} // Slightly thicker bars
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
        <div className="flex gap-3">
          <Activity className="text-blue-600 w-5 h-5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 text-sm">Health Tip</h4>
            <p className="text-xs text-blue-700 mt-1 leading-relaxed">
              Consistent monitoring of metabolic markers like Glucose can prevent long-term complications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};