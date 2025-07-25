const {
  getAllBranches,
  addBranch,
  updateBranch,
  getBranchById,
  deleteBranch,
} = require("../controllers/branches.controller");

const Router = require("express").Router();

Router.post("/", addBranch);
Router.get("/:id", getBranchById);
Router.put("/:id", updateBranch);
Router.delete("/:id", deleteBranch);
Router.get("/", getAllBranches);

module.exports = Router;
