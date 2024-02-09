# Python Script for Inference
import sys
import json
import joblib

# Load the machine learning model
model = joblib.load("iris_model.pkl")

# Read input data from command-line arguments
input_data = json.loads(sys.argv[1])

# Perform inference
prediction = model.predict([input_data])

# Print prediction to stdout
print(prediction[0])
