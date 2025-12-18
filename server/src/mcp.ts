import { patients, biomarkers } from './data';

// Tool 1: Analyze Biomarkers (Identify Risks)
export const analyze_biomarkers = (patientId: string) => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) return "Patient not found.";

  const patientBiomarkers = biomarkers.filter(b => b.patientId === patientId);
  
  // Logic: Find abnormal values
  const abnormal = patientBiomarkers.filter(b => b.status !== 'normal');

  if (abnormal.length === 0) {
    return `Analysis for ${patient.name}: All biomarkers are within normal ranges. No immediate risks detected.`;
  }

  const riskList = abnormal.map(b => 
    `- ${b.name}: ${b.value} ${b.unit} (${b.status.toUpperCase()}, Ref: ${b.referenceRange.min}-${b.referenceRange.max})`
  ).join('\n');

  return `Analysis for ${patient.name}:\nFound ${abnormal.length} abnormal biomarkers:\n${riskList}\n\nInterpretation: These deviations may indicate metabolic or hormonal imbalances. Clinical correlation recommended.`;
};

// Tool 2: Suggest Monitoring (Action Plan)
export const suggest_monitoring_priorities = (patientId: string) => {
  const patientBiomarkers = biomarkers.filter(b => b.patientId === patientId);
  const abnormal = patientBiomarkers.filter(b => b.status !== 'normal');
  
  // Logic: Group by category
  const categories = [...new Set(abnormal.map(b => b.category))];

  if (categories.length === 0) {
    return "Standard annual monitoring recommended. No specific priorities.";
  }

  return `Monitoring Priorities:\nBased on abnormal results, prioritize monitoring for:\n${categories.map(c => `- ${c.charAt(0).toUpperCase() + c.slice(1)} Health`).join('\n')}\n\nRecommended Schedule: Repeat abnormal tests in 3 months.`;
};

// The 'Brain' that selects the tool
export const handleAiRequest = async (patientId: string) => {
  // SIMULATION: In a real MCP, an LLM would decide which tool to call based on the user prompt.
  // For this demo, we run BOTH tools to generate a comprehensive "Insight Report".
  
  const analysis = analyze_biomarkers(patientId);
  const plan = suggest_monitoring_priorities(patientId);

  return `### AI Health Analysis\n\n${analysis}\n\n### Recommended Actions\n${plan}`;
};