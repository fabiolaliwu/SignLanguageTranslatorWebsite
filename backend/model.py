import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from keras import Sequential
from keras.layers import Dense
from keras.utils import to_categorical

# Load dataset
df = pd.read_csv("asl_landmarks.csv")  # Must contain 63 features + 1 label column

X = df.iloc[:, :-1].values
y = df.iloc[:, -1].values

# Encode letter labels (A–Z → 0–25)
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)
y_onehot = to_categorical(y_encoded, num_classes=26)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y_onehot, test_size=0.2, random_state=42
)

# Define the model
model = Sequential([
    Dense(128, activation='relu', input_shape=(63,)),
    Dense(64, activation='relu'),
    Dense(26, activation='softmax')
])

# Compile and train
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=30, validation_data=(X_test, y_test))

# Save the trained model
model.save("asl_mlp_model.h5")
print("✅ Model saved as asl_mlp_model.h5")