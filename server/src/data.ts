// server/src/data.ts

// 1. Import Shared Interfaces (Single Source of Truth)
// This ensures the server matches the client types exactly.
import { Patient, Biomarker, BiomarkerCategory, BiomarkerStatus } from '../../shared/types';

// 2. Helper to generate random date
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

// 3. Define Realistic Names
const REALISTIC_NAMES = [
  "Sarah Miller",
  "Marcus Chen",
  "Elena Rodriguez",
  "James Wilson",
  "David Okonjo"
];

// 4. Generate Patients
export const patients: Patient[] = Array.from({ length: 5 }, (_, i) => ({
  id: `p-${i + 1}`,
  name: REALISTIC_NAMES[i], // Using realistic names
  dateOfBirth: randomDate(new Date(1950, 0, 1), new Date(2000, 0, 1)),
  lastVisit: new Date().toISOString()
}));

// 5. Biomarker Templates (Expanded for variety)
const biomarkerTemplates = [
  { name: "Glucose", unit: "mg/dL", min: 70, max: 99, category: "metabolic" },
  { name: "HbA1c", unit: "%", min: 4, max: 5.6, category: "metabolic" },
  { name: "Cholesterol", unit: "mg/dL", min: 125, max: 200, category: "cardiovascular" },
  { name: "Triglycerides", unit: "mg/dL", min: 0, max: 150, category: "cardiovascular" },
  { name: "Cortisol", unit: "mcg/dL", min: 6, max: 23, category: "hormonal" },
  { name: "TSH", unit: "mIU/L", min: 0.4, max: 4.0, category: "hormonal" }
] as const;

// 6. Generate Biomarkers
export const biomarkers: Biomarker[] = [];

patients.forEach(patient => {
  // Generate 3 sets of readings (Historical data for better charts)
  for (let i = 0; i < 3; i++) { 
    biomarkerTemplates.forEach((template, index) => {
      // Create a bit of random variance based on template ranges
      const value = Math.floor(Math.random() * (template.max * 1.5 - template.min * 0.5) + template.min * 0.5);
      
      let status: BiomarkerStatus = "normal";
      if (value < template.min) status = "low";
      if (value > template.max) status = "high";

      // Create a date that is 'i' days in the past (0, 30, 60 days ago)
      const date = new Date();
      date.setDate(date.getDate() - i * 30); 

      biomarkers.push({
        id: `b-${patient.id}-${i}-${index}`,
        patientId: patient.id,
        name: template.name,
        value: value,
        unit: template.unit,
        category: template.category as BiomarkerCategory,
        referenceRange: { min: template.min, max: template.max },
        measuredAt: date.toISOString(),
        status: status
      });
    });
  }
});

// Export helper to regenerate data if needed (optional)
export const generateData = () => ({ patients, biomarkers });