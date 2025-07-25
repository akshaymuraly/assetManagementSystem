const Branch = require("../models/brancehs.model");
const AsyncHandler = require("../utils/AsyncHandler");
const { CustomError } = require("../utils/CustomError");

// Create
const addBranch = AsyncHandler(async (req, res, next) => {
  const { name, location, code, status } = req.body;

  if (!name || name.trim() === "") {
    throw new CustomError("Branch name is required", 400);
  }

  const branch = await Branch.create({ name, location, code, status });

  res.status(201).json({
    status: true,
    message: "Branch created successfully",
    data: branch,
  });
});

// Read All
const getAllBranches = AsyncHandler(async (req, res) => {
  const branches = await Branch.findAll();
  res.status(200).json({
    status: true,
    data: branches,
  });
});

// Read One
const getBranchById = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const branch = await Branch.findByPk(id);

  if (!branch) {
    throw new CustomError("Branch not found", 404);
  }

  res.status(200).json({
    status: true,
    data: branch,
  });
});

// Update
const updateBranch = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, location, code, status } = req.body;

  const branch = await Branch.findByPk(id);

  if (!branch) {
    throw new CustomError("Branch not found", 404);
  }

  branch.name = name ?? branch.name;
  branch.location = location ?? branch.location;
  branch.code = code ?? branch.code;
  branch.status = status ?? branch.status;

  await branch.save();

  res.status(200).json({
    status: true,
    message: "Branch updated successfully",
    data: branch,
  });
});

// Delete
const deleteBranch = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const branch = await Branch.findByPk(id);

  if (!branch) {
    throw new CustomError("Branch not found", 404);
  }

  await branch.destroy();

  res.status(200).json({
    status: true,
    message: "Branch deleted successfully",
  });
});

module.exports = {
  addBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
};
