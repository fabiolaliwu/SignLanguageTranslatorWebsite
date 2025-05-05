import React, { useEffect, useRef } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import * as HAND_CONNECTIONS from "@mediapipe/hands";

export function CameraFeed() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(-1, 1); // Mirror horizontally
      ctx.translate(-canvas.width, 0);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      ctx.restore();

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

          // Optional: log 63 values (x, y, z) for debugging or backend
          const flatLandmarks = landmarks.flatMap(({ x, y, z }) => [x, y, z]);
          console.log("Landmark vector (63D):", flatLandmarks);
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

  return (
    <div style={{ position: "relative", width: 640, height: 480 }}>
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
    </div>
  );
}
