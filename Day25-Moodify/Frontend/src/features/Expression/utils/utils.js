import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";



export const init = async ({faceLandmarkerRef, videoRef, streamRef}) => {
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

    //   // If component was already removed, close MediaPipe
    //   if (cancelled) {
    //     faceLandmarker.close();
    //     return;
    //   }

      faceLandmarkerRef.current = faceLandmarker;

      // Start camera
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user",
        },
        audio: false,
      });

    //   if (cancelled) {
    //     stream.getTracks().forEach((track) => track.stop());
    //     return;
    //   }

      if (!videoRef.current) return;

      videoRef.current.srcObject = streamRef.current;

      videoRef.current.onloadeddata = () => {
        detectExpression();
      };
    } catch (error) {
      console.error("MediaPipe Error:", error);

    //   if (!cancelled) {
    //     setExpression("Camera Error");
    //   }
    }
  };


export const detectExpression = ({faceLandmarkerRef, videoRef, setExpression}) => {
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