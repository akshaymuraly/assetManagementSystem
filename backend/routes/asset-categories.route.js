const {
  addCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
} = require("../controllers/asse-cat.controller");
const Router = require("express").Router();

Router.post("/", addCategory);
Router.put("/:id", updateCategory);
Router.get("/", getAllCategories);
Router.delete("/:id", deleteCategory);

module.exports = Router;
