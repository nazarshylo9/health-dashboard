import { Request, Response } from 'express';
import { handleAiRequest } from '../mcp';
import { patients } from '../data';

export const getInsights = async (req: Request, res: Response) => {
  const { patientId } = req.body;

  if (!patientId) {
    return res.status(400).json({ error: "Patient ID is required" });
  }

  // Validation: Ensure patient exists
  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  try {
    // Delegate to the MCP Layer
    const insights = await handleAiRequest(patientId);
    res.json(insights);
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to generate AI insights" });
  }
};