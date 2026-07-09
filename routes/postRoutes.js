const express = require("express");
const {
  loadData,
  savePost,
  updatePost,
  deletePost,
} = require("../database/database");

const { setNonce } = require("../utils/csp");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allPosts = await loadData(
      "SELECT p.*, a.full_name AS fullName FROM posts p INNER JOIN authors a ON p.author_id=a.id",
    );
    console.log(allPosts);
    const nonce = setNonce(req, res);
    res.render("posts", { allPosts, nonce });
  } catch (error) {
    next(error);
  }
});

router.get("/view/:id", async (req, res, next) => {
  try {
    const nonce = setNonce(req, res);
    const thePost = await loadData(
      "SELECT p.*, a.full_name, a.email AS fullName FROM posts p INNER JOIN authors a ON p.author_id=a.id WHERE p.id = ?",
      [req.params.id],
    );
    if (!thePost || thePost.length === 0)
      return res.status(404).render("404", { nonce });
    res.render("postDetail", { thePost: thePost[0], nonce });
  } catch (error) {
    next(error);
  }
});

router.get("/edit/:id", async (req, res, next) => {
  try {
    const [post] = await loadData("SELECT * FROM posts WHERE id=?", [
      req.params.id,
    ]);
    if (!post) return res.render("404");
    res.render("edit-post", { post });
  } catch (error) {
    if (error) next(error);
  }
});

router.post("/edit/:id", async (req, res, next) => {
  let values = [];
  values = values.concat(Object.values(req.body)).concat(+req.params.id);
  console.log("values", values);
  try {
    const result = await updatePost(values);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    const nonce = setNonce(req, res);

    const sql = "SELECT * FROM authors";
    const authors = await loadData(sql);
    res.render("create-post", { authors, nonce });
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  const values = { ...req.body, author_id: +req.body.author_id };
  try {
    console.log(values);
    const resp = await savePost(Object.values(values));
    console.log(resp);
    res.redirect("/");
  } catch (e) {
    next(e);
  }
});

router.post(
  "/delete",
  async (req, res, next) => {
    try {
      const id = req.body.id;
      const result = await deletePost([id]);
      console.log("result", result);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  (e, req, res, next) => {
    if (e) res.render("500");
  },
);

module.exports = router;
