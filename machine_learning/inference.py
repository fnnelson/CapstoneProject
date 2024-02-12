# Python Script for Inference
import sys
import json
import pickle
import pandas as pd
import math

# Load the machine learning model
model = pickle.load(open("./machine_learning/model.pkl", 'rb'))

# Initiate dataFrame
df = pd.DataFrame(columns = ["team_size", "budget", "workload_L", "workload_M", "workload_S"])

# Read input data from command-line arguments
input_data = json.loads(sys.argv[1])

# Add input data to a pandas DataFrame
df["team_size"] = [input_data['team_size']]
df["budget"] = [input_data['budget']]
df["workload_L"] = [input_data['workload'] == 'L']
df["workload_M"] = [input_data['workload'] == 'M']
df["workload_S"] = [input_data['workload'] == 'S']

# Perform inference
prediction = math.ceil(model.predict(df)[0][0])

# Print prediction to stdout
print(prediction)  

