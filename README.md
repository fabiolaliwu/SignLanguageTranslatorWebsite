# 🧠 Sign Language Translator Website

A real-time ASL (American Sign Language) to English translator using **MediaPipe**, **TensorFlow**, **React**, and **Flask**. The app captures hand landmarks via webcam, classifies ASL letters, and translates them into English text.


![alt text](image.png)
---

## 🖥️ Features

- Real-time camera-based ASL fingerspelling detection  
- Frontend built with **React**  
- Backend powered by **Flask** and **TensorFlow**  
- Hand tracking using **MediaPipe**
---

## 🚀 Getting Started

### 📦 Frontend Setup

Install required MediaPipe utilities:

```bash
npm install @mediapipe/hands @mediapipe/drawing_utils
npm install @mediapipe/camera_utils
npm install concurrently
```

### 💻 Backend Setup:
``` bash
pip install flask flask-cors tensorflow numpy
pip install opencv-python
pip install opencv-python-headless
pip install mediapipe
pip install tensorflow
pip install keras

```

### 🏃🏻‍♀️‍➡️ Running it:
backend terminal: 
```
cd backend
python app.py
```

frontend terminal:
```
cd frontend
npm install
npm install react-router-dom
npm run dev
```
