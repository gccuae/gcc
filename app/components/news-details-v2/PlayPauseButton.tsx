const PlayPauseButton = ({
  isPlaying = false,
  onClick,
}: {
  isPlaying?: boolean;
  onClick: () => void;
}) => {
  return (
    // Always visible while paused, on hover (of the parent .group) while playing
    <button
      type="button"
      onClick={onClick}
      aria-label={isPlaying ? "Pause video" : "Play video"}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer rounded-full bg-white/90 flex h-14 w-14 xl:h-20 xl:w-20 items-center justify-center transition-all duration-300 hover:bg-[#0b0b0b] ${isPlaying ? "opacity-0 group-hover:opacity-100 focus-visible:opacity-100" : "opacity-100"}`}
    >
      {isPlaying ? (
        <svg viewBox="0 0 24 24" fill="#7AC142" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 xl:h-7 xl:w-7">
          <rect x="5" y="4" width="4.5" height="16" rx="1" />
          <rect x="14.5" y="4" width="4.5" height="16" rx="1" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="#7AC142" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 xl:h-7 xl:w-7 translate-x-[2px]">
          <path d="M7 4.5v15a1 1 0 0 0 1.53.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
        </svg>
      )}
    </button>
  );
};

export default PlayPauseButton;
