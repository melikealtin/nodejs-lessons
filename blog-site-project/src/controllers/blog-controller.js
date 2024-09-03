const axios = require("axios");

const fetchArticlesByQuery = async (req, res) => {
  const username = req.body.search;

  try {
    const blogAPI = await axios.get(
      `https://dev.to/api/articles?username=${username}`
    );

    res.render("./articles/index", { articles: blogAPI.data });
  } catch (err) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.header);
    res.json({
      message: "Error: " + err.response.data,
    });
  }
};

const fetchAllArticles = async (req, res) => {
  try {
    const blogAPI = await axios.get("https://dev.to/api/articles");

    res.render("./articles/index", { articles: blogAPI.data });
  } catch (err) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.header);
    res.json({
      message: "Error: " + err.response.data,
    });
  }
};

const fetchArticleById = async (req, res) => {
  let articleID = req.params.id;

  try {
    const article = await axios.get(`https://dev.to/api/articles/${articleID}`);
    console.log(article.data);

    res.render("./articles/article", { article: article.data });
  } catch (err) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.header);
    res.json({
      message: "Error: " + err.response.data,
    });
  }
};

module.exports = {
  fetchAllArticles,
  fetchArticleById,
  fetchArticlesByQuery,
};
