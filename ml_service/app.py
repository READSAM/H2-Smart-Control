# # import random
# # import pickle
# # from flask import Flask, request, jsonify
# # from flask_cors import CORS # Needed if running on a different port than the Node.js server

# # app = Flask(__name__)
# # CORS(app) # Enable CORS for development

# # @app.route('/predict/production-rate', methods=['POST'])
# # def predict():
# #     data = request.get_json()

# #     # Features received from Node.js:
# #     solar_kW = data.get('solar')
# #     wind_kW = data.get('wind')
# #     """
# #     Generates and prints random efficiency values based on the min/max
# #     ranges from your dataset.
# #     """
# #     # Define the min and max values based on your data analysis
# #     ELECTROLYZER_MIN = 73.0
# #     ELECTROLYZER_MAX = 77.0
    
# #     SYSTEM_MIN = 75.0
# #     SYSTEM_MAX = 82.0

# #     # Generate a random float within each range
# #     random_electrolyzer_eff = random.uniform(ELECTROLYZER_MIN, ELECTROLYZER_MAX)
# #     random_system_eff = random.uniform(SYSTEM_MIN, SYSTEM_MAX)
# #     H2_emp=122.20  
# #     # --- Placeholder ML Logic ---
# #     # A simple, mock prediction based on grid price and solar availability


# #     # Path to your local model file (after cloning/downloading the repo)
# #     with open('hydrogen_optimal_rate_prediction.pkl', 'rb') as f:
# #         model = pickle.load(f)

# #     # Now use it like any sklearn/xgboost model
# #     input_features = [solar_kW , wind_kW ,random_electrolyzer_eff,random_system_eff,H2_emp]  # Sample input
# #     pred_class = model.predict(input_features)
# #     probs = model.predict_proba(input_features)
        
# #     class_to_rate = {'Low': 48, 'Medium': 52, 'High': 56} 
# #     model_output = pred_class 
# #     predicted_rate = class_to_rate[model_output]
# #     print(predicted_rate)

# #     return jsonify({'recommendedRate': predicted_rate,'pred_class':pred_class})

# # if __name__ == '__main__':
# #     app.run(port=5000)



# # app.py

# # import random
# # import pickle
# # import os 
# # import numpy as np 
# # from flask import Flask, request, jsonify
# # from flask_cors import CORS 

# # app = Flask(__name__)
# # CORS(app) # Enable CORS for development

# # # --- Global Model and Constants ---
# # MODEL_PATH = 'hydrogen_optimal_rate_prediction.pkl'

# # # Define the min/max values for random efficiency generation
# # ELECTROLYZER_MIN = 73.0
# # ELECTROLYZER_MAX = 77.0
# # SYSTEM_MIN = 75.0
# # SYSTEM_MAX = 82.0
# # H2_EMP = 122.20 # Constant feature for the model

# # # Attempt to load the model once on startup
# # try:
# #     if not os.path.exists(MODEL_PATH):
# #         # Use a soft error here if the file is missing to allow the app to run
# #         # but crash on the first prediction call, which is better for debugging.
# #         raise FileNotFoundError(f"Model file not found at: {MODEL_PATH}")
        
# #     with open(MODEL_PATH, 'rb') as f:
# #         MODEL = pickle.load(f)
# #     print(f"✅ ML Model loaded successfully from {MODEL_PATH}")

# # except Exception as e:
# #     print(f"❌ Error loading ML model: {e}")
# #     # Setting MODEL to None prevents the app from crashing entirely on startup
# #     MODEL = None 

# # # Mapping of predicted class to a specific target production rate (in kg/hr)
# # CLASS_TO_RATE = {
# #     'Low': 48, 
# #     'Medium': 52, 
# #     'High': 56,
# #     # FIX: Added numerical string keys to handle model outputs that are not pre-decoded 
# #     '0': 48,     # Assuming '0' maps to 'Low'
# #     '1': 52,     # Assuming '1' maps to 'Medium'
# #     '2': 56      # Assuming '2' maps to 'High'
# # } 

# # # --- API Route for Prediction ---
# # @app.route('/predict/production-rate', methods=['POST'])
# # def predict():
# #     # Immediate check if model load failed
# #     if MODEL is None:
# #         return jsonify({'error': 'ML model failed to load on startup.'}), 500

# #     try:
# #         data = request.get_json()
        
# #         # 1. Extract Features from the Node.js Request and ensure they are floats
# #         # CRITICAL FIX: Explicitly cast to float to prevent NumPy type errors.
# #         try:
# #             # Use .get() with a default value (0.0) to handle missing keys gracefully
# #             solar_MW = float(data.get('solar', 0.0))
# #             wind_MW = float(data.get('wind', 0.0))
# #         except (TypeError, ValueError) as e:
# #             # If the data received cannot be converted to a number (e.g., a string), return 400
# #             print(f"❌ Input Data Format Error: {e}. Data received: {data}")
# #             return jsonify({'error': f'Invalid input data format. Must be numeric: {e}'}), 400


# #         # 2. Generate required random/constant features for the model
# #         random_electrolyzer_eff = random.uniform(ELECTROLYZER_MIN, ELECTROLYZER_MAX)
# #         random_system_eff = random.uniform(SYSTEM_MIN, SYSTEM_MAX)

# #         # 3. Prepare the Input Array for the Model
# #         # Scikit-learn models always expect a 2D array: [[feature1, feature2, ...]]
# #         input_features = np.array([[
# #             solar_MW, 
# #             wind_MW, 
# #             random_electrolyzer_eff, 
# #             random_system_eff, 
# #             H2_EMP
# #         ]])
        
# #         # 4. Make the Prediction
# #         # .predict() returns an array, so we take the first element (the class string, e.g., '0', 'Low')
# #         model_output_array = MODEL.predict(input_features) 
# #         model_output_class = str(model_output_array[0]) # Ensure it's a string, just in case

# #         # 5. Map the Class to the Recommended Production Rate
# #         predicted_rate = CLASS_TO_RATE.get(model_output_class)
        
# #         if predicted_rate is None:
# #              raise ValueError(f"Model output class '{model_output_class}' not found in mapping.")

# #         print(f"Prediction: {model_output_class} -> {predicted_rate} kg/hr")

# #         # 6. Return the result
# #         return jsonify({
# #             'recommendedRate': predicted_rate,
# #             'pred_class': model_output_class
# #         })

# #     except Exception as e:
# #         # Catch any other runtime prediction errors (e.g., model compatibility)
# #         print(f"❌ Unhandled Prediction Error: {e}")
# #         return jsonify({'error': f'Internal ML prediction failure: {e}'}), 500

# # if __name__ == '__main__':
# #     # Start the Flask server
# #     app.run(port=5000)


# # checking
# # import random
# # import pickle
# # import os 
# # import numpy as np 
# # from flask import Flask, request, jsonify
# # from flask_cors import CORS 

# # app = Flask(__name__)
# # CORS(app) # Enable CORS for development

# # # --- Global Model and Constants ---
# # MODEL_PATH = 'hydrogen_optimal_rate_prediction.pkl'

# # # Define the min/max values for random efficiency generation
# # ELECTROLYZER_MIN = 73.0
# # ELECTROLYZER_MAX = 77.0
# # SYSTEM_MIN = 75.0
# # SYSTEM_MAX = 82.0
# # H2_EMP = 122.20 

# # # Attempt to load the model (kept for structural integrity, but prediction is bypassed)
# # try:
# #     if not os.path.exists(MODEL_PATH):
# #         print(f"⚠️ Model file not found at: {MODEL_PATH}. Using rule-based prediction.")
# #     else:    
# #         with open(MODEL_PATH, 'rb') as f:
# #             MODEL = pickle.load(f)
# #         print(f"✅ ML Model loaded successfully from {MODEL_PATH}")

# # except Exception as e:
# #     print(f"❌ Error loading ML model: {e}. Using rule-based prediction.")
# #     MODEL = None 

# # # Mapping of class labels (for output only)
# # CLASS_TO_RATE = {
# #     'Low': 48, 
# #     'Medium': 52, 
# #     'High': 56,
# # } 

# # # --- API Route for Prediction ---
# # @app.route('/predict/production-rate', methods=['POST'])
# # def predict():

# #     try:
# #         data = request.get_json()
        
# #         # 1. Extract Features from the Node.js Request and ensure they are floats
# #         try:
# #             solar_MW = float(data.get('solar', 0.0))
# #             wind_MW = float(data.get('wind', 0.0))
# #             electricity_price = float(data.get('electricityPrice', 100.0)) 
            
# #         except (TypeError, ValueError) as e:
# #             print(f"❌ Input Data Format Error: {e}. Data received: {data}")
# #             return jsonify({'error': f'Invalid input data format. Must be numeric: {e}'}), 400

        
# #         # =======================================================
# #         # RULE-BASED HEURISTIC (Replaces the broken ML prediction)
# #         # =======================================================
# #         total_renewable_input = solar_MW + wind_MW
        
# #         # Rule 1: High Price or Very Low Renewables -> THROTTLE DOWN (48 kg/hr)
# #         if electricity_price >= 180.0 or total_renewable_input < 5.0:
# #             predicted_rate = 48 
# #             model_output_class = 'Low'
            
# #         # Rule 2: Low Price AND High Renewables -> MAX PRODUCTION (56 kg/hr)
# #         elif electricity_price <= 120.0 and total_renewable_input >= 20.0:
# #             predicted_rate = 56
# #             model_output_class = 'High'
            
# #         # Rule 3: Default/Average Conditions -> MEDIUM PRODUCTION (52 kg/hr)
# #         else:
# #             predicted_rate = 52 
# #             model_output_class = 'Medium'
        
# #         print(f"✨ HEURISTIC PREDICTION: Renewables={total_renewable_input:.2f} MW, Price=${electricity_price:.2f}/MWh -> {model_output_class} ({predicted_rate} kg/hr)")
# #         # =======================================================


# #         # 6. Return the result
# #         return jsonify({
# #             'recommendedRate': predicted_rate,
# #             'pred_class': model_output_class
# #         })

# #     except Exception as e:
# #         print(f"❌ Unhandled Prediction Error: {e}")
# #         return jsonify({'error': f'Internal prediction failure: {e}'}), 500

# # if __name__ == '__main__':
# #     app.run(port=5000)


# # ml_service/app.py
# # import random
# # import os 
# # from flask import Flask, request, jsonify
# # from flask_cors import CORS 

# # app = Flask(__name__)
# # CORS(app)

# # # Define constants
# # ELECTROLYZER_MIN = 73.0
# # ELECTROLYZER_MAX = 77.0
# # SYSTEM_MIN = 75.0
# # SYSTEM_MAX = 82.0

# # @app.route('/predict/production-rate', methods=['POST'])
# # def predict():
# #     try:
# #         data = request.get_json()
        
# #         # Extract features from the request
# #         solar_MW = float(data.get('solar', 0.0))
# #         wind_MW = float(data.get('wind', 0.0))
# #         electricity_price = float(data.get('electricityPrice', 100.0)) 
        
# #         # --- THIS IS THE FIX: Generate and store the efficiencies ---
# #         random_electrolyzer_eff = random.uniform(ELECTROLYZER_MIN, ELECTROLYZER_MAX)
# #         random_system_eff = random.uniform(SYSTEM_MIN, SYSTEM_MAX)

# #         # Your existing rule-based logic
# #         total_renewable_input = solar_MW + wind_MW
        
# #         if electricity_price >= 180.0 or total_renewable_input < 5.0:
# #             predicted_rate = 48 
# #             model_output_class = 'Low'
# #         elif electricity_price <= 120.0 and total_renewable_input >= 20.0:
# #             predicted_rate = 56
# #             model_output_class = 'High'
# #         else:
# #             predicted_rate = 52 
# #             model_output_class = 'Medium'
        
# #         print(f"✨ HEURISTIC PREDICTION: -> {model_output_class} ({predicted_rate} kg/hr)")
        
# #         # --- THE FIX: Add the new efficiency values to the JSON response ---
# #         return jsonify({
# #             'recommendedRate': predicted_rate,
# #             'pred_class': model_output_class,
# #             'electrolyzer_efficiency': random_electrolyzer_eff,
# #             'system_efficiency': random_system_eff
# #         })

# #     except Exception as e:
# #         print(f"❌ Unhandled Prediction Error: {e}")
# #         return jsonify({'error': f'Internal prediction failure: {e}'}), 500

# # if __name__ == '__main__':
# #     app.run(port=5000)

# # ml_service/app.py
# import random
# import os 
# from flask import Flask, request, jsonify
# from flask_cors import CORS 

# app = Flask(__name__)
# CORS(app)

# # Define constants
# ELECTROLYZER_MIN = 73.0
# ELECTROLYZER_MAX = 77.0
# SYSTEM_MIN = 75.0
# SYSTEM_MAX = 82.0

# @app.route('/predict/production-rate', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json()
        
#         solar_MW = float(data.get('solar', 0.0))
#         wind_MW = float(data.get('wind', 0.0))
#         electricity_price = float(data.get('electricityPrice', 100.0)) 
        
#         # --- Generate and store the random efficiencies ---
#         random_electrolyzer_eff = random.uniform(ELECTROLYZER_MIN, ELECTROLYZER_MAX)
#         random_system_eff = random.uniform(SYSTEM_MIN, SYSTEM_MAX)

#         # Your existing rule-based logic
#         total_renewable_input = solar_MW + wind_MW
        
#         if electricity_price >= 180.0 or total_renewable_input < 5.0:
#             predicted_rate, model_output_class = 48, 'Low'
#         elif electricity_price <= 120.0 and total_renewable_input >= 20.0:
#             predicted_rate, model_output_class = 56, 'High'
#         else:
#             predicted_rate, model_output_class = 52, 'Medium'
        
#         print(f"✨ HEURISTIC PREDICTION: -> {model_output_class} ({predicted_rate} kg/hr)")
        
#         # --- THE FIX: Add efficiencies to the JSON response ---
#         return jsonify({
#             'recommendedRate': predicted_rate,
#             'pred_class': model_output_class,
#             'electrolyzer_efficiency': random_electrolyzer_eff,
#             'system_efficiency': random_system_eff
#         })

#     except Exception as e:
#         print(f"❌ Unhandled Prediction Error: {e}")
#         return jsonify({'error': f'Internal prediction failure: {e}'}), 500

# if __name__ == '__main__':
#     app.run(port=5000)

# ml_service/app.py
import random
import os 
from flask import Flask, request, jsonify
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

# Define constants
ELECTROLYZER_MIN = 73.0
ELECTROLYZER_MAX = 77.0
SYSTEM_MIN = 75.0
SYSTEM_MAX = 82.0

@app.route('/predict/production-rate', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract features from the request
        solar_MW = float(data.get('solar', 0.0))
        wind_MW = float(data.get('wind', 0.0))
        electricity_price = float(data.get('electricityPrice', 100.0)) 
        
        # --- Generate and store the efficiencies ---
        random_electrolyzer_eff = random.uniform(ELECTROLYZER_MIN, ELECTROLYZER_MAX)
        random_system_eff = random.uniform(SYSTEM_MIN, SYSTEM_MAX)

        # Your existing rule-based logic
        total_renewable_input = solar_MW + wind_MW
        
        if electricity_price >= 180.0 or total_renewable_input < 5.0:
            predicted_rate, model_output_class = 48, 'Low'
        elif electricity_price <= 120.0 and total_renewable_input >= 20.0:
            predicted_rate, model_output_class = 56, 'High'
        else:
            predicted_rate, model_output_class = 52, 'Medium'
        
        print(f"✨ HEURISTIC PREDICTION: -> {model_output_class} ({predicted_rate} kg/hr)")
        
        # --- THE FIX: Add efficiencies to the JSON response ---
        return jsonify({
            'recommendedRate': predicted_rate,
            'pred_class': model_output_class,
            'electrolyzer_efficiency': random_electrolyzer_eff,
            'system_efficiency': random_system_eff
        })

    except Exception as e:
        print(f"❌ Unhandled Prediction Error: {e}")
        return jsonify({'error': f'Internal prediction failure: {e}'}), 500

if __name__ == '__main__':
    app.run(port=5000)