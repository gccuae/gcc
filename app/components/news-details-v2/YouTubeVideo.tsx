"use client";

import { useState } from "react";
import PlayPauseButton from "./PlayPauseButton";

// Lightweight YouTube player: shows only the thumbnail until clicked, then loads the official embed
const YouTubeVideo = ({ videoId, title }: { videoId: string; title?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-video bg-black">
      {isLoaded ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
          title={title || "YouTube video"}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt={title || "YouTube video"}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <PlayPauseButton onClick={() => setIsLoaded(true)} />
        </>
      )}
    </div>
  );
};

export default YouTubeVideo;
