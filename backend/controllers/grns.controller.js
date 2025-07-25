const GRNHeader = require("../models/grns.model");
const Vendor = require("../models/vendors.model");
const Branch = require("../models/brancehs.model");
const AsyncHandler = require("../utils/AsyncHandler");
const { CustomError } = require("../utils/CustomError");
const AssetSubCategory = require("../models/asset-sub.model");
const GRNLineItem = require("../models/grn-line-item.model");
// Create
const addGRN = AsyncHandler(async (req, res, next) => {
  const {
    grnNumber,
    grnDate,
    invoiceNumber,
    vendor,
    branch,
    items = [],
  } = req.body;

  const isDraft = req.query.status === "draft";

  if (!invoiceNumber || !vendor?.id || !branch?.id || !items.length) {
    throw new CustomError(
      "Invoice number, vendor ID, branch ID and at least one line item are required",
      400
    );
  }

  const vendorExists = await Vendor.findByPk(vendor.id);
  if (!vendorExists) throw new CustomError("Vendor not found", 404);

  const branchExists = await Branch.findByPk(branch.id);
  if (!branchExists) throw new CustomError("Branch not found", 404);

  // Check if this GRN number already exists (draft or not)
  let grn = await GRNHeader.findOne({ where: { grn_number: grnNumber } });

  if (grn && grn.is_draft) {
    // Update draft header
    grn.invoice_number = invoiceNumber;
    grn.grn_date = grnDate;
    grn.vendor_id = vendor.id;
    grn.branch_id = branch.id;
    grn.is_draft = isDraft ? true : false;
    await grn.save();

    // Delete old line items
    await GRNLineItem.destroy({ where: { grn_id: grn.id } });
  } else if (!grn) {
    // Create new GRN
    grn = await GRNHeader.create({
      grn_number: grnNumber,
      grn_date: grnDate,
      invoice_number: invoiceNumber,
      vendor_id: vendor.id,
      branch_id: branch.id,
      is_draft: isDraft,
    });
  } else {
    // Already exists and is not draft
    throw new CustomError("GRN number already used", 409);
  }

  for (const item of items) {
    const { subCategory, description, qty, unitPrice, taxPercent } = item;

    if (!subCategory?.id || !description || !qty || !unitPrice) {
      throw new CustomError(
        "Each item must have subcategory ID, description, quantity, and unit price",
        400
      );
    }

    const subCatExists = await AssetSubCategory.findByPk(subCategory.id);
    if (!subCatExists) {
      throw new CustomError(
        `Subcategory not found for ID ${subCategory.id}`,
        404
      );
    }

    const taxableValue = qty * parseFloat(unitPrice);
    const taxAmount = taxPercent ? (taxableValue * taxPercent) / 100 : 0;
    const totalAmount = taxableValue + taxAmount;

    await GRNLineItem.create({
      grn_id: grn.id,
      subcategory_id: subCategory.id,
      item_description: description,
      quantity: qty,
      unit_price: unitPrice,
      tax_percent: taxPercent,
      taxable_value: taxableValue,
      total_amount: totalAmount,
    });
  }

  return res.status(201).json({
    status: true,
    message: isDraft
      ? "GRN draft saved successfully"
      : "GRN submitted successfully",
    data: grn,
  });
});

// Read All
const getAllGRNs = AsyncHandler(async (req, res) => {
  const grns = await GRNHeader.findAll({
    include: [
      { model: Vendor, attributes: ["id", "name"] },
      { model: Branch, attributes: ["id", "name", "code"] },
    ],
  });

  res.status(200).json({
    status: true,
    data: grns,
  });
});

// Read One
const getGRNById = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const grn = await GRNHeader.findByPk(id, {
    include: [
      { model: Vendor, attributes: ["id", "name"] },
      { model: Branch, attributes: ["id", "name", "code"] },
    ],
  });

  if (!grn) {
    throw new CustomError("GRN not found", 404);
  }

  res.status(200).json({
    status: true,
    data: grn,
  });
});

// Update
const updateGRN = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { grn_number, grn_date, invoice_number, vendor_id, branch_id } =
    req.body;

  const grn = await GRNHeader.findByPk(id);
  if (!grn) throw new CustomError("GRN not found", 404);

  if (vendor_id) {
    const vendor = await Vendor.findByPk(vendor_id);
    if (!vendor) throw new CustomError("Vendor not found", 404);
    grn.vendor_id = vendor_id;
  }

  if (branch_id) {
    const branch = await Branch.findByPk(branch_id);
    if (!branch) throw new CustomError("Branch not found", 404);
    grn.branch_id = branch_id;
  }

  grn.grn_number = grn_number ?? grn.grn_number;
  grn.grn_date = grn_date ?? grn.grn_date;
  grn.invoice_number = invoice_number ?? grn.invoice_number;

  await grn.save();

  res.status(200).json({
    status: true,
    message: "GRN updated successfully",
    data: grn,
  });
});

// Delete
const deleteGRN = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const grn = await GRNHeader.findByPk(id);
  if (!grn) {
    throw new CustomError("GRN not found", 404);
  }

  await grn.destroy();

  res.status(200).json({
    status: true,
    message: "GRN deleted successfully",
  });
});

module.exports = {
  addGRN,
  getAllGRNs,
  getGRNById,
  updateGRN,
  deleteGRN,
};
