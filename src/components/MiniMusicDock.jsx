import { useEffect, useMemo, useRef, useState } from "react";

const tracks = [
  {
    label: "When The Violin Cries 1",
    src: "/audio/when-the-violin-cries-1.mp3",
  },
  {
    label: "When The Violin Cries 2",
    src: "/audio/when-the-violin-cries-2.mp3",
  },
  { label: "Where It Was Lost", src: "/audio/where-it-was-lost.mp3" },
  {
    label: "Whispered Memories",
    src: "/audio/whispered-memories-piano-and-cello.mp3",
  },
];

const pickTrack = (items) => {
  if (!items.length) return null;
  return items[Math.floor(Math.random() * items.length)];
};

let sessionTrack = null;

const getSessionTrack = () => {
  if (!sessionTrack) {
    sessionTrack = pickTrack(tracks);
  }

  return sessionTrack;
};

const MiniMusicDock = () => {
  const audioRef = useRef(null);
  const [selectedTrack] = useState(getSessionTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);

  const label = useMemo(() => selectedTrack?.label || "Music", [selectedTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const handleTimeUpdate = () => {
      if (!audio.duration) {
        setProgress(0);
        return;
      }

      setProgress(audio.currentTime / audio.duration);
    };
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      setIsPlaying(false);
      setHasError(true);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [selectedTrack]);

  if (!selectedTrack || hasError) return null;

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      setIsPlaying(false);
      setHasError(true);
      console.error("Unable to play selected track", error);
    }
  };

  const circumference = 2 * Math.PI * 18;

  const progressOffset = circumference * (1 - progress);
  const expandedDockClasses = isPlaying
    ? "w-[260px] pr-2 shadow-[0_18px_70px_-28px_rgba(145,94,255,0.9)]"
    : "w-14 hover:w-[260px] hover:pr-2 hover:shadow-[0_18px_70px_-28px_rgba(145,94,255,0.9)]";
  const visibleLabelClasses = isPlaying
    ? "translate-x-0 opacity-100"
    : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100";

  return (
    <div
      className={`group fixed bottom-5 left-5 z-50 flex h-14 max-w-[260px] items-center overflow-hidden rounded-full bg-tertiary shadow-card transition-[width,padding,box-shadow] duration-500 ease-out ${expandedDockClasses}`}
    >
      <audio ref={audioRef} src={selectedTrack.src} preload="metadata" />

      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
        className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-tertiary text-white focus:outline-none"
      >
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-14 w-14 -rotate-90"
          viewBox="0 0 44 44"
        >
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
          />
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke="#915EFF"
            strokeLinecap="round"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            className="transition-[stroke-dashoffset] duration-300 ease-linear"
          />
        </svg>

        <svg
          aria-hidden="true"
          className="relative h-6 w-6 overflow-visible"
          viewBox="0 0 24 24"
        >
          <g
            className={`origin-center transition-all duration-300 ${
              isPlaying
                ? "scale-0 opacity-0 rotate-45"
                : "scale-100 opacity-100"
            }`}
          >
            <path
              d="M9 7.6v8.8c0 .7.78 1.12 1.36.73l6.34-4.4a.88.88 0 0 0 0-1.46l-6.34-4.4A.88.88 0 0 0 9 7.6Z"
              fill="currentColor"
              className="drop-shadow-[0_0_8px_rgba(145,94,255,0.5)]"
            />
          </g>
          <g
            className={`origin-center transition-all duration-300 ${
              isPlaying
                ? "scale-100 opacity-100"
                : "scale-0 opacity-0 -rotate-45"
            }`}
          >
            <rect
              x="7"
              y="6"
              width="3.4"
              height="12"
              rx="1.3"
              fill="currentColor"
            />
            <rect
              x="13.6"
              y="6"
              width="3.4"
              height="12"
              rx="1.3"
              fill="currentColor"
            />
          </g>
          {!isPlaying && (
            <path
              d="M5.8 8.2c1.15-1.7 3.02-2.78 5.2-2.98M18.2 15.8c-1.15 1.7-3.02 2.78-5.2 2.98"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              className="animate-pulse opacity-40"
            />
          )}
        </svg>
      </button>

      <div
        className={`grid min-w-0 flex-1 pr-4 transition-all duration-500 ease-out ${visibleLabelClasses}`}
      >
        <span
          className={`min-w-0 truncate whitespace-nowrap text-[13px] font-bold text-white ${
            isPlaying ? "music-label-playing" : ""
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default MiniMusicDock;
