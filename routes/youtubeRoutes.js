const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const youtubeController = require("../controllers/youtubeController");

const router = express.Router();

router.get("/youtube", requireAuth, youtubeController.getPage);
router.get("/youtube/search", requireAuth, youtubeController.search);
router.post("/youtube/save", requireAuth, youtubeController.save);
router.post("/youtube/delete", requireAuth, youtubeController.delete);

module.exports = router;