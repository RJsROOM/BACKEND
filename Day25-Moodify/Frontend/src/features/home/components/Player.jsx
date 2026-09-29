import { useContext, useEffect, useRef, useState } from "react";
import { SongContext } from "../song.context.jsx";
import "../../shared/player.scss";

const formatTime = (time) => {
  if (!Number.isFinite(time) || time < 0) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const Icon = ({ children, size = 20, className }) => (
  <svg
    aria-hidden="true"
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const Player = () => {
  const { song, loading, playbackRate, setPlaybackRate } = useContext(SongContext);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");

  const audioUrl = song?.url;
  const title = song?.title || "Choose a mood to find your next song";
  const mood = song?.mood || "MOODIFY PLAYER";
  const posterUrl = song?.posterUrl;
  const artist = song?.artist || song?.artistName || "Your personal soundtrack";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setPosition(0);
    setDuration(0);
    setIsPlaying(false);
    setError("");
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    setError("");
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setError("This track could not be played. Please try another song.");
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  const skip = (seconds) => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;
    const nextPosition = Math.max(0, Math.min(audio.currentTime + seconds, duration || Infinity));
    audio.currentTime = nextPosition;
    setPosition(nextPosition);
  };

  const seek = (event) => {
    const nextPosition = Number(event.target.value);
    if (!audioRef.current) return;
    audioRef.current.currentTime = nextPosition;
    setPosition(nextPosition);
  };

  return (
    <section className="mood-player" aria-label="Music player">
      <div className="mood-player__topline">
        <span className="mood-player__brand"><span className="mood-player__brand-dot" /> Now playing</span>
        <span className="mood-player__mood">{mood}</span>
      </div>

      <div className="mood-player__art" aria-label={posterUrl ? `${title} cover art` : "Moodify artwork"}>
        {posterUrl ? (
          <img className="mood-player__art-image" src={posterUrl} alt={`${title} cover`} />
        ) : (
          <Icon size={54} className="mood-player__art-icon">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </Icon>
        )}
      </div>

      <div className="mood-player__details">
        <h2 className="mood-player__title" title={title}>{title}</h2>
        <p className="mood-player__artist">{artist}</p>
      </div>

      <div className="mood-player__timeline">
        <input
          className="mood-player__range"
          aria-label="Seek through song"
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(position, duration || 0)}
          onChange={seek}
          disabled={!audioUrl || !duration}
        />
        <div className="mood-player__times" aria-live="off">
          <span>{formatTime(position)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="mood-player__controls" aria-label="Playback controls">
        <button
          className="mood-player__button mood-player__skip"
          type="button"
          aria-label="Back 5 seconds"
          title="Back 5 seconds"
          onClick={() => skip(-5)}
          disabled={!audioUrl}
        >
          <Icon size={25}><path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" /><path d="M3 3v5h5" /><path d="M12 8v8" /><path d="M10.5 9.5 12 8l1.5 1.5" /></Icon>
          <span className="mood-player__skip-label">5</span>
        </button>

        <button
          className="mood-player__button mood-player__play"
          type="button"
          aria-label={isPlaying ? "Pause" : "Play"}
          title={isPlaying ? "Pause" : "Play"}
          onClick={togglePlayback}
          disabled={!audioUrl || loading}
        >
          {isPlaying ? (
            <Icon size={24}><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></Icon>
          ) : (
            <Icon size={25}><path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none" /></Icon>
          )}
        </button>

        <button
          className="mood-player__button mood-player__skip"
          type="button"
          aria-label="Forward 5 seconds"
          title="Forward 5 seconds"
          onClick={() => skip(5)}
          disabled={!audioUrl}
        >
          <Icon size={25}><path d="M21 12a9 9 0 1 1-2.64-6.36L21 8" /><path d="M21 3v5h-5" /><path d="M12 8v8" /><path d="m10.5 9.5 1.5-1.5 1.5 1.5" /></Icon>
          <span className="mood-player__skip-label">5</span>
        </button>
      </div>

      <div className="mood-player__settings">
        <span>Playback speed</span>
        <label className="mood-player__speed-wrap">
          <span className="mood-player__speed-label">Speed</span>
          <select
            className="mood-player__speed"
            aria-label="Playback speed"
            value={playbackRate}
            onChange={(event) => setPlaybackRate(Number(event.target.value))}
          >
            {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
              <option key={rate} value={rate}>{rate}x</option>
            ))}
          </select>
        </label>
      </div>

      <p className={`mood-player__status${error ? " mood-player__status--error" : ""}`} role="status">
        {error || (loading ? "Finding a song for your mood…" : audioUrl ? "" : "Your next track will appear here.")}
      </p>

      <audio
        ref={audioRef}
        src={audioUrl || undefined}
        preload="metadata"
        onTimeUpdate={(event) => setPosition(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration || 0);
          event.currentTarget.playbackRate = playbackRate;
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => setError("This track could not be loaded. Please try another song.")}
      />
    </section>
  );
};

export default Player;
