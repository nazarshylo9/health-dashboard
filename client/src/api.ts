const API_URL = 'http://localhost:3000/api';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  lastVisit: string;
}

export interface Biomarker {
  id: string;
  patientId: string;
  name: string;
  value: number;
  unit: string;
  category: 'metabolic' | 'cardiovascular' | 'hormonal';
  referenceRange: { min: number; max: number };
  measuredAt: string;
  status: 'normal' | 'high' | 'low';
}

export const api = {
  getPatients: async (): Promise<Patient[]> => {
    const res = await fetch(`${API_URL}/patients`);
    return res.json();
  },
  
  getBiomarkers: async (patientId: string, category?: string): Promise<Biomarker[]> => {
    const url = category 
      ? `${API_URL}/patients/${patientId}/biomarkers?category=${category}`
      : `${API_URL}/patients/${patientId}/biomarkers`;
    const res = await fetch(url);
    return res.json();
  },

  getAiInsights: async (patientId: string): Promise<string> => {
    const res = await fetch(`${API_URL}/ai/insights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId })
    });
  
    const data = await res.json();
  
    // If data is an object with an insights property, return that.
    // Otherwise, if data is already a string, return it directly.
    return data.insights || data;
  }
};