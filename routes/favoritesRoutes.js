const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");
const requireAuth = require("../middleware/requireAuth");

router.get("/favorites", requireAuth, (req, res) => favoritesController.show(req, res));
router.post("/favorites/add", requireAuth, (req, res) => favoritesController.add(req, res));
router.post("/favorites/remove", requireAuth, (req, res) => favoritesController.remove(req, res));

module.exports = router;
