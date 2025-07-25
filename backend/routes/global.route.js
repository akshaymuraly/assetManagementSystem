const Router = require("express").Router();
const Vendor = require("./vendors.route");
const AssetCat = require("./asset-categories.route");
const SubCat = require("./asset-subcategories.route");
const Grns = require("./grns.route");
const manufacturers = require("./manufacture.route");
const branches = require("./branches.routes");
const grnLineItems = require("./grn-line.route");

Router.use("/asset-categories", AssetCat);
Router.use("/asset-subcategories", SubCat);
Router.use("/branches", branches);
Router.use("/vendors", Vendor);
Router.use("/manufacturers", manufacturers);
Router.use("/grns", Grns);
Router.use("/grn-line-items", grnLineItems);

module.exports = Router;
