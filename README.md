# 🏥 AI-Powered Health Dashboard (MCP + Real-Time)

A full-stack health monitoring dashboard that integrates **Agentic AI** (via the Model Context Protocol pattern) and **Real-Time Data Streaming** to analyze patient biomarkers.

Built as a Monorepo with **TypeScript**, **React**, **Express**, and **Server-Sent Events (SSE)**.

---

## 🚀 Key Features

* **Real-Time Monitoring:** Live updates from "medical devices" using **Server-Sent Events (SSE)** (simulated 2.5s intervals).
* **AI Agent Integration:** Implements the **MCP (Model Context Protocol)** pattern to analyze health data and suggest actionable monitoring plans.
* **Monorepo Architecture:** Single repository with a shared type system ensuring 100% type safety between Client and Server.
* **Modern UX:** Toast notifications, Skeleton loading states, and responsive design.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite), TypeScript, Tailwind CSS, Recharts, React Hot Toast.
* **Backend:** Node.js, Express, TypeScript.
* **Architecture:**
    * **Shared Types:** `shared/types.ts` is the single source of truth.
    * **Controller/Service Pattern:** Backend logic separated from routes.
    * **SSE (EventSource):** Used for efficient, uni-directional real-time data flow.

---

## 🏁 Getting Started

### 1. Prerequisites
* Node.js (v18 or higher)
* npm

### 2. Installation
The project includes a helper script to install dependencies for the root, client, and server in one go. Run:

```bash
npm run install-all

(This executes: npm install && cd client && npm install && cd ../server && npm install)

### 3. Running the app
Start both the Backend and Frontend concurrently with a single command:

```bash
npm run start

- Frontend: http://localhost:5173

- Backend: http://localhost:3000

🧠 Architecture Decisions

1. Why Server-Sent Events (SSE)?

Instead of WebSockets, I chose SSE for the live monitoring feature
because the data flow is strictly server-to-client (medical device $\rightarrow$ dashboard).
SSE is lighter, works over standard HTTP, and has built-in reconnection logic,
making it the superior choice for a dashboard of this nature.

2. The MCP "Agent" Pattern

The AI logic is encapsulated in server/src/mcp.ts.
It acts as a standalone "tool user" that:
Analyzes Context: Retrieves relevant patient history.
Selects Tools: Decides whether to run a generic analysis or a specific monitoring plan.
Generates Insight: Returns a structured, clinical-grade summary.

Note: In this demo, the AI logic is deterministic (simulated) as per the assessment guidelines,
but the architecture is ready to plug in an LLM (like Claude or GPT-4).

3. Shared Type System

To prevent "drift" between the API and the Frontend,
all data models (Patient, Biomarker) are defined in shared/types.ts.
Both the React client and Express server import from this file.

📂 Project Structure

```text
/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Atomic UI Components
│   │   ├── api.ts          # API Layer
│   │   └── App.tsx         # Main Layout
├── server/                 # Express Backend
│   ├── src/
│   │   ├── controllers/    # Request Handlers
│   │   ├── routes/         # API Endpoints
│   │   ├── mcp.ts          # AI Agent Logic
│   │   └── data.ts         # Data Generator
└── shared/                 # Shared TypeScript Definitions
    └── types.ts            # Single Source of Truth
```

## ✅ Assessment Checklist

| Requirement | Status | Implementation Details |
| :--- | :--- | :--- |
| **Backend API** | ✅ Done | Express, RESTful endpoints, Controller pattern. |
| **Frontend Dashboard** | ✅ Done | React, Tailwind, Recharts. |
| **MCP Integration** | ✅ Done | `mcp.ts` tool definitions exposed via API. |
| **Live Updates** | ✅ Done | Real-time SSE stream (`/api/stream`). |
| **Filtering & Viz** | ✅ Done | Category filters, Interactive Bar Chart. |
| **Bonus** | ✅ Done | Shared Types, Monorepo, Toast Notifications. |

## 🤖 AI Implementation Assistance

This project utilized **Google Gemini** as a technical thought partner throughout the development lifecycle. The assistant was instrumental in the following areas:

* **Architectural Strategy:** Validating the Monorepo structure, shared type system, and the "Controller/Service" backend pattern to ensure scalability.
* **Complex Debugging:** Diagnosing intricate React lifecycle issues, particularly regarding `useEffect` dependencies and connection stability for real-time streams.
* **Performance Optimization:** Advising on high-performance rendering strategies for live data visualization to minimize re-renders and maximize UI responsiveness.
* **Code Refactoring:** Assisting with the decoupling of frontend components and enforcing strict TypeScript standards to maintain a clean and robust codebase.