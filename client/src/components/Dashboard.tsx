import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { api } from '../api';
import type { Biomarker, Patient } from '../../../shared/types';

import { DashboardHeader } from './DashboardHeader';
import { AiInsightsPanel } from './AiInsightsPanel';
import { DashboardGrid } from './DashboardGrid';

interface Props {
  patient: Patient;
}

export const Dashboard: React.FC<Props> = ({ patient }) => {
  // --- STATE ---
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  
  // AI State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<string | null>(null);

  // Live Updates State
  const [isLive, setIsLive] = useState(false);
  
  const eventSourceRef = useRef<EventSource | null>(null);

  // --- EFFECT 1: Fetch Initial Data (FIXED) ---
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await api.getBiomarkers(patient.id, category === 'all' ? undefined : category);
        if (isMounted) {
          setBiomarkers(data.sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime()));
        }
      } catch (err) {
        console.error("Failed to fetch biomarkers", err);
        toast.error("Could not load patient data");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    setAiInsights(null); 
    
    // CHANGE: Only clean up the 'isMounted' flag. 
    // Do NOT close the EventSource here. That is Effect #2's job.
    return () => { 
      isMounted = false; 
    };
  }, [patient.id, category]);

  // --- EFFECT 2: Live Updates via SSE (Unchanged) ---
  useEffect(() => {
    const stopStream = () => {
      if (eventSourceRef.current) {
        console.log("Closing SSE connection...");
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };

    if (isLive) {
      console.log("Starting SSE connection...");
      const es = new EventSource('http://localhost:3000/api/stream');
      eventSourceRef.current = es;

      es.onopen = () => {
        console.log("SSE Connection Open");
        toast.success("Connected to Live Stream", { id: 'live-stream', icon: '✅' });
      };

      es.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.type === 'UPDATE') {
            const updates = parsed.data as Biomarker[];
            
            // Note: We update state regardless of category. 
            // The DashboardGrid component should handle filtering visibility based on 'category' prop.
            setBiomarkers(prev => {
              const existingMap = new Map(prev.map(b => [b.id, b]));
              updates.forEach(update => {
                if (existingMap.has(update.id)) {
                  existingMap.set(update.id, update);
                }
              });
              return Array.from(existingMap.values());
            });
          }
        } catch (e) {
          console.error("Error parsing SSE data", e);
        }
      };

      es.onerror = (err) => {
        console.error("SSE Connection Error:", err);
        stopStream();
        setIsLive(false);
        toast.error("Live connection lost", { id: 'live-stream' });
      };
    } else {
      stopStream();
    }

    // This cleanup runs when 'isLive' changes OR when the component unmounts entirely
    return stopStream;
  }, [isLive]);

  // --- HANDLERS ---
  const handleToggleLive = () => {
    setIsLive(!isLive);
    if (!isLive) {
      toast.loading("Connecting to Hospital Stream...", { id: 'live-stream', icon: '📡' });
    } else {
      toast("Live Monitoring Disconnected", { icon: '🔌' });
    }
  };

  const handleAiAnalysis = async () => {
    setAiLoading(true);
    const toastId = toast.loading("Analyzing biomarkers...");

    try {
      const insights = await api.getAiInsights(patient.id);
      setAiInsights(insights);
      toast.success("Analysis complete!", { id: toastId });
    } catch (e) {
      console.error(e);
      toast.error("Failed to get AI insights", { id: toastId });
    }
    setAiLoading(false);
  };

  // --- RENDER ---
  return (
    <div className="p-6 h-screen overflow-y-auto bg-gray-50 flex-1">
      <DashboardHeader 
        patient={patient}
        isLive={isLive}
        onToggleLive={handleToggleLive}
        aiLoading={aiLoading}
        onAiAnalysis={handleAiAnalysis}
      />

      <AiInsightsPanel 
        insights={aiInsights}
        onClose={() => setAiInsights(null)}
      />

      <DashboardGrid 
        biomarkers={biomarkers}
        loading={loading}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
};