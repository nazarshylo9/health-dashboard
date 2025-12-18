import React from 'react';
import { Zap, X } from 'lucide-react'; // <--- Import 'X' icon

interface Props {
  insights: string | null;
  onClose: () => void; // <--- Add onClose prop
}

export const AiInsightsPanel: React.FC<Props> = ({ insights, onClose }) => {
  if (!insights) return null;

  return (
    <div className="relative mb-6 bg-indigo-50 border border-indigo-100 p-4 rounded-xl shadow-sm animate-in fade-in slide-in-from-top-4">
      {/* Close Button positioned Top-Right */}
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 p-1 text-indigo-400 hover:text-indigo-700 hover:bg-indigo-100 rounded-full transition-colors"
        title="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3 pr-6"> {/* Added padding-right to prevent text overlap */}
        <div className="p-2 bg-indigo-100 rounded-lg shrink-0">
          <Zap className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="prose prose-sm max-w-none text-indigo-900">
           <pre className="whitespace-pre-wrap font-sans">{insights}</pre>
        </div>
      </div>
    </div>
  );
};