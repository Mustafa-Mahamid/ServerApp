const repo = require("../repositories/videoFavoritesRepository");
const youtubeService = require("../services/youtubeService");

exports.getPage = async (req, res) => {
  const userId = req.session.user.id;
  const favorites = await repo.getByUserId(userId);
  res.render("youtube", { favorites, results: [], q: "" });
};

exports.search = async (req, res) => {
  const userId = req.session.user.id;
  const q = (req.query.q || "").trim();

  const favorites = await repo.getByUserId(userId);
  const results = q ? await youtubeService.search(q) : [];

  res.render("youtube", { favorites, results, q });
};

exports.save = async (req, res) => {
  const userId = req.session.user.id;

  await repo.add(userId, {
    video_id: req.body.video_id,
    title: req.body.title,
    channel: req.body.channel,
    thumbnail: req.body.thumbnail
  });

  res.redirect("/youtube");
};

exports.delete = async (req, res) => {
  const userId = req.session.user.id;
  await repo.remove(userId, req.body.id);
  res.redirect("/youtube");
};