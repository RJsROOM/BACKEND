import { useEffect, useRef, useState } from "react";
import {detectExpression, init} from '../utils/utils'

export default function FaceExpression() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  // Store camera stream in a ref
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  // ---------------------------------------------
  // USE EFFECT
  // ---------------------------------------------

  useEffect(() => {
    init({faceLandmarkerRef, videoRef, streamRef});


    // Cleanup
    return () => {

    if(faceLandmarkerRef.current) {
      faceLandmarkerRef.current.close()
    }

    if(videoRef.current?.srcObject){
      videoRef.current.srcObject
        .getTracks()
        .forEach((track)=> track.stop());
    }
    };
  
  }, []);



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
      </div>
      <button onClick={()=>{detectExpression({faceLandmarkerRef, videoRef, setExpression})}}></button>
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