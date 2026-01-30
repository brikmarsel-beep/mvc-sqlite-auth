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

    return res.render("favorites", { q, results, favorites, error });
  }

  async add(req, res) {
    const userId = req.session.user.id;
    const { videoId, title, thumbnailUrl } = req.body;

    await favoriteRepository.add({ userId, videoId, title, thumbnailUrl });

    return res.redirect("/favorites");
  }

  async remove(req, res) {
    const userId = req.session.user.id;
    const { favoriteId } = req.body;

    await favoriteRepository.remove({ userId, favoriteId });

    return res.redirect("/favorites");
  }
}

module.exports = new FavoritesController();
