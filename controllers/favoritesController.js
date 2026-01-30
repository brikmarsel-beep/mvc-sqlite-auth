const youtubeService = require("../services/youtubeService");
const favoriteRepository = require("../repositories/favoriteRepository");

class FavoritesController {
  async show(req, res) {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const userId = req.session.user.id;
  const q = (req.query.q || "").trim();

  let results = [];
  let error = null;

  try {
    if (q) {
      results = await youtubeService.search(q);
    }
  } catch (err) {
    console.error("YouTube error:", err.message);
    error = "YouTube search failed. Please try again later.";
  }

  const favorites = await favoriteRepository.getByUserId(userId);

  res.render("favorites", {
    q,
    results,
    favorites,
    error,
  });
  }
}
