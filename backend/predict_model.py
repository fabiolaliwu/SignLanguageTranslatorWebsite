import numpy as np
from keras.models import load_model

model = load_model("asl_mlp_model.h5")
labels = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

def predict_letter(landmarks):
    input_array = np.array(landmarks).reshape(1, 63)
    prediction = model.predict(input_array)
    predicted_index = np.argmax(prediction)
    return labels[predicted_index]