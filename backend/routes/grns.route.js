const {
  addGRN,
  getAllGRNs,
  getGRNById,
  updateGRN,
  deleteGRN,
} = require("../controllers/grns.controller");

const Router = require("express").Router();

Router.post("/", addGRN);
Router.get("/:id", getGRNById);
Router.put("/:id", updateGRN);
Router.delete("/:id", deleteGRN);
Router.get("/", getAllGRNs);

module.exports = Router;
