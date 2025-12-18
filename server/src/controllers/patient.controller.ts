import { Request, Response } from 'express';
import { patients, biomarkers } from '../data';

export const getPatients = (req: Request, res: Response) => {
  res.json(patients);
};

export const getBiomarkers = (req: Request, res: Response) => {
  const { id } = req.params;
  const { category } = req.query;

  // Filter by Patient ID
  let data = biomarkers.filter(b => b.patientId === id);

  // Filter by Category
  if (category && typeof category === 'string') {
    data = data.filter(b => b.category === category);
  }

  res.json(data);
};