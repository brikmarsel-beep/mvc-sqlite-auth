class YoutubeService {
  async search(query) {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) throw new Error("Missing YOUTUBE_API_KEY");

    const url =
      "https://www.googleapis.com/youtube/v3/search" +
      `?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(query)}` +
      `&key=${apiKey}`;

    const r = await fetch(url);
    const text = await r.text(); // read body no matter what

    if (!r.ok) {
      // show exact reason from Google
      throw new Error(`YouTube API failed: ${r.status} ${r.statusText} :: ${text}`);
    }

    const data = JSON.parse(text);

    return (data.items || []).map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails?.medium?.url || "",
    }));
  }
}

module.exports = new YoutubeService();

