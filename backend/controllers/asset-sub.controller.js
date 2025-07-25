const AssetSubCategory = require("../models/asset-sub.model");
const AssetCategory = require("../models/asset-categories.model");
const AsyncHandler = require("../utils/AsyncHandler");
const { CustomError } = require("../utils/CustomError");

// Create
const addAssetSubCategory = AsyncHandler(async (req, res, next) => {
  const { category_id, name, description, status } = req.body;

  if (!category_id || !name || name.trim() === "") {
    throw new CustomError("Category ID and Subcategory name are required", 400);
  }

  // Validate category existence
  const category = await AssetCategory.findByPk(category_id);
  if (!category) {
    throw new CustomError("Referenced Category does not exist", 404);
  }

  const subcategory = await AssetSubCategory.create({
    category_id,
    name,
    description,
    status,
  });

  res.status(201).json({
    status: true,
    message: "Asset subcategory created successfully",
    data: subcategory,
  });
});

// Read All
const getAllAssetSubCategories = AsyncHandler(async (req, res) => {
  const subcategories = await AssetSubCategory.findAll({
    include: {
      model: AssetCategory,
      attributes: ["id", "name"],
    },
  });

  res.status(200).json({
    status: true,
    data: subcategories,
  });
});

// Read One
const getAssetSubCategoryById = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subcategory = await AssetSubCategory.findByPk(id, {
    include: {
      model: AssetCategory,
      attributes: ["id", "name"],
    },
  });

  if (!subcategory) {
    throw new CustomError("Asset subcategory not found", 404);
  }

  res.status(200).json({
    status: true,
    data: subcategory,
  });
});

// Update
const updateAssetSubCategory = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { category_id, name, description, status } = req.body;

  const subcategory = await AssetSubCategory.findByPk(id);
  if (!subcategory) {
    throw new CustomError("Asset subcategory not found", 404);
  }

  if (category_id) {
    const category = await AssetCategory.findByPk(category_id);
    if (!category) {
      throw new CustomError("Referenced Category does not exist", 404);
    }
    subcategory.category_id = category_id;
  }

  subcategory.name = name ?? subcategory.name;
  subcategory.description = description ?? subcategory.description;
  subcategory.status = status ?? subcategory.status;

  await subcategory.save();

  res.status(200).json({
    status: true,
    message: "Asset subcategory updated successfully",
    data: subcategory,
  });
});

// Delete
const deleteAssetSubCategory = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subcategory = await AssetSubCategory.findByPk(id);
  if (!subcategory) {
    throw new CustomError("Asset subcategory not found", 404);
  }

  await subcategory.destroy();

  res.status(200).json({
    status: true,
    message: "Asset subcategory deleted successfully",
  });
});

module.exports = {
  addAssetSubCategory,
  getAllAssetSubCategories,
  getAssetSubCategoryById,
  updateAssetSubCategory,
  deleteAssetSubCategory,
};
