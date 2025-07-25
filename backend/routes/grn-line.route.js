const {
  addGRNLineItem,
  getAllGRNLineItems,
  getGRNLineItemById,
  updateGRNLineItem,
  deleteGRNLineItem,
} = require("../controllers/grnline-items.controller");

const Router = require("express").Router();

Router.post("/", addGRNLineItem);
Router.get("/:id", getGRNLineItemById);
Router.put("/:id", updateGRNLineItem);
Router.delete("/:id", deleteGRNLineItem);
Router.get("/", getAllGRNLineItems);

module.exports = Router;
