// Converts a LinkedIn post link (or "Embed this post" code) into an embeddable iframe URL.
// Supports:
//   https://www.linkedin.com/posts/<company>_<slug>-activity-<id>-<hash>?utm_...
//   https://www.linkedin.com/feed/update/urn:li:activity:<id>
//   <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:<id>" ...>
export const getLinkedInEmbedUrl = (url?: string): string | null => {
    if (!url || !/linkedin\.com/i.test(url)) return null;

    const urnMatch = url.match(/urn:li:(activity|share|ugcPost):(\d+)/);
    if (urnMatch) {
        return `https://www.linkedin.com/embed/feed/update/urn:li:${urnMatch[1]}:${urnMatch[2]}`;
    }

    const activityMatch = url.match(/activity-(\d+)/);
    if (activityMatch) {
        return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityMatch[1]}`;
    }

    return null;
};
