const router = require("express").Router();
const Category = require("../database/models/Category");

router.post("/create-category", async (req, res) => {
  //category already exist
  const categoryExist = await Category.findOne({ name: req.body.name });
  if (categoryExist) return res.status(400).send("already Exit");

  const category = new Category({
    name: req.body.name,
  });
  try {
    await category.save();
    res.send({ category: category.id });
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
