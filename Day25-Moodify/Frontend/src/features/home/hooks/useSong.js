import { useContext } from "react";
import { SongContext } from "../song.context.jsx";
import { getSong } from "../service/song.api.js";

export const useSong = () => {
  const context = useContext(SongContext);

  if (!context) {
    throw new Error("useSong must be used inside SongContextProvider.");
  }

  const {
    loading,
    setLoading,
    song,
    setSong,
    playbackRate,
    setPlaybackRate,
    savedExpression,
    setSavedExpression,
  } = context;

  const handleGetSong = async ({ mood }) => {
    setLoading(true);

    try {
      const data = await getSong({ mood });
      const nextSong = data.song ?? null;
      setSong(nextSong);
      return nextSong;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    song,
    playbackRate,
    setPlaybackRate,
    savedExpression,
    setSavedExpression,
    handleGetSong,
  };
};
