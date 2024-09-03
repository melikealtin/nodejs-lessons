const router = require("express").Router();
const blogController = require("../controllers/blog-controller");

router.post("/blog", blogController.fetchArticlesByQuery);
router.get("/", blogController.fetchAllArticles);
router.get("/article/:id", blogController.fetchArticleById);

module.exports = router;
