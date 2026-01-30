const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const favoritesController = require("../controllers/favoritesController");

router.get("/favorites", requireAuth, (req, res) => favoritesController.show(req, res));
router.post("/favorites/add", requireAuth, (req, res) => favoritesController.add(req, res));
router.post("/favorites/delete", requireAuth, (req, res) => favoritesController.remove(req, res));

module.exports = router;
