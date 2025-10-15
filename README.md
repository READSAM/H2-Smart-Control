# H2-Smart-Control
Smart Control Process System for  Hydrogen production from Renewable Energy sources
# Summary

This project presents a smart hydrogen production prototype that leverages real-time solar and wind energy data, combined with machine learning, to recommend optimal hydrogen production rates and monitor efficiency. The system features a live dashboard for operators, translating limited data into actionable insights for improved sustainability and resource utilization. Designed for scalability, the prototype provides an immediate digital upgrade for hydrogen plants and is ready to incorporate additional capabilities like storage, logistics management, and predictive maintenance as more operational data becomes available.

⚙️ **Backend Architecture**
The backend operates as two interconnected services: a Node.js API Server (the controller) and a Python ML Service (the prediction engine).

1.**Node.js API Server (Port 3001)**
This server runs the simulation, manages the system state, and exposes the primary data endpoint (/api/system-state).

Simulation Loop: Runs every 60 seconds to generate dynamic Solar and Wind inputs, update the Electricity Price, and then call the Python service for a new production target.

**Key Files**:

->server.js: Main entry point and loop controller.

->systemState.js: Manages current system data and energy simulation.

->priceService.js: Generates the fluctuating real-time grid price.

2. **Python ML Prediction Service (Port 5000)**
This service uses Flask to expose the /predict/production-rate endpoint.

Prediction Logic: Due to the provided ML model's strong bias (always predicting 56 kg/hr), the prediction step was replaced with a rule-based heuristic to ensure dynamic and realistic simulation results based on two critical inputs: Electricity Price and Total Renewable Energy.

Condition	Rate (kg/hr)	Logic:
High	56 kg/hr	Price≤$120/MWh AND Renewables≥20 MW
Low	48 kg/hr	Price≥$180/MWh OR Renewables<5 MW
Medium	52 kg/hr	All other conditions
🚀 To Run the Backend
Both services must be started in separate terminal windows:

Start Python Service:
Bash:
cd ml-service
python app.py
Start Node.js Server:
Bash
node backend/server.js
