import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Store camera stream in a ref
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");
  const [confidence, setConfidence] = useState(0);

  // ---------------------------------------------
  // USE EFFECT
  // ---------------------------------------------

  useEffect(() => {
  let cancelled = false;
  let stream = null;

  const initialize = async () => {
    try {
      // Load MediaPipe vision tasks
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      // Create Face Landmarker
      const faceLandmarker =
        await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },

          runningMode: "VIDEO",
          numFaces: 1,
          outputFaceBlendshapes: true,

          minFaceDetectionConfidence: 0.2,
          minFacePresenceConfidence: 0.2,
          minTrackingConfidence: 0.2,
        });

      // If component was already removed, close MediaPipe
      if (cancelled) {
        faceLandmarker.close();
        return;
      }

      faceLandmarkerRef.current = faceLandmarker;

      // Start camera
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user",
        },
        audio: false,
      });

      if (cancelled) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;

      if (!videoRef.current) return;

      videoRef.current.srcObject = stream;

      videoRef.current.onloadeddata = () => {
        detectExpression();
      };
    } catch (error) {
      console.error("MediaPipe Error:", error);

      if (!cancelled) {
        setExpression("Camera Error");
      }
    }
  };

  initialize();

  // Cleanup
  return () => {
    cancelled = true;

    // Stop animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Capture current stream before cleanup
    const currentStream = streamRef.current;

    if (currentStream) {
      currentStream
        .getTracks()
        .forEach((track) => track.stop());
    }

    streamRef.current = null;

    // Close MediaPipe
    faceLandmarkerRef.current?.close();
    faceLandmarkerRef.current = null;
  };
  }, []);

  const detectExpression = () => {
    if (!videoRef.current || !faceLandmarkerRef.current) {
      animationFrameRef.current =
        requestAnimationFrame(detectExpression);

      return;
    }

    const video = videoRef.current;

    if (video.readyState >= 2) {
      const result =
        faceLandmarkerRef.current.detectForVideo(
          video,
          performance.now()
        );

      // Check if a face was detected
      if (result.faceBlendshapes?.length > 0) {
        const categories =
          result.faceBlendshapes[0].categories;

        // Convert blendshapes into an object
        const scores = {};

        categories.forEach((category) => {
          scores[category.categoryName] = category.score;
        });

        // Detect expression
        const detected = getExpression(scores);

        setExpression(detected.name);
        setConfidence(detected.confidence);
      } else {
        setExpression("No Face Detected");
        setConfidence(0);
      }
    }

    animationFrameRef.current =
      requestAnimationFrame(detectExpression);
  };

  return (
    <div style={styles.container}>
      <h2>Face Expression Detector</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={styles.video}
      />

      <div style={styles.result}>
        <h3>{expression}</h3>

        {confidence > 0 && (
          <p>
            Confidence: {(confidence * 100).toFixed(1)}%
          </p>
        )}
      </div>
    </div>
  );
}


// ---------------------------------------------
// EXPRESSION DETECTION
// ---------------------------------------------

function getExpression(scores) {
  // Smile
  const smile = average(
    scores.mouthSmileLeft ?? 0,
    scores.mouthSmileRight ?? 0
  );

  // Frown
  const frown = average(
    scores.mouthFrownLeft ?? 0,
    scores.mouthFrownRight ?? 0
  );

  // Eyebrows down
  const browDown = average(
    scores.browDownLeft ?? 0,
    scores.browDownRight ?? 0
  );

  // Eyes wide
  const eyeWide = average(
    scores.eyeWideLeft ?? 0,
    scores.eyeWideRight ?? 0
  );

  // Mouth open
  const jawOpen = scores.jawOpen ?? 0;


  // ---------------------------------------------
  // Calculate expression scores
  // ---------------------------------------------

  const expressions = {
    Happy: smile,

    Sad: frown,

    Angry: browDown,

    Surprised: (eyeWide + jawOpen) / 2,

    Neutral: 0.2,
  };


  // Find highest score
  const [name, score] = Object.entries(expressions)
    .sort((a, b) => b[1] - a[1])[0];


  return {
    name,
    confidence: Math.min(score, 1),
  };
}


// ---------------------------------------------
// HELPER
// ---------------------------------------------

function average(...values) {
  return (
    values.reduce((sum, value) => sum + value, 0) /
    values.length
  );
}


// ---------------------------------------------
// STYLES
// ---------------------------------------------

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },

  video: {
    width: "640px",
    maxWidth: "100%",
    borderRadius: "12px",
    transform: "scaleX(-1)",
  },

  result: {
    textAlign: "center",
  },
};



/*

in this we hve used BLACKBOX programming approach. this approach tells us that we know the functioning of the elements but we do not know the cdde written in it. we only use the functions as we please accordingly.

*/