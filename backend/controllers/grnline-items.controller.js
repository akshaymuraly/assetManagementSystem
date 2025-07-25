const GRNLineItem = require("../models/grn-line-item.model");
const GRNHeader = require("../models/grns.model");
const AssetSubCategory = require("../models/asset-sub.model");
const AsyncHandler = require("../utils/AsyncHandler");
const { CustomError } = require("../utils/CustomError");

// Create
const addGRNLineItem = AsyncHandler(async (req, res, next) => {
  const {
    grn_id,
    subcategory_id,
    item_description,
    quantity,
    unit_price,
    tax_percent,
  } = req.body;

  if (
    !grn_id ||
    !subcategory_id ||
    !item_description ||
    !quantity ||
    !unit_price
  ) {
    throw new CustomError(
      "grn_id, subcategory_id, item_description, quantity, and unit_price are required",
      400
    );
  }

  // Validate GRN
  const grn = await GRNHeader.findByPk(grn_id);
  if (!grn) throw new CustomError("GRN not found", 404);

  // Validate Subcategory
  const subcategory = await AssetSubCategory.findByPk(subcategory_id);
  if (!subcategory) throw new CustomError("Asset subcategory not found", 404);

  const taxable_value = quantity * parseFloat(unit_price);
  const total_amount =
    taxable_value + (tax_percent ? (taxable_value * tax_percent) / 100 : 0);

  const lineItem = await GRNLineItem.create({
    grn_id,
    subcategory_id,
    item_description,
    quantity,
    unit_price,
    tax_percent,
    taxable_value,
    total_amount,
  });

  res.status(201).json({
    status: true,
    message: "GRN Line Item created successfully",
    data: lineItem,
  });
});

// Get All
const getAllGRNLineItems = AsyncHandler(async (req, res) => {
  const items = await GRNLineItem.findAll({
    include: [
      { model: GRNHeader, attributes: ["id", "grn_number"] },
      { model: AssetSubCategory, attributes: ["id", "name"] },
    ],
  });

  res.status(200).json({
    status: true,
    data: items,
  });
});

// Get One
const getGRNLineItemById = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const item = await GRNLineItem.findByPk(id, {
    include: [
      { model: GRNHeader, attributes: ["id", "grn_number"] },
      { model: AssetSubCategory, attributes: ["id", "name"] },
    ],
  });

  if (!item) throw new CustomError("GRN Line Item not found", 404);

  res.status(200).json({
    status: true,
    data: item,
  });
});

// Update
const updateGRNLineItem = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    grn_id,
    subcategory_id,
    item_description,
    quantity,
    unit_price,
    tax_percent,
  } = req.body;

  const item = await GRNLineItem.findByPk(id);
  if (!item) throw new CustomError("GRN Line Item not found", 404);

  if (grn_id) {
    const grn = await GRNHeader.findByPk(grn_id);
    if (!grn) throw new CustomError("GRN not found", 404);
    item.grn_id = grn_id;
  }

  if (subcategory_id) {
    const subcategory = await AssetSubCategory.findByPk(subcategory_id);
    if (!subcategory) throw new CustomError("Asset subcategory not found", 404);
    item.subcategory_id = subcategory_id;
  }

  item.item_description = item_description ?? item.item_description;
  item.quantity = quantity ?? item.quantity;
  item.unit_price = unit_price ?? item.unit_price;
  item.tax_percent = tax_percent ?? item.tax_percent;

  item.taxable_value = item.quantity * parseFloat(item.unit_price);
  item.total_amount =
    item.taxable_value +
    (item.tax_percent ? (item.taxable_value * item.tax_percent) / 100 : 0);

  await item.save();

  res.status(200).json({
    status: true,
    message: "GRN Line Item updated successfully",
    data: item,
  });
});

// Delete
const deleteGRNLineItem = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const item = await GRNLineItem.findByPk(id);
  if (!item) throw new CustomError("GRN Line Item not found", 404);

  await item.destroy();

  res.status(200).json({
    status: true,
    message: "GRN Line Item deleted successfully",
  });
});

module.exports = {
  addGRNLineItem,
  getAllGRNLineItems,
  getGRNLineItemById,
  updateGRNLineItem,
  deleteGRNLineItem,
};
