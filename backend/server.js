// // backend/server.js

// // 1. ES Module Imports
// import express from 'express';
// import cors from 'cors';
// import axios from 'axios'; // For making API calls to the ML Service

// // IMPORTANT: Import the systemState variable and all necessary exported functions
// import { 
//     systemState, 
//     simulateRealTimeData, // <-- RETAINED: The core simulation function (energy, production, etc.)
//     updateCurrentPrice, 
//     updateMLProductionTarget // Placeholder function to satisfy import
// } from './systemState.js'; 

// // --- Configuration ---
// const app = express();
// const PORT = 3001; // Port for the Node.js Backend/API
// const ML_SERVICE_URL = 'http://localhost:5000/predict/production-rate'; // Assumes ML model runs on port 5000

// // Simulation and Update Intervals (in milliseconds)
// const SIMULATION_INTERVAL_MS = 5000;      // Update the entire system state every 5 seconds (The "old logic")
// const ML_UPDATE_INTERVAL_MS = 60000;      // Update the target rate from ML every 60 seconds
// const PRICE_UPDATE_INTERVAL_MS = 60000; // Update the calculated electricity price every 60 seconds

// // --- Function to Call the ML Model ---
// /**
//  * Collects current system features, sends them to the external ML Service,
//  * and updates the systemState's targetRate with the prediction.
//  */
// const getMlPrediction = async () => {
//     // 1. Prepare the data payload (features) for the ML model
//     const mlInputData = {
//         solar: systemState.energy.solar,
//         wind: systemState.energy.wind,
//         batteryCharge: systemState.energy.battery.charge,
//         electricityPrice: systemState.market.electricityPrice,
//         hydrogenDemand: systemState.market.hydrogenDemand,
//         // Add any other features your ML model uses
//     };

//     try {
//         // 2. Send POST request to the ML Service
//         const response = await axios.post(ML_SERVICE_URL, mlInputData);
        
//         // 3. Extract the prediction (e.g., recommendedRate)
//         const recommendedRate = response.data.recommendedRate;

//         // Ensure the recommended rate is within realistic bounds (0 to maxCapacity)
//         const newTargetRate = Math.max(0, Math.min(recommendedRate, systemState.production.maxCapacity));
        
//         // 4. Update the system state with the ML prediction
//         systemState.production.targetRate = newTargetRate;
//         systemState.analytics.predictiveProductionPlanning.recommendedRate = newTargetRate;
        
//         console.log(`[ML] New Target Rate set: ${newTargetRate.toFixed(0)} kg/hr`);

//     } catch (error) {
//         // Fallback or error logging if ML service is unavailable or errors out
//         const status = error.response ? error.response.status : 'N/A';
//         const errorMessage = error.message.split('\n')[0];
//         console.error(`[ML Error] Could not fetch prediction (Status: ${status}): ${errorMessage}`);
//         // Keep the previous target rate as a fallback strategy
//     }
// };

// // --- Middleware Setup ---
// app.use(cors()); // Enable CORS for frontend access
// app.use(express.json());

// // --------------------------------------------------------------------------
// // --- Start Simulation and Control Loops ---
// // --------------------------------------------------------------------------

// // 1. Core Data Simulation Loop (Runs every 5 seconds)
// // This is your essential, old logic for energy and state updates.
// setInterval(() => {
//     simulateRealTimeData();
// }, SIMULATION_INTERVAL_MS);


// // 2. PRICE UPDATE LOOP (Runs immediately and then every 60 seconds)
// // This handles the new dynamic price calculation.
// updateCurrentPrice(); 
// setInterval(() => {
//     updateCurrentPrice();
// }, PRICE_UPDATE_INTERVAL_MS);


// // 3. ML Prediction and Control Loop (Runs immediately and then every 60 seconds)
// // This handles the target production rate update.
// getMlPrediction(); 
// setInterval(() => {
//     getMlPrediction();
// }, ML_UPDATE_INTERVAL_MS);


// // --- API Endpoint ---
// // This endpoint returns the entire current state of the hydrogen plant.
// app.get('/api/system-state', (req, res) => {
//     // Send the current systemState object, which is constantly updated by the loops above
//     res.json(systemState);
// });

// // --- Start Server ---
// app.listen(PORT, () => {
//     console.log(`🚀 Hydrogen Plant Backend running on http://localhost:${PORT}`);
//     console.log(`API Endpoint: http://localhost:${PORT}/api/system-state`);
//     console.log(`ML Service target: ${ML_SERVICE_URL}`);
// });

// backend/server.js

// import express from 'express';
// import cors from 'cors';
// import axios from 'axios';
// import { 
//     systemState, 
//     simulateRealTimeData,
//     updateCurrentPrice 
// } from './systemState.js'; 

// const app = express();
// const PORT = 3001;
// const ML_SERVICE_URL = 'http://localhost:5000/predict/production-rate';

// const SIMULATION_INTERVAL_MS = 5000;
// const ML_UPDATE_INTERVAL_MS = 10000; // Increased frequency for testing
// const PRICE_UPDATE_INTERVAL_MS = 60000;

// const getMlPrediction = async () => {
//     const mlInputData = {
//         solar: systemState.energy.solar,
//         wind: systemState.energy.wind,
//         electricityPrice: systemState.market.electricityPrice,
//     };

//     try {
//         const response = await axios.post(ML_SERVICE_URL, mlInputData);
        
//         // --- THIS IS THE FIX ---
//         // We now correctly read BOTH values from the ML service response
//         const { recommendedRate, pred_class } = response.data;

//         if (recommendedRate === undefined || pred_class === undefined) {
//             throw new Error("ML service response is missing 'recommendedRate' or 'pred_class'");
//         }

//         const newTargetRate = Math.max(0, Math.min(recommendedRate, systemState.production.maxCapacity));
        
//         // And we save BOTH values into the system state
//         systemState.production.targetRate = newTargetRate;
//         systemState.analytics.predictiveProductionPlanning.recommendedRate = newTargetRate;
//         systemState.analytics.predictiveProductionPlanning.pred_class = pred_class; // <-- THIS LINE WAS MISSING
        
//         console.log(`[ML] Success! New Target Rate: ${newTargetRate.toFixed(0)} kg/hr, Class: ${pred_class}`);

//     } catch (error) {
//         const status = error.response ? error.response.status : 'N/A';
//         const errorMessage = error.message.split('\n')[0];
//         console.error(`[ML Error] Could not fetch prediction (Status: ${status}): ${errorMessage}`);
//         // As a fallback, clear the prediction class so the UI shows "Connecting..."
//         systemState.analytics.predictiveProductionPlanning.pred_class = null;
//     }
// };

// app.use(cors());
// app.use(express.json());

// // --- Start Simulation and Control Loops ---
// setInterval(simulateRealTimeData, SIMULATION_INTERVAL_MS);
// updateCurrentPrice(); 
// setInterval(updateCurrentPrice, PRICE_UPDATE_INTERVAL_MS);
// getMlPrediction(); 
// setInterval(getMlPrediction, ML_UPDATE_INTERVAL_MS);

// // --- API Endpoint ---
// app.get('/api/system-state', (req, res) => {
//     res.json(systemState);
// });

// // --- Start Server ---
// app.listen(PORT, () => {
//     console.log(`🚀 Hydrogen Plant Backend running on http://localhost:${PORT}`);
//     console.log(`API Endpoint: http://localhost:${PORT}/api/system-state`);
//     console.log(`ML Service target: ${ML_SERVICE_URL}`);
// });

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { 
    systemState, 
    simulateRealTimeData,
    updateCurrentPrice 
} from './systemState.js'; 

const app = express();
const PORT = 3001;
const ML_SERVICE_URL = 'http://localhost:5000/predict/production-rate';

const SIMULATION_INTERVAL_MS = 5000;
const ML_UPDATE_INTERVAL_MS = 10000;
const PRICE_UPDATE_INTERVAL_MS = 60000;

const getMlPrediction = async () => {
    const mlInputData = {
        solar: systemState.energy.solar,
        wind: systemState.energy.wind,
        electricityPrice: systemState.market.electricityPrice,
    };

    try {
        const response = await axios.post(ML_SERVICE_URL, mlInputData);
        
        // --- THIS IS THE FIX ---
        // We now correctly read all FOUR values from the ML service response
        const { 
            recommendedRate, 
            pred_class, 
            electrolyzer_efficiency, 
            system_efficiency 
        } = response.data;

        if (recommendedRate === undefined || pred_class === undefined || electrolyzer_efficiency === undefined || system_efficiency === undefined) {
            throw new Error("ML service response is missing one or more required fields.");
        }

        const newTargetRate = Math.max(0, Math.min(recommendedRate, systemState.production.maxCapacity));
        
        // And we save ALL values into the system state
        systemState.production.targetRate = newTargetRate;
        systemState.analytics.predictiveProductionPlanning.recommendedRate = newTargetRate;
        systemState.analytics.predictiveProductionPlanning.pred_class = pred_class;
        systemState.analytics.electrolyzerEfficiency = electrolyzer_efficiency; // <-- THIS LINE WAS MISSING
        systemState.analytics.systemEfficiency = system_efficiency;         // <-- THIS LINE WAS MISSING
        
        console.log(`[ML] Success! Rate: ${newTargetRate.toFixed(0)}, Class: ${pred_class}, E-Eff: ${electrolyzer_efficiency.toFixed(1)}%, S-Eff: ${system_efficiency.toFixed(1)}%`);

    } catch (error) {
        const status = error.response ? error.response.status : 'N/A';
        const errorMessage = error.message.split('\n')[0];
        console.error(`[ML Error] Could not fetch prediction (Status: ${status}): ${errorMessage}`);
        systemState.analytics.predictiveProductionPlanning.pred_class = null;
    }
};

app.use(cors());
app.use(express.json());

// --- Start Simulation and Control Loops ---
setInterval(simulateRealTimeData, SIMULATION_INTERVAL_MS);
updateCurrentPrice(); 
setInterval(updateCurrentPrice, PRICE_UPDATE_INTERVAL_MS);
getMlPrediction(); 
setInterval(getMlPrediction, ML_UPDATE_INTERVAL_MS);

// --- API Endpoint ---
app.get('/api/system-state', (req, res) => {
    res.json(systemState);
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Hydrogen Plant Backend running on http://localhost:${PORT}`);
    console.log(`API Endpoint: http://localhost:${PORT}/api/system-state`);
    console.log(`ML Service target: ${ML_SERVICE_URL}`);
});