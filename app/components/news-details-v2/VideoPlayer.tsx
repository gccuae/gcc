"use client";

import { useRef, useState } from "react";
import PlayPauseButton from "./PlayPauseButton";

const VideoPlayer = ({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  return (
    <div className="group relative">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="none"
        aria-label={title || "News video"}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className="block w-full h-auto max-h-[600px] object-contain bg-black"
      />
      <PlayPauseButton isPlaying={isPlaying} onClick={togglePlay} />
    </div>
  );
};

export default VideoPlayer;
