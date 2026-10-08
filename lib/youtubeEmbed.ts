// Extracts the 11-character video ID from a YouTube link.
// Supports:
//   https://www.youtube.com/watch?v=<id>&t=10s
//   https://youtu.be/<id>?si=...
//   https://www.youtube.com/shorts/<id>
//   https://www.youtube.com/live/<id>
//   https://www.youtube.com/embed/<id>  (also youtube-nocookie.com)
export const getYouTubeId = (url?: string): string | null => {
    if (!url) return null;
    const match = url.match(
        /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?![A-Za-z0-9_-])/
    );
    return match ? match[1] : null;
};
