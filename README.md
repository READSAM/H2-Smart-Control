# H2-Smart-Control
Smart Control Process System for  Hydrogen production from Renewable Energy sources
# Summary

This project presents a smart hydrogen production prototype that leverages real-time solar and wind energy data, combined with machine learning, to recommend optimal hydrogen production rates and monitor efficiency. The system features a live dashboard for operators, translating limited data into actionable insights for improved sustainability and resource utilization. Designed for scalability, the prototype provides an immediate digital upgrade for hydrogen plants and is ready to incorporate additional capabilities like storage, logistics management, and predictive maintenance as more operational data becomes available.

-----

# H2 Smart Control - Frontend 💧

This repository contains the frontend application for the H2 Smart Control project, a real-time dashboard for monitoring and managing a green hydrogen production plant. The application is built with React and provides a comprehensive, data-rich interface for operators to make intelligent, data-driven decisions.

This frontend is part of a **three-tier architecture** and requires the [H2 Smart Control Backend](https://www.google.com/search?q=https.github.com/READSAM/H2-Smart-Control/tree/main/backend) and [ML Service](https://www.google.com/search?q=https.github.com/READSAM/H2-Smart-Control/tree/main/ml_service) to be running simultaneously to be fully functional.

## ✨ Key Features

  * **Real-Time Dashboard**: A live overview of the entire hydrogen plant, with data automatically refreshing every 5 seconds.
  * **ML-Powered Insights**: Integrates predictions from a Python-based machine learning model to display the optimal hydrogen production rate (`High`, `Medium`, `Low`) with color-coded alerts.
  * **Intelligent Storage Analysis**: The Storage page provides actionable advice by analyzing the synergy between the ML-recommended production rate and current storage levels.
  * **Interactive Logistics Map**: The Transportation page features a live Leaflet map showing the real-time location of the truck fleet and delivery destinations.
  * **Dynamic Dispatching**: A fully functional dispatch form allows operators to schedule new deliveries, which instantly appear on the map and in all relevant data tables.
  * **Comprehensive Metrics**: Displays key performance indicators, including live energy inputs (Solar, Wind, Grid), production rates, electrolyzer efficiency, and system efficiency.
  * **Modular & Responsive UI**: Built with React and Bootstrap for a clean, modern, and responsive user interface that works on various screen sizes.

-----

## 🛠️ Tech Stack

  * **Framework**: [React](https://reactjs.org/)
  * **UI Library**: [React Bootstrap](https://react-bootstrap.github.io/) & [Bootstrap 5](https://getbootstrap.com/)
  * **Routing**: [React Router](https://reactrouter.com/)
  * **Data Fetching**: [Axios](https://axios-http.com/)
  * **Charting**: [Chart.js](https://www.chartjs.org/) with [react-chartjs-2](https://react-chartjs-2.js.org/)
  * **Mapping**: [Leaflet](https://leafletjs.com/) with [React Leaflet](https://react-leaflet.js.org/)
  * **Icons**: [Bootstrap Icons](https://icons.getbootstrap.com/)

-----

## 🚀 Getting Started

To get the full H2 Smart Control system running on your local machine, you need to run all three parts: the Backend, the ML Service, and this Frontend.

### Prerequisites

  * **Node.js** (v16 or later) installed on your machine.
  * **Python** (v3.8 or later) installed on your machine.
  * **Git** for cloning the repository.

### Installation & Setup

You will need **three separate terminal windows** to run the complete application.

#### 1\. Clone the Repository

First, clone the main repository to your local machine:

```bash
git clone https://github.com/READSAM/H2-Smart-Control.git
cd H2-Smart-Control
```

#### 2\. Setup & Run the Backend

In your **first terminal**, navigate to the `backend` directory and start the Node.js server.

```bash
# Navigate to the backend folder
cd backend

# Install dependencies (only needs to be done once)
npm install

# Start the backend server
node server.js
```

You should see the output: `🚀 Hydrogen Plant Backend running on http://localhost:3001`. Keep this terminal running.

#### 3\. Setup & Run the ML Service

In your **second terminal**, navigate to the `ml_service` directory and start the Python Flask server.

```bash
# Navigate to the ml_service folder
cd ml_service

# It's recommended to use a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# Install Python dependencies (only needs to be done once)
pip install -r requirements.txt

# Start the ML service
python app.py
```

You should see the output: `* Running on http://127.0.0.1:5000`. Keep this terminal running.

#### 4\. Setup & Run the Frontend (This Application)

In your **third terminal**, navigate to the `hydro-frt-app` (frontend) directory and start the React development server.

```bash
# Navigate to the frontend folder
cd hydro-frt-app

# Install dependencies (only needs to be done once)
npm install

# Start the React application
npm start
```

Your default web browser should automatically open to `http://localhost:3000`, and you will see the H2 Smart Control dashboard loading its live data.

-----

## 📂 Project Structure

The frontend application follows a standard React project structure:

```
H2-Smart-Control/
├── backend/
│   ├── dataService.js
│   ├── package.json
│   ├── priceService.js
│   ├── server.js
│   └── systemState.js
│
├── ml_service/
│   ├── app.py
│   ├── hydrogen_optimal_rate_prediction.pkl
│   └── requirements.txt
│
└── hydro-frt-app/
    ├── node_modules/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── charts/
    │   │   ├── DoughnutChart.js
    │   │   └── LineChart.js
    │   ├── components/
    │   │   ├── widgets/
    │   │   │   ├── CurrentEnergyInput.js
    │   │   │   ├── EfficiencyMetrics.js
    │   │   │   ├── GridMarketSummary.js
    │   │   │   ├── HydrogenProductionSummary.js
    │   │   │   ├── LogisticsSummary.js
    │   │   │   ├── MLProductionAdvisor.js
    │   │   │   ├── StorageOverviewSummary.js
    │   │   │   └── UpcomingActions.js
    │   │   ├── CriticalAlerts.js
    │   │   ├── DashboardWidget.js
    │   │   ├── Header.js
    │   │   └── Sidebar.js
    │   ├── pages/
    │   │   ├── AnalyticsPage.js
    │   │   ├── DashboardPage.js
    │   │   ├── NotFoundPage.js
    │   │   ├── ProductionPage.js
    │   │   ├── StoragePage.js
    │   │   └── TransportationPage.js
    │   ├── App.css
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    ├── .gitignore
    ├── package.json
    └── README.md
```


# ⚙️ **Backend Architecture**
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

# ML Architecture 

*1. Data Input Layer*
- *Features used:*
  - PV_Power_kW (solar power)
  - Wind_Power_kW (wind power)
  - Electrolyzer_Efficiency_%
  - System_Efficiency_%
  - Empirical production estimate (based on real plant kWh/kg)
  - (Optionally) Feasibility_Score, weather, or other process features
  
*2. Feature Engineering*
- Normalize/transform input features (convert % to decimals, create estimates, bin targets).

*3. Target Binning*
- Hydrogen_Production_kg/day (actual value from dataset)  
→ Bin into discrete classes (Low, Medium, High production rates).

*4. ML Model*
- *XGBoost Classifier*
  - Tree-based ensemble algorithm.
  - Learns to classify each data record into production class (Low, Medium, High).
  - Hyperparameters: depth, estimators, etc.
  
*5. Output Layer*
- Recommended production rate class.
- Class probabilities (for operator confidence/advisory).
- (Optionally) Feasibility score displayed alongside.

*6. Dashboard/Operator Interface*
- Shows recommended class, probability/confidence, and feasibility.
- Visualizes model outputs for smart decision support.

## Summary

- This system learns from historical data to recommend safe setpoints for hydrogen production, based on renewable input and operational characteristics.
- It provides actionable recommendations, probability/confidence for each recommendation, and combines operational logic (e.g. feasibility score) for safer automation.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
