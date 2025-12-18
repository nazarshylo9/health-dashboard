import { Request, Response } from 'express';
import { biomarkers } from '../data';
import { Biomarker } from '../../../shared/types';

// Store active client connections
let clients: Response[] = [];

// Helper function to create a delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 1. Handler for new connections (Made ASYNC to support await)
export const streamBiomarkers = async (req: Request, res: Response) => {
  console.log('New client attempting to connect...');

  // --- ARTIFICIAL DELAY ---
  // Wait 3 seconds before accepting the connection
  await sleep(1500); 

  // If client gave up waiting, stop here
  if (req.destroyed) return; 

  // A. Set headers for SSE
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'X-Accel-Buffering': 'no'
  };
  res.writeHead(200, headers);

  // B. Add this client to our list
  clients.push(res);
  console.log(`Client connected. Total: ${clients.length}`);

  // C. Send initial connection confirmation
  const initData = JSON.stringify({ type: 'CONNECTED' });
  res.write(`data: ${initData}\n\n`);

  // D. Handle client disconnect
  req.on('close', () => {
    console.log('Client disconnected');
    clients = clients.filter(client => client !== res);
  });
};

// ... (Keep the rest of your simulator code exactly the same)
// 2. The "Medical Device" Simulator...
setInterval(() => {
  // ... existing logic ...
  if (clients.length === 0) return; 

  const updates = biomarkers
    .filter(() => Math.random() > 0.8)
    .map(b => {
      const drift = Math.floor(Math.random() * 5) - 2;
      const newValue = Math.max(0, b.value + drift);
      
      let newStatus: Biomarker['status'] = 'normal';
      if (newValue < b.referenceRange.min) newStatus = 'low';
      if (newValue > b.referenceRange.max) newStatus = 'high';

      b.value = newValue;
      b.status = newStatus;
      b.measuredAt = new Date().toISOString();

      return b;
    });

  if (updates.length > 0) {
    const data = JSON.stringify({ type: 'UPDATE', data: updates });
    clients.forEach(client => client.write(`data: ${data}\n\n`));
  }
}, 2500);