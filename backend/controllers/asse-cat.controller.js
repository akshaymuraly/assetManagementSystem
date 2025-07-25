const AssetCategory = require("../models/asset-categories.model");
const AsyncHandler = require("../utils/AsyncHandler");
const { CustomError } = require("../utils/CustomError");

// Create
const addCategory = AsyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description || name === "" || description === "") {
    throw new CustomError("Name and description are required", 400);
  }

  const category = await AssetCategory.create({ name, description });

  return res.status(201).json({
    status: true,
    message: "Category created successfully",
    data: category,
  });
});

// Read All
const getAllCategories = AsyncHandler(async (req, res) => {
  const categories = await AssetCategory.findAll();
  return res.status(200).json({
    status: true,
    data: categories,
  });
});

// Read One
const getCategoryById = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await AssetCategory.findByPk(id);

  if (!category) {
    throw new CustomError("Category not found", 404);
  }

  return res.status(200).json({
    status: true,
    data: category,
  });
});

// Update
const updateCategory = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, status } = req.body;

  const category = await AssetCategory.findByPk(id);

  if (!category) {
    throw new CustomError("Category not found", 404);
  }

  category.name = name ?? category.name;
  category.description = description ?? category.description;
  category.status = status ?? category.status;

  await category.save();

  return res.status(200).json({
    status: true,
    message: "Category updated successfully",
    data: category,
  });
});

// Delete
const deleteCategory = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await AssetCategory.findByPk(id);

  if (!category) {
    throw new CustomError("Category not found", 404);
  }

  await category.destroy();

  return res.status(200).json({
    status: true,
    message: "Category deleted successfully",
  });
});

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
