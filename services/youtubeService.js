const fetch = require("node-fetch");
const API_KEY = process.env.YOUTUBE_API_KEY;

exports.search = async (q) => {
  if (!API_KEY) return [];

  const url =
    "https://www.googleapis.com/youtube/v3/search" +
    `?part=snippet&type=video&maxResults=9&q=${encodeURIComponent(q)}` +
    `&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.items) return [];

  return data.items.map((item) => ({
    video_id: item.id.videoId,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails?.medium?.url || ""
  }));
};