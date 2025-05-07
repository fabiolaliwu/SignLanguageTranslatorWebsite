import React, { useEffect, useRef, useState } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import * as HAND_CONNECTIONS from "@mediapipe/hands";

export function CameraFeed() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [letters, setLetters] = useState([]);
  const [frameCount, setFrameCount] = useState(0);
  const FRAME_INTERVAL = 1;

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(ctx, landmarks, HAND_CONNECTIONS.HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 2,
          });
          drawLandmarks(ctx, landmarks, {
            color: "#FF0000",
            lineWidth: 1,
          });

          const flatLandmarks = landmarks.flatMap(({ x, y, z }) => [x, y, z]);

          setFrameCount((prevCount) => {
            if (prevCount >= FRAME_INTERVAL) {
              setFrameCount(0);
              fetchPrediction(flatLandmarks);
            }
            return prevCount + 1;
          });
        }
      }
    });

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  const fetchPrediction = (landmarks) => {
    fetch("http://localhost:5050/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ landmarks }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.letter) {
          // Add letter to the history (limit to last 10)
          setLetters((prev) => [...prev.slice(-9), data.letter]);
        }
      })
      .catch((err) => {
        console.error("Prediction error:", err);
      });
  };

  return (
    <div style={{ position: "relative", width: 640, height: 520 }}>
      <div
        style={{
          fontSize: "2rem",
          marginBottom: "10px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        ASL Translator
      </div>
      <video
        ref={videoRef}
        style={{ display: "none" }}
        autoPlay
        playsInline
        muted
        width="640"
        height="480"
      />
      <canvas
        ref={canvasRef}
        style={{
          width: 640,
          height: 480,
        }}
      />
      <div className="output" style={{ textAlign: "center", marginTop: "10px" }}>
        Detected Letters: {letters.join(" ")}
      </div>
    </div>
  );
}
