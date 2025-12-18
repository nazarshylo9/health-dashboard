import React from 'react';
import { RefreshCw, Zap } from 'lucide-react';
import type { Patient } from '../../../shared/types';

interface Props {
  patient: Patient;
  isLive: boolean;
  onToggleLive: () => void;
  aiLoading: boolean;
  onAiAnalysis: () => void;
}

export const DashboardHeader: React.FC<Props> = ({ 
  patient, 
  isLive, 
  onToggleLive, 
  aiLoading, 
  onAiAnalysis 
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{patient.name}</h1>
        <p className="text-gray-500">Last Visit: {patient.lastVisit.split('T')[0]}</p>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Live Toggle */}
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border shadow-sm">
          <span className={`text-sm font-medium ${isLive ? 'text-green-600' : 'text-gray-500'}`}>
            {isLive ? '● Live Monitoring' : '○ Offline'}
          </span>
          <button 
            onClick={onToggleLive}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isLive ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${isLive ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        
        {/* AI Button */}
        <button 
          onClick={onAiAnalysis}
          disabled={aiLoading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm disabled:opacity-50 transition-all"
        >
          {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
          {aiLoading ? 'Analyzing...' : 'Get AI Insights'}
        </button>
      </div>
    </div>
  );
};