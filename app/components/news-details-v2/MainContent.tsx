"use client";

import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import ImageSlider from "./ImageSlider";
import LinkedInVideo from "./LinkedInVideo";
import { getLinkedInEmbedUrl } from "@/lib/linkedinEmbed";
import type { LinkedInVideoSource } from "@/lib/linkedinVideo";
import YouTubeVideo from "./YouTubeVideo";
import { getYouTubeId } from "@/lib/youtubeEmbed";

const MainContent = ({
  title,
  subTitle,
  content,
  images,
  videoUrl,
  video,
}: {
  title: string;
  subTitle: string;
  content: string;
  images: string[];
  videoUrl?: string;
  video?: LinkedInVideoSource | null;
}) => {
  // Video (YouTube or LinkedIn link) shows first, with the image slider below it
  const youTubeId = getYouTubeId(videoUrl);
  const hasLinkedIn = !youTubeId && !!getLinkedInEmbedUrl(videoUrl);
  const hasVideo = !!youTubeId || hasLinkedIn;
  const hasImages = !!images?.length;

  return (
    <div>
      <motion.h3
        variants={moveUp(0.2)}
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        className="text-xl xl:text-2xl leading-lh-text32 font-normal mb-5 xl:mb-[27px] text-black dark:text-white"
      >
        {subTitle}
      </motion.h3>
      <motion.div
        variants={moveUp(0.4)}
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        className="relative h-fit"
      >
        {youTubeId && <YouTubeVideo videoId={youTubeId} title={title} />}
        {hasLinkedIn && <LinkedInVideo url={videoUrl!} title={title} video={video} />}
        {hasImages && (
          <div className={`relative ${hasVideo ? "mt-5 xl:mt-[27px]" : ""}`}>
            <ImageSlider images={images} />
          </div>
        )}
      </motion.div>
      <div className="mt-3 md:mt-6">
        <motion.div
          variants={moveUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          dangerouslySetInnerHTML={{
            __html: content
              ?.replace(/&nbsp;/g, ' ')
              .replace(/ /g, ' ')
              .replace(/ {2,}/g, ' ')
          }}
          className="news-details [&_p]:!text-base 2xl:[&_p]:!text-lg [&_p]:!leading-[1.7] [&_p]:!whitespace-normal [&_p]:!break-words"
        />
      </div>
    </div>
  );
};

export default MainContent;
