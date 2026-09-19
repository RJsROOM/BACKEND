import { useEffect, useRef, useState } from "react";

import {
  init,
} from "../utils/utils";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] =
    useState("Detecting...");

  const [confidence, setConfidence] =
    useState(0);

  useEffect(() => {
    init({
      faceLandmarkerRef,
      videoRef,
      streamRef,
      setExpression,
      setConfidence,
    });

    return () => {
      // Stop camera
      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());

        streamRef.current = null;
      }

      // Close MediaPipe
      faceLandmarkerRef.current?.close();

      faceLandmarkerRef.current = null;
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

        {confidence > 0 && (
          <p>
            Confidence:{" "}
            {(confidence * 100).toFixed(1)}%
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

  result: {
    textAlign: "center",
  },
};



/*

in this we hve used BLACKBOX programming approach. this approach tells us that we know the functioning of the elements but we do not know the cdde written in it. we only use the functions as we please accordingly.


Token Blacklisting:
                  it is a wya of invalidating a JWT token before its expiration time. it is used to prevent unauthorized access to protected resources by revoking the token's validity. when a user logs out or their session is terminated, the token is added to a blacklist named list, and any subsequent requests with that token are denied which secures the application by ensuring that only valid tokens are accepted for authentication and authorization.
                  

*/