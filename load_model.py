# Python Script for Inference
import sys
import json
import pickle
import pandas as pd
import math

# Load the machine learning model
model = pickle.load(open("model.pkl", 'rb'))

# Read input data from command-line arguments
input_data = json.loads(sys.argv[1])
print("Received input data:", input_data)  # Add this line for debugging

# Convert input data to a pandas DataFrame
input_df = pd.DataFrame([input_data])

# Select relevant columns (adjust column names as needed)
input_df = input_df[['team_size', 'budget', 'workload']]

# Perform inference
prediction = model.predict(input_df)[0][0]

# Print prediction to stdout
print('{"prediction":', prediction, '}')  # Add this line for debugging

