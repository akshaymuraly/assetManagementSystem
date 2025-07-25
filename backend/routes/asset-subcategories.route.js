const {
  addAssetSubCategory,
  getAllAssetSubCategories,
  getAssetSubCategoryById,
  updateAssetSubCategory,
  deleteAssetSubCategory,
} = require("../controllers/asset-sub.controller");

const Router = require("express").Router();

Router.post("/", addAssetSubCategory);
Router.get("/:id", getAssetSubCategoryById);
Router.put("/:id", updateAssetSubCategory);
Router.delete("/:id", deleteAssetSubCategory);
Router.get("/", getAllAssetSubCategories);

module.exports = Router;
