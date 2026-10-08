import { getLinkedInEmbedUrl } from "./linkedinEmbed";

export type LinkedInVideoSource = {
    src: string;
    poster?: string;
};

const decodeHtml = (value: string) => value.replace(/&quot;/g, '"').replace(/&amp;/g, "&");

// Only accept media served from LinkedIn's CDN
const isLinkedInMedia = (url?: string) => !!url && /^https:\/\/[a-z0-9.-]+\.licdn\.com\//i.test(url);

// Server-only: reads the MP4 file behind a LinkedIn post from its public embed page.
// LinkedIn's player keeps the files in the <video data-sources="..."> attribute.
// Not an official API — returns null on any failure so the caller can fall back to the iframe embed.
export const getLinkedInVideo = async (postUrl?: string): Promise<LinkedInVideoSource | null> => {
    const embedUrl = getLinkedInEmbedUrl(postUrl);
    if (!embedUrl) return null;

    try {
        const response = await fetch(embedUrl, {
            next: { revalidate: 86400 }, // check LinkedIn at most once a day per post
            signal: AbortSignal.timeout(3000),
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
            },
        });
        if (!response.ok) return null;
        const html = await response.text();

        const rawSources = html.match(/data-sources="([^"]+)"/)?.[1];
        if (!rawSources) return null;

        const sources: { src: string; type?: string; "data-bitrate"?: number }[] = JSON.parse(decodeHtml(rawSources));
        const best = sources
            .filter((source) => source.type === "video/mp4" && isLinkedInMedia(source.src))
            .sort((a, b) => (b["data-bitrate"] ?? 0) - (a["data-bitrate"] ?? 0))[0];
        if (!best) return null;

        const rawPoster = html.match(/data-poster-url="([^"]+)"/)?.[1];
        const poster = rawPoster ? decodeHtml(rawPoster) : undefined;

        return { src: best.src, poster: isLinkedInMedia(poster) ? poster : undefined };
    } catch (error) {
        console.log("Error in fetching LinkedIn video", error);
        return null;
    }
};
