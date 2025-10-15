// backend/dataService.js

// Make sure you have 'node-fetch' installed and imported if you're in a Node.js environment
// If you are using Node 18+ and 'type: module' you might not need this line
// import fetch from 'node-fetch'; 

// API CONFIGURATION
const API_KEY = "579b464db66ec23bdd00000162f13747a42c429343b9916b542e057c";
const RESOURCE_ID = "ea3e52c2-c669-42df-97f7-a0e7d97d8ea4"
const API_ENDPOINT = `https://api.data.gov.in/resource/${RESOURCE_ID}` // Use template literal for proper insertion

// Filters to get only the 'All India' total generation record
// NOTE: state__ut is used in the filter, so 'State/ UT' should be the field name in the data
const QUERY_PARAMS = `?api-key=${API_KEY}&format=json&offset=0&limit=100`;

/**
 * Fetches the annual Solar and Wind generation (in MU) from the OGD API
 * and converts them into daily average power constants (in MW).
 * @returns {object} { SOLAR_DAILY_AVG_MW, WIND_DAILY_AVG_MW }
 */
export async function calculateGenerationBaselines() { // Export the function
    const fullUrl = API_ENDPOINT + QUERY_PARAMS;
    const TOTAL_HOURS_PER_YEAR = 8760; 
    
    // Fallback constants in case of API failure
    const FALLBACK_SOLAR = 15; // Changed to lower, more realistic MW fallbacks
    const FALLBACK_WIND = 10;

    try {
        console.log("Fetching RE baseline from:", fullUrl);
        const response = await fetch(fullUrl);
        
        // --- SAFETY CHECK 1: Handle non-200 responses ---
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("[Data Service] RAW API DATA RECEIVED:", JSON.stringify(data, null, 2));

        // --- SAFETY CHECK 2: Ensure 'records' array exists ---
        if (!data.records || !Array.isArray(data.records) || data.records.length === 0) {
            throw new Error("API response is missing the 'records' array or it's empty.");
        }

        // Find the 'All India' record
        const allIndiaRecord = data.records.find(record => {
    // 1. Check the official state field name for a match (case-insensitive, trimmed)
    if ((record['state__ut'] || '').toLowerCase().trim() === 'all india') {
        return true;
    }
    
    // 2. Check the official state field name for 'Total' (common for aggregate rows)
    if ((record['state__ut'] || '').toLowerCase().trim() === 'total') {
        return true;
    }

    // Since we're trying to be certain, also check the 'Total' column value
    // (This part is less necessary if the state filter works, but safe to keep)
    // if (record['_total'] && parseFloat(record['_total']) > 0) {
    //     return true;
    // }

    return false;
});


        if (!allIndiaRecord) {
            throw new Error("API fetched data, but no 'All India' or 'Total' record was found in the list.");
        }

        // --- SAFETY CHECK 3: Ensure Solar/Wind fields exist and are parsable ---
        const solarValue = allIndiaRecord['solar'];
        const windValue = allIndiaRecord['wind'];
        
        if (!solarValue || !windValue) {
            throw new Error("Required fields 'solar' or 'wind' are missing in the data record.");
        }
        
        const solarAnnualMU = parseFloat(solarValue);
        const windAnnualMU = parseFloat(windValue);
        
        if (isNaN(solarAnnualMU) || isNaN(windAnnualMU)) {
            throw new Error(`Failed to parse numerical data for Solar (${solarValue}) or Wind (${windValue}).`);
        }

        // Conversion: (Annual MU * 1000) / (Hours/Year) = Average MW (since 1 MU = 1 GWh)
        const solarAvgMW = (solarAnnualMU * 1000) / TOTAL_HOURS_PER_YEAR; 
        const windAvgMW = (windAnnualMU * 1000) / TOTAL_HOURS_PER_YEAR;

        console.log(`[Data Service] Success! Calculated Avg Solar: ${solarAvgMW.toFixed(2)} MW, Avg Wind: ${windAvgMW.toFixed(2)} MW`);

        return { 
            SOLAR_DAILY_AVG_MW: Math.round(solarAvgMW), 
            WIND_DAILY_AVG_MW: Math.round(windAvgMW) 
        };

    } catch (error) {
        // Use more general and lower fallback values to represent average base capacity
        console.error(`[Data Service] Failed to fetch or process data. Using default fallbacks. Error: ${error.message}`);
        return { 
            SOLAR_DAILY_AVG_MW: FALLBACK_SOLAR, 
            WIND_DAILY_AVG_MW: FALLBACK_WIND 
        };
    }
}