import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

// ---------------------------------------------
// INITIALIZE MEDIAPIPE + CAMERA
// ---------------------------------------------

export const init = async ({
  faceLandmarkerRef,
  videoRef,
  streamRef,
  setExpression,
  setConfidence,
}) => {
  try {
    // Load MediaPipe vision tasks
    const vision =
      await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

    // Create Face Landmarker
    const faceLandmarker =
      await FaceLandmarker.createFromOptions(
        vision,
        {
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
        }
      );

    faceLandmarkerRef.current =
      faceLandmarker;

    // ---------------------------------------------
    // START CAMERA
    // ---------------------------------------------

    const stream =
      await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user",
        },
        audio: false,
      });

    streamRef.current = stream;

    if (!videoRef.current) return;

    videoRef.current.srcObject = stream;

    videoRef.current.onloadeddata = () => {
      detectExpression({
        faceLandmarkerRef,
        videoRef,
        setExpression,
        setConfidence,
        animationFrameRef: null,
      });
    };
  } catch (error) {
    console.error("MediaPipe Error:", error);

    setExpression("Camera Error");
  }
};

// ---------------------------------------------
// EXPRESSION DETECTION
// ---------------------------------------------

export const detectExpression = ({
  faceLandmarkerRef,
  videoRef,
  setExpression,
  setConfidence,
}) => {
  if (
    !videoRef.current ||
    !faceLandmarkerRef.current
  ) {
    return;
  }

  const video = videoRef.current;

  if (video.readyState < 2) {
    requestAnimationFrame(() =>
      detectExpression({
        faceLandmarkerRef,
        videoRef,
        setExpression,
        setConfidence,
      })
    );

    return;
  }

  try {
    const result =
      faceLandmarkerRef.current.detectForVideo(
        video,
        performance.now()
      );

    // ---------------------------------------------
    // CHECK FOR FACE
    // ---------------------------------------------

    if (
      result.faceBlendshapes &&
      result.faceBlendshapes.length > 0
    ) {
      const categories =
        result.faceBlendshapes[0].categories;

      // Convert blendshapes to object
      const scores = {};

      categories.forEach((category) => {
        scores[category.categoryName] =
          category.score;
      });

      // Get expression
      const detected = getExpression(scores);

      setExpression(detected.name);

      setConfidence(detected.confidence);
    } else {
      setExpression("No Face Detected");
      setConfidence(0);
    }
  } catch (error) {
    console.error(
      "Expression Detection Error:",
      error
    );
  }

  // Continue detection
  requestAnimationFrame(() =>
    detectExpression({
      faceLandmarkerRef,
      videoRef,
      setExpression,
      setConfidence,
    })
  );
};

// ---------------------------------------------
// EXPRESSION LOGIC
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
  const jawOpen =
    scores.jawOpen ?? 0;

  // ---------------------------------------------
  // EXPRESSION SCORES
  // ---------------------------------------------

  const expressions = {
    Happy: smile,

    Sad: frown,

    Angry: browDown,

    Surprised:
      (eyeWide + jawOpen) / 2,

    Neutral: 0.2,
  };

  // Find highest score
  const [name, score] =
    Object.entries(expressions).sort(
      (a, b) => b[1] - a[1]
    )[0];

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
    values.reduce(
      (sum, value) => sum + value,
      0
    ) / values.length
  );
}