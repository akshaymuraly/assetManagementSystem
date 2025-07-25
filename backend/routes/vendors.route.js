const {
  getAllVendors,
  addVendor,
  updateVendor,
  getVendorById,
  deleteVendor,
} = require("../controllers/vendors.controller");

const Router = require("express").Router();

Router.post("/", addVendor);
Router.get("/:id", getVendorById);
Router.put("/:id", updateVendor);
Router.delete("/:id", deleteVendor);
Router.get("/", getAllVendors);

module.exports = Router;
