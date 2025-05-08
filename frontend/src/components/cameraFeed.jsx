import React, { useEffect, useRef, useState } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import * as HAND_CONNECTIONS from "@mediapipe/hands";

export function CameraFeed() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const latestLandmarksRef = useRef(null); // ✅ Store latest frame's landmarks
  const [letters, setLetters] = useState([]);

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

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
      
        drawConnectors(ctx, landmarks, HAND_CONNECTIONS.HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 2,
        });
        drawLandmarks(ctx, landmarks, {
          color: "#FF0000",
          lineWidth: 1,
        });
      
        const flat = landmarks.flatMap(({ x, y, z }) => [x, y, z]);
        latestLandmarksRef.current = flat; // ✅ Save if valid
      } else {
        latestLandmarksRef.current = null; // ✅ Clear if no hand
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

    // ✅ Detect every 5 seconds using interval
    const interval = setInterval(() => {
      if (latestLandmarksRef.current) {
        fetchPrediction(latestLandmarksRef.current);
      }
    }, 2000);

    return () => clearInterval(interval); // ✅ Clean up
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
          setLetters((prev) => [...prev.slice(-9), data.letter]);
        }
      })
      .catch((err) => {
        console.error("Prediction error:", err);
      });
  };

  return (
    <div style={{ position: "relative", width: 640, height: 520 }}>
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
      <div className="output" style={{ textAlign: "center", marginTop: "75px" }}>
        Detected Letters: {letters.join(" ")}
      </div>
    </div>
  );
}
