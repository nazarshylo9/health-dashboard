import { Router } from 'express';
import * as PatientController from '../controllers/patient.controller';
import * as AiController from '../controllers/ai.controller';
import * as StreamController from '../controllers/stream.controller';

const router = Router();

// Patient Routes
router.get('/patients', PatientController.getPatients);
router.get('/patients/:id/biomarkers', PatientController.getBiomarkers);

// AI Routes
router.post('/ai/insights', AiController.getInsights);

// Real-time Stream Endpoint
router.get('/stream', StreamController.streamBiomarkers);

// Health Check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', version: '1.0.0' });
});

export default router;