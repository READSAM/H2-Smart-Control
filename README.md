# H2-Smart-Control
Smart Control Process System for  Hydrogen production from Renewable Energy sources
# Summary

This project presents a smart hydrogen production prototype that leverages real-time solar and wind energy data, combined with machine learning, to recommend optimal hydrogen production rates and monitor efficiency. The system features a live dashboard for operators, translating limited data into actionable insights for improved sustainability and resource utilization. Designed for scalability, the prototype provides an immediate digital upgrade for hydrogen plants and is ready to incorporate additional capabilities like storage, logistics management, and predictive maintenance as more operational data becomes available.

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
