import { useEffect, useRef, useState } from "react";
import { useSong } from "../../home/hooks/useSong.js";
import { detectExpression, init } from "../utils/utils.js";

const moodByExpression = {
  Happy: "happy",
  Sad: "sad",
  Angry: "sad",
  Surprised: "surprised",
  Neutral: "happy",
};

export default function FaceExpression() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [captureMessage, setCaptureMessage] = useState("");
  const [capturing, setCapturing] = useState(false);
  const { loading, savedExpression, setSavedExpression, handleGetSong } = useSong();

  useEffect(() => {
    let isMounted = true;

    init({
      faceLandmarkerRef,
      videoRef,
      streamRef,
      onReady: () => {
        if (isMounted) setCameraReady(true);
      },
      onError: (error) => {
        if (!isMounted) return;
        setCameraError(error.message || "Could not start the camera.");
      },
    });

    return () => {
      isMounted = false;

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      faceLandmarkerRef.current?.close();
      faceLandmarkerRef.current = null;
    };
  }, []);

  const handleCapture = async () => {
    if (!cameraReady || capturing || loading) return;

    setCapturing(true);
    setCaptureMessage("");

    try {
      const detected = detectExpression({ faceLandmarkerRef, videoRef });

      if (!detected) {
        setCaptureMessage("The camera is still getting ready. Try again in a moment.");
        return;
      }

      if (detected.name === "No Face Detected") {
        setCaptureMessage("No face found. Center your face in the frame and try again.");
        return;
      }

      const mood = moodByExpression[detected.name];
      const saved = {
        name: detected.name,
        confidence: detected.confidence,
        mood,
      };

      setSavedExpression(saved);
      setCaptureMessage(`Saved ${saved.name}. Finding a ${mood} song...`);

      const matchedSong = await handleGetSong({ mood });
      setCaptureMessage(
        matchedSong
          ? `Saved ${saved.name} and found a ${mood} song.`
          : `Saved ${saved.name}, but no ${mood} song is available yet.`
      );
    } catch (error) {
      console.error("Could not save the expression or load a song:", error);
      setCaptureMessage("Something went wrong. Please try capturing your expression again.");
    } finally {
      setCapturing(false);
    }
  };

  const buttonLabel = cameraError
    ? "Camera unavailable"
    : capturing || loading
      ? "Finding your song..."
      : cameraReady
        ? "Save expression and find a song"
        : "Starting camera…";

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

      <button
        type="button"
        onClick={handleCapture}
        disabled={!cameraReady || Boolean(cameraError) || capturing || loading}
        style={{
          ...styles.captureButton,
          opacity: cameraReady && !cameraError && !capturing && !loading ? 1 : 0.65,
          cursor: cameraReady && !cameraError && !capturing && !loading ? "pointer" : "not-allowed",
        }}
      >
        {buttonLabel}
      </button>

      <div style={styles.result}>
        {savedExpression ? (
          <>
            <h3>Saved expression: {savedExpression.name}</h3>
            <p>Song mood: {savedExpression.mood}</p>
            <p>Confidence: {(savedExpression.confidence * 100).toFixed(1)}%</p>
          </>
        ) : (
          <h3>{cameraError ? "Camera could not start" : cameraReady ? "Ready when you are" : "Starting camera..."}</h3>
        )}

        {(cameraError || captureMessage) && (
          <p role="status" style={styles.status}>
            {cameraError || captureMessage}
          </p>
        )}
      </div>
    </div>
  );
}

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

  captureButton: {
    padding: "12px 18px",
    color: "#241b38",
    background: "linear-gradient(145deg, #e0ceff, #b69aff)",
    border: "0",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(167, 130, 255, 0.22)",
    font: "inherit",
    fontWeight: 700,
    transition: "opacity 0.18s ease, transform 0.18s ease",
  },

  result: {
    textAlign: "center",
  },

  status: {
    maxWidth: "100%",
    marginTop: "6px",
    color: "#f4eaff",
    fontSize: "14px",
  },
};
