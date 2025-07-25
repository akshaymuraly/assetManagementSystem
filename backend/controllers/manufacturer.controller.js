const Manufacturer = require("../models/manufacturer.model");
const AsyncHandler = require("../utils/AsyncHandler");
const { CustomError } = require("../utils/CustomError");

// Create
const addManufacturer = AsyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name || name.trim() === "") {
    throw new CustomError("Manufacturer name is required", 400);
  }

  const manufacturer = await Manufacturer.create({ name, description });

  res.status(201).json({
    status: true,
    message: "Manufacturer created successfully",
    data: manufacturer,
  });
});

// Read All
const getAllManufacturers = AsyncHandler(async (req, res) => {
  const manufacturers = await Manufacturer.findAll();
  res.status(200).json({
    status: true,
    data: manufacturers,
  });
});

// Read One
const getManufacturerById = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const manufacturer = await Manufacturer.findByPk(id);

  if (!manufacturer) {
    throw new CustomError("Manufacturer not found", 404);
  }

  res.status(200).json({
    status: true,
    data: manufacturer,
  });
});

// Update
const updateManufacturer = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const manufacturer = await Manufacturer.findByPk(id);

  if (!manufacturer) {
    throw new CustomError("Manufacturer not found", 404);
  }

  manufacturer.name = name ?? manufacturer.name;
  manufacturer.description = description ?? manufacturer.description;

  await manufacturer.save();

  res.status(200).json({
    status: true,
    message: "Manufacturer updated successfully",
    data: manufacturer,
  });
});

// Delete
const deleteManufacturer = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const manufacturer = await Manufacturer.findByPk(id);

  if (!manufacturer) {
    throw new CustomError("Manufacturer not found", 404);
  }

  await manufacturer.destroy();

  res.status(200).json({
    status: true,
    message: "Manufacturer deleted successfully",
  });
});

module.exports = {
  addManufacturer,
  getAllManufacturers,
  getManufacturerById,
  updateManufacturer,
  deleteManufacturer,
};
