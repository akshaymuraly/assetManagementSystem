const {
  getAllManufacturers,
  addManufacturer,
  updateManufacturer,
  getManufacturerById,
  deleteManufacturer,
} = require("../controllers/manufacturer.controller");

const Router = require("express").Router();

Router.post("/", addManufacturer);
Router.get("/:id", getManufacturerById);
Router.put("/:id", updateManufacturer);
Router.delete("/:id", deleteManufacturer);
Router.get("/", getAllManufacturers);

module.exports = Router;
