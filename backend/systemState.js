// // // backend/systemState.js

// // import { calculateGenerationBaselines } from "./dataService.js"; // Note: Added .js extension for modern Node.js module imports
// // // --------------------------------------------------------------------------
// // // 🚀 NEW IMPORT 🚀
// // import { getHourlyElectricityPrice } from './priceService.js'; 
// // // --------------------------------------------------------------------------

// // // --- BASELINE CONSTANTS (Initially set to safe fallbacks) ---
// // // These will be updated by the API call in initializeSystem()
// // export let BASE_SOLAR_MW = 15; // <-- ADDED EXPORT
// // export let BASE_WIND_MW = 10;  // <-- ADDED EXPORT

// // export let CURRENT_ELECTRICITY_PRICE_USD_MWH = 100.00; 
// // // --- System State Object ---
// // // ADDED 'export'
// // export let systemState = {
// //     // 1. Smart Renewable Energy Generation
// //     // ... (All existing systemState object properties) ...
    
// //     // NOTE: The electricityPrice in systemState.market should reflect the $/MWh from the new service, 
// //     // but the analytics section still uses $/kWh. We'll adjust the market value to match the service unit.
// //     market: {
// //         electricityPrice: 100.00, // $/MWh (Updated to match priceService unit)
// //         hydrogenDemand: 150, // kg/hr
// //         demandForecast: {
// //             nextHour: 160,
// //             next24Hours: { min: 100, max: 220 }
// //         }
// //     },
// //     analytics: {
// //         predictiveMaintenance: {
// //             alert: 'None',
// //             nextServiceDue: 'PEM-E2 in 7 days',
// //         },
// //         predictiveProductionPlanning: {
// //             recommendedRate: 135, // kg/hr
// //             forecastedRenewablePeak: '14:00 (15 MW)',
// //             forecastedDemandPeak: '18:00 (200 kg/hr)',
// //         },
// //         energyCost: 0.045, // $/kWh current average (Note: 0.045 $/kWh = 45 $/MWh)
// //         carbonIntensity: 15, // gCO2/kWh (grid mix carbon intensity)
// //         systemHealth: 'Optimal', // Overall system health
// //     },
// //     // ... (rest of systemState remains the same)
// // };

// // // --- Helper Functions and Constants ---
// // // ... (All helper functions and constants like fluctuate, HOURLY_SOLAR_PATTERN, etc. remain the same) ...


// // // --------------------------------------------------------------------------
// // // 🚀 NEW PRICE UPDATE FUNCTION 🚀
// // // --------------------------------------------------------------------------
// // /**
// //  * Fetches the calculated price and updates both the global variable 
// //  * and the systemState object. This is called periodically by server.js.
// //  */
// // export function updateCurrentPrice() { // <-- FIX 1: ADDED EXPORT
// //     try {
// //         const newPriceMWh = getHourlyElectricityPrice();
// //         CURRENT_ELECTRICITY_PRICE_USD_MWH = newPriceMWh;
        
// //         // Update the public systemState object using $/MWh for the market price
// //         systemState.market.electricityPrice = newPriceMWh;
        
// //         // Update the analytics energy cost, converting MWh to kWh (1 MWh = 1000 kWh)
// //         systemState.analytics.energyCost = parseFloat((newPriceMWh / 1000).toFixed(4)); 
        
// //         console.log(`[Price Service] Updated Electricity Price: $${newPriceMWh}/MWh`);
// //         return newPriceMWh;
// //     } catch (error) {
// //         console.error(`[Price Service] Failed to update price: ${error.message}. Keeping old price.`);
// //         return CURRENT_ELECTRICITY_PRICE_USD_MWH;
// //     }
// // }
// // // --------------------------------------------------------------------------


// // // --------------------------------------------------------------------------
// // // 🚀 INITIALIZATION LOGIC 🚀
// // // --------------------------------------------------------------------------
// // // ... (initializeSystem function remains the same) ...
// // // ... (initializeSystem() call remains the same) ...
// // // --------------------------------------------------------------------------

// // // The main simulation function that updates the system state
// // export const simulateRealTimeData = () => { // <-- Already exported, good.
// //     const now = new Date();
// //     const hours = now.getHours();
// //     // ... (all other time declarations) ...

// //     // ... (Energy Input Simulation remains the same) ...
// //     // ... (Battery & Grid Logic remains the same) ...
// //     // ... (Production Simulation remains the same) ...
// //     // ... (Storage Simulation remains the same) ...
// //     // ... (Logistics Simulation remains the same) ...

// //     // --- Analytics & Market Simulation ---
// //     // ... (Analytics updates remain the same) ...

// //     // --------------------------------------------------------------------------
// //     // 💥 FIX 2: REMOVE CONFLICTING PRICE LOGIC 💥
// //     // The new function `updateCurrentPrice()` now handles the price update.
// //     // Comment out the old price simulation to prevent it from overwriting the new dynamic price.
// //     // systemState.market.electricityPrice = fluctuate(systemState.market.electricityPrice, 0.005, 0.02, 0.07);
// //     // systemState.market.electricityPrice *= HOURLY_GRID_PRICE_PATTERN[hours];
// //     // systemState.market.electricityPrice = fluctuate(systemState.market.electricityPrice, 0.002, 0.02, 0.1); 
// //     // --------------------------------------------------------------------------

// //     systemState.market.hydrogenDemand = fluctuate(systemState.market.hydrogenDemand, 5, 80, 250);
// //     systemState.market.hydrogenDemand *= HOURLY_HYDROGEN_DEMAND_PATTERN[hours]; // Apply hourly pattern to demand
// //     systemState.market.hydrogenDemand = fluctuate(systemState.market.hydrogenDemand, 2, 50, 250); // Small fluctuation after pattern

// //     systemState.market.demandForecast.nextHour = fluctuate(systemState.market.hydrogenDemand * 1.1, 10, 80, 250);
    
// //     // ... (Overall system health logic remains the same) ...
// // };

// // // ... (Ensure updateMLProductionTarget is also exported if it's used by server.js, 
// // //      but it wasn't defined in the provided code, so let's assume it's commented out or defined elsewhere for now)

// // // Assuming updateMLProductionTarget is defined here, ensure it's exported:
// // // export function updateMLProductionTarget() { ... } 
// // // Since it was imported in server.js, you must define and export it here for a clean solution.
// // // For now, let's just make sure the critical price fixes are complete.

// // // --------------------------------------------------------------------------
// // // EXPORT NECESSARY ITEMS FOR server.js
// // // --------------------------------------------------------------------------
// // // Note: You must ensure `updateMLProductionTarget` is also exported if server.js imports it.
// // // Since it's not defined here, for a quick fix, if you don't need it yet, you might temporarily adjust server.js to not import it, 
// // // OR define a placeholder function here. For a *correct* file, we'll assume it exists and should be exported.
// // // Since it's imported, we'll assume the final version of this file defines it:
// // // export function updateMLProductionTarget() { /* ... ML target logic ... */ }

// // backend/systemState.js

// import { calculateGenerationBaselines } from "./dataService.js"; 
// import { getHourlyElectricityPrice } from './priceService.js'; 

// // --- BASELINE CONSTANTS ---
// export let BASE_SOLAR_MW = 15; 
// export let BASE_WIND_MW = 10;  

// export let CURRENT_ELECTRICITY_PRICE_USD_MWH = 100.00; 

// // --- System State Object ---
// export let systemState = {
//     // 1. Smart Renewable Energy Generation
//     energy: {
//         solar: 0, 
//         wind: 0,  
//         gridImport: 0, 
//         gridExport: 0, 
//         battery: {
//             charge: 50, 
//             capacityMWh: 5,
//             flowMW: 0 
//         },
//         totalRenewable: 0, 
//         totalAvailable: 0, 
//     },
//     production: {
//         currentRate: 0, 
//         targetRate: 150, 
//         maxCapacity: 300, 
//         capacityUsage: 0, 
//         hydrogenPurity: 99.999, 
//         electrolyzers: [
//             { id: 1, name: 'PEM-E1', status: 'Running', efficiency: 52, health: 'Good', capacity: 90, currentLoad: 80, waterFlow: 120, purity: 99.999 },
//             { id: 2, name: 'PEM-E2', status: 'Running', efficiency: 55, health: 'Good', capacity: 80, currentLoad: 70, waterFlow: 110, purity: 99.998 },
//             { id: 3, name: 'Alkaline-E3', status: 'Warning', efficiency: 60, health: 'Efficiency Low', capacity: 60, currentLoad: 40, waterFlow: 90, purity: 99.995 },
//             { id: 4, name: 'PEM-E4', status: 'Stopped', efficiency: 0, health: 'Offline', capacity: 0, currentLoad: 0, waterFlow: 0, purity: 0 },
//         ],
//         waterTreatment: {
//             status: 'Active',
//             flowRate: 350, 
//             qualityPPM: 0.05 
//         },
//         compressionUnit: {
//             status: 'Active',
//             pressureBar: 350,
//             energyConsumptionMW: 0.8
//         },
//     },
//     storage: {
//         tanks: [
//             { id: 'T1', type: 'Compressed Gas', capacity: 1000, current: 500, pressure: 350, unit: 'kg', status: 'Optimal', integrity: 'Good' },
//             { id: 'T2', type: 'Liquid Hydrogen', capacity: 2000, current: 1000, temp: -253, unit: 'kg', status: 'Optimal', boilOffRate: 0.05 },
//             { id: 'T3', type: 'Underground Cavern', capacity: 50000, current: 25000, unit: 'kg', status: 'Optimal', integrity: 'Good', pressure: 100 },
//         ],
//     },
//     logistics: {
//         deliveriesInProgress: 0,
//         fleetActive: 0,
//         totalDeliveriesToday: 0,
//         optimizedRouteSuggestion: 'Awaiting Optimization...',
//         deliveries: [
//             { id: 101, route: 'Plant A -> Station X', truck: 'TRK-001', status: 'In Transit', eta: '1.5 hrs', hydrogen: 500, timestamp: Date.now() - 3600000 },
//             { id: 102, route: 'Plant A -> Industrial B', truck: 'TRK-002', status: 'Scheduled', eta: '3 hrs', hydrogen: 1000, timestamp: Date.now() + 7200000 },
//         ],
//         fleetStatus: [
//             { id: 'TRK-001', type: 'Tube Trailer', status: 'Active', location: 'Highway 101', load: 500, health: 'Good' },
//             { id: 'TRK-002', type: 'Tube Trailer', status: 'Idle', location: 'Plant A', load: 0, health: 'Good' },
//             { id: 'TRK-003', type: 'Liquid Tanker', status: 'Offline', location: 'Maintenance Depot', load: 0, health: 'Under Repair' },
//             { id: 'TRK-004', type: 'Tube Trailer', status: 'Idle', location: 'Plant B', load: 0, health: 'Good' },
//         ],
//     },
//     analytics: {
//         predictiveMaintenance: {
//             alert: 'None',
//             nextServiceDue: 'PEM-E2 in 7 days',
//         },
//         predictiveProductionPlanning: {
//             recommendedRate: 135, 
//             forecastedRenewablePeak: '14:00 (15 MW)',
//             forecastedDemandPeak: '18:00 (200 kg/hr)',
//         },
//         energyCost: 0.045, 
//         carbonIntensity: 15, 
//         systemHealth: 'Optimal', 
//     },
//     market: {
//         electricityPrice: 100.00, 
//         hydrogenDemand: 150, 
//         demandForecast: {
//             nextHour: 160,
//             next24Hours: { min: 100, max: 220 }
//         }
//     }
// };

// // --- Helper Functions and Constants ---
// const fluctuate = (value, maxChange, min = 0, max = Infinity) => {
//     const change = (Math.random() - 0.5) * maxChange;
//     return Math.max(min, Math.min(max, value + change));
// };

// let deliveryCounter = 102; 
// const PLANT_CAPACITY_MW = 25; 
// const H2_PER_MWH = 12; 

// const HOURLY_SOLAR_PATTERN = [
//     0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 
//     0.3, 0.5, 0.7, 0.9, 1.0, 1.0, 
//     0.9, 0.7, 0.5, 0.3, 0.1, 0.0, 
//     0.0, 0.0, 0.0, 0.0, 0.0, 0.0  
// ];

// const HOURLY_WIND_PATTERN = [
//     0.6, 0.7, 0.8, 0.8, 0.7, 0.6, 
//     0.5, 0.4, 0.4, 0.5, 0.6, 0.7, 
//     0.8, 0.9, 1.0, 1.0, 0.9, 0.8, 
//     0.7, 0.7, 0.6, 0.6, 0.6, 0.6  
// ];

// const HOURLY_HYDROGEN_DEMAND_PATTERN = [
//     0.5, 0.4, 0.3, 0.3, 0.4, 0.6, 
//     0.8, 0.9, 1.0, 1.0, 0.9, 0.8, 
//     0.7, 0.6, 0.6, 0.7, 0.8, 0.9, 
//     1.0, 0.9, 0.8, 0.7, 0.6, 0.5  
// ];

// // --------------------------------------------------------------------------
// // INITIALIZATION LOGIC
// // --------------------------------------------------------------------------
// async function initializeSystem() {
//     console.log("System initialization starting: Fetching real-world energy baselines...");
//     
//     try {
//         const baselines = await calculateGenerationBaselines();
//         
//         const NATIONAL_RE_AVG = baselines.SOLAR_DAILY_AVG_MW + baselines.WIND_DAILY_AVG_MW;
//         const SCALING_FACTOR = PLANT_CAPACITY_MW / NATIONAL_RE_AVG;

//         BASE_SOLAR_MW = Math.round(baselines.SOLAR_DAILY_AVG_MW * SCALING_FACTOR);
//         BASE_WIND_MW = Math.round(baselines.WIND_DAILY_AVG_MW * SCALING_FACTOR);

//         BASE_SOLAR_MW = Math.min(BASE_SOLAR_MW, 15);
//         BASE_WIND_MW = Math.min(BASE_WIND_MW, 10);
//         
//         console.log(`✅ Baselines Finalized! Solar Base: ${BASE_SOLAR_MW} MW, Wind Base: ${BASE_WIND_MW} MW.`);
//         
//     } catch (error) {
//         console.error("❌ Initialization Failed: Could not fetch baselines. Using default fallbacks.");
//     }
// }
// initializeSystem(); 

// // --------------------------------------------------------------------------
// // 💡 PRICE UPDATE FUNCTION (EXPORTS)
// // --------------------------------------------------------------------------
// export function updateCurrentPrice() { 
//     try {
//         const newPriceMWh = getHourlyElectricityPrice();
//         CURRENT_ELECTRICITY_PRICE_USD_MWH = newPriceMWh;
//         
//         systemState.market.electricityPrice = newPriceMWh;
//         
//         // Convert MWh to kWh for the analytics display (1 MWh = 1000 kWh)
//         systemState.analytics.energyCost = parseFloat((newPriceMWh / 1000).toFixed(4)); 
//         
//         console.log(`[Price Service] Updated Electricity Price: $${newPriceMWh}/MWh`);
//         return newPriceMWh;
//     } catch (error) {
//         // This error likely means priceService.js is missing or failing.
//         console.error(`[Price Service] Failed to update price: ${error.message}. Keeping old price.`);
//         return CURRENT_ELECTRICITY_PRICE_USD_MWH;
//     }
// }

// // --------------------------------------------------------------------------
// // 💡 ML PLACEHOLDER FUNCTION (CRITICAL FIX FOR SyntaxError)
// // --------------------------------------------------------------------------
// /**
//  * Placeholder function for ML update logic. 
//  * This is required because server.js is importing it.
//  */
// export function updateMLProductionTarget() { 
//     // This is a placeholder and should remain empty until the full ML integration is ready.
// }


// // --------------------------------------------------------------------------
// // MAIN SIMULATION LOOP (EXPORTS)
// // --------------------------------------------------------------------------
// export const simulateRealTimeData = () => {
//     const now = new Date();
//     const hours = now.getHours();
//     // const minutes = now.getMinutes(); // Not strictly needed
//     // const seconds = now.getSeconds(); // Not strictly needed

//     // --- Energy Input Simulation ---
//     const baseSolar = BASE_SOLAR_MW; 
//     const baseWind = BASE_WIND_MW;  

//     // Apply hourly patterns and add small fluctuations
//     systemState.energy.solar = fluctuate(baseSolar * HOURLY_SOLAR_PATTERN[hours], 0.5, 0, baseSolar);
//     systemState.energy.wind = fluctuate(baseWind * HOURLY_WIND_PATTERN[hours], 1.0, 0, baseWind);
//     
//     // [ ... The rest of the simulation logic (Battery, Production, Storage, Logistics) ... ]

//     // --- Analytics & Market Simulation ---
//     // (NOTE: Old conflicting price logic is correctly removed from the simulation loop)

//     systemState.market.hydrogenDemand = fluctuate(systemState.market.hydrogenDemand, 5, 80, 250);
//     systemState.market.hydrogenDemand *= HOURLY_HYDROGEN_DEMAND_PATTERN[hours]; 
//     systemState.market.hydrogenDemand = fluctuate(systemState.market.hydrogenDemand, 2, 50, 250);

//     systemState.market.demandForecast.nextHour = fluctuate(systemState.market.hydrogenDemand * 1.1, 10, 80, 250);
//     
//     // [ ... Overall system health logic ... ]
// };
// backend/systemState.js

// import { calculateGenerationBaselines } from "./dataService.js"; 
// backend/systemState.js

import { calculateGenerationBaselines } from "./dataService.js"; 
import { getHourlyElectricityPrice } from './priceService.js'; 

// --- BASELINE CONSTANTS ---
export let BASE_SOLAR_MW = 15; 
export let BASE_WIND_MW = 10; 

// --- System State Object ---
export let systemState = {
    energy: {
        solar: 0, wind: 0, gridImport: 0, gridExport: 0, 
        battery: { charge: 50, capacityMWh: 5, flowMW: 0 },
        totalRenewable: 0, totalAvailable: 0, 
    },
    production: {
        currentRate: 0, targetRate: 150, maxCapacity: 300, capacityUsage: 0, 
        hydrogenPurity: 99.999, 
        electrolyzers: [
            { id: 1, name: 'PEM-E1', status: 'Running', efficiency: 52, health: 'Good' },
            { id: 2, name: 'PEM-E2', status: 'Running', efficiency: 55, health: 'Good' },
            { id: 3, name: 'Alkaline-E3', status: 'Warning', efficiency: 60, health: 'Efficiency Low' },
            { id: 4, name: 'PEM-E4', status: 'Stopped', efficiency: 0, health: 'Offline' },
        ],
    },
    storage: {
        tanks: [
            { id: 'T1', type: 'Compressed Gas', capacity: 1000, current: 500, unit: 'kg', status: 'Optimal' },
            { id: 'T2', type: 'Liquid Hydrogen', capacity: 2000, current: 1000, unit: 'kg', status: 'Optimal' },
            { id: 'T3', type: 'Underground Cavern', capacity: 50000, current: 25000, unit: 'kg', status: 'Optimal' },
        ],
        overallFillPercentage: 50,
    },
    analytics: {
        predictiveMaintenance: { alert: 'None' },
        predictiveProductionPlanning: { recommendedRate: 135, pred_class: null },
        systemHealth: 'Optimal',
        electrolyzerEfficiency: 0,
        systemEfficiency: 0,
    },
    market: {
        electricityPrice: 100.00,
        hydrogenDemand: 150,
    }
};

// --- Helper Functions and Patterns ---
const fluctuate = (value, maxChange, min = 0, max = Infinity) => {
    const change = (Math.random() - 0.5) * maxChange;
    return Math.max(min, Math.min(max, value + change));
};
const HOURLY_SOLAR_PATTERN = [0,0,0,0,0,0.1,0.3,0.5,0.7,0.9,1,1,0.9,0.7,0.5,0.3,0.1,0,0,0,0,0,0,0];
const HOURLY_WIND_PATTERN = [0.6,0.7,0.8,0.8,0.7,0.6,0.5,0.4,0.4,0.5,0.6,0.7,0.8,0.9,1,1,0.9,0.8,0.7,0.7,0.6,0.6,0.6,0.6];

// --- Initialization and Price Update Functions (unchanged) ---
(async function initializeSystem() { /* ... unchanged ... */ })();
export function updateCurrentPrice() { /* ... unchanged ... */ }

// --- Main Simulation Loop ---
export const simulateRealTimeData = () => {
    const now = new Date();
    const hours = now.getHours();

    // --- Energy Simulation ---
    systemState.energy.solar = fluctuate(BASE_SOLAR_MW * HOURLY_SOLAR_PATTERN[hours], 0.5, 0);
    systemState.energy.wind = fluctuate(BASE_WIND_MW * HOURLY_WIND_PATTERN[hours], 1.0, 0);
    systemState.energy.totalRenewable = systemState.energy.solar + systemState.energy.wind;

    // --- Production Simulation ---
    const productionRateNoise = (Math.random() - 0.5) * 5;
    systemState.production.currentRate = Math.max(0, systemState.production.targetRate + productionRateNoise);
    systemState.production.capacityUsage = (systemState.production.currentRate / systemState.production.maxCapacity) * 100;
    
    // --- NEW: Grid and Power Balance Logic ---
    const H2_KWH_PER_KG = 55; // Average kWh needed to produce 1 kg of H2
    const powerNeededMW = (systemState.production.currentRate * H2_KWH_PER_KG) / 1000;
    const powerAvailableMW = systemState.energy.totalRenewable;
    
    let gridImport = 0;
    if (powerNeededMW > powerAvailableMW) {
        // If there's a deficit, import the difference from the grid
        gridImport = powerNeededMW - powerAvailableMW;
    }
    
    systemState.energy.gridImport = gridImport;
    systemState.energy.totalAvailable = powerAvailableMW + gridImport;
    // --- End of Fix ---

    // --- Storage Simulation ---
    const netStorageChange = (systemState.production.currentRate / 3600) * 5; // H2 produced in the 5-second interval
    let totalCurrentStorage = 0;
    let totalCapacity = 0;
    systemState.storage.tanks.forEach(tank => {
        tank.current = Math.min(tank.capacity, tank.current + netStorageChange / systemState.storage.tanks.length);
        totalCurrentStorage += tank.current;
        totalCapacity += tank.capacity;
        const fill = (tank.current / tank.capacity) * 100;
        tank.status = fill > 95 ? 'Warning' : 'Optimal';
    });
    systemState.storage.overallFillPercentage = (totalCurrentStorage / totalCapacity) * 100;

    // --- Health Simulation ---
    if (Math.random() < 0.05) { // 5% chance for a warning
        systemState.analytics.systemHealth = 'Warning';
        systemState.analytics.predictiveMaintenance.alert = 'Compressor B showing high vibration.';
    } else {
        systemState.analytics.systemHealth = 'Optimal';
        systemState.analytics.predictiveMaintenance.alert = 'None';
    }
};