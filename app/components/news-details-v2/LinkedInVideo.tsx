import { getLinkedInEmbedUrl } from "@/lib/linkedinEmbed";
import type { LinkedInVideoSource } from "@/lib/linkedinVideo";
import VideoPlayer from "./VideoPlayer";

const LinkedInVideo = ({
  url,
  title,
  video,
}: {
  url: string;
  title?: string;
  video?: LinkedInVideoSource | null;
}) => {
  // Video only: the MP4 extracted from the post, streamed from LinkedIn's CDN
  if (video?.src) {
    return <VideoPlayer src={video.src} poster={video.poster} title={title} />;
  }

  // Fallback: full LinkedIn post embed
  const embedUrl = getLinkedInEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className="w-full bg-white">
      <iframe
        src={embedUrl}
        title={title || "LinkedIn video"}
        loading="lazy"
        allow="encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="w-full h-[550px] md:h-[650px] xl:h-[750px] border-0"
      />
    </div>
  );
};

export default LinkedInVideo;
