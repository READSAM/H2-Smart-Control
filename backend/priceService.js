// backend/priceService.js

// Import the current base generation capacities
import { BASE_SOLAR_MW, BASE_WIND_MW } from './systemState.js'; 

const BASE_SYSTEM_CAPACITY = 15000; // Use a reasonable value (e.g., higher than your combined max baseline)
const MAX_BASE_PRICE = 150;         // Price when RE generation is low (fossil fuel dependent)
const MIN_BASE_PRICE = 50;          // Price when RE generation is high (RE is cheap)

export function getHourlyElectricityPrice() {
    // 1. Calculate current Renewable Energy (RE) penetration
    const totalREGeneration = BASE_SOLAR_MW + BASE_WIND_MW;
    
    // Calculate the ratio of current RE to a high, fixed system capacity
    const RE_RATIO = totalREGeneration / BASE_SYSTEM_CAPACITY; 

    // 2. Map the ratio inversely to the price range
    
    // Clamp the ratio to prevent negative prices if RE > capacity, or prices hitting max too easily
    let clampedRatio = Math.min(RE_RATIO, 1.0); // Clamp maximum RE contribution to 100%
    clampedRatio = Math.max(clampedRatio, 0.1); // Ensure there's always at least 10% RE effect

    // Inverse factor: High ratio (1.0) -> Low Price Factor (0.0)
    let priceFactor = 1 - clampedRatio;
    
    // Calculate the price based on the price range and factor
    const priceRange = MAX_BASE_PRICE - MIN_BASE_PRICE;
    // Base price (MIN) + the volatility (priceFactor * range)
    let currentPrice = MIN_BASE_PRICE + (priceFactor * priceRange);

    // 3. Add Minor Random Volatility (for 'live' feel)
    const randomVolatility = (Math.random() * 8) - 4; // +/- $4 random swing
    currentPrice += randomVolatility;

    return parseFloat(currentPrice.toFixed(2));
}