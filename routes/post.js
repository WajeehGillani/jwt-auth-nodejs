const { verify } = require("jsonwebtoken");

const router = require("express").Router();
const auth = require("../utils/authenticate");

router.get("/", auth, (req, res) => {
  res.json({ post: { title: "Main Post", description: "This secret Post" } });
});

module.exports = router;
