const Vendor = require("../models/vendors.model");
const AsyncHandler = require("../utils/AsyncHandler");
const { CustomError } = require("../utils/CustomError");

// Create
const addVendor = AsyncHandler(async (req, res, next) => {
  const { name, contact_person, email, phone, address, gst_number } = req.body;

  if (!name || name.trim() === "") {
    throw new CustomError("Vendor name is required", 400);
  }

  const vendor = await Vendor.create({
    name,
    contact_person,
    email,
    phone,
    address,
    gst_number,
  });

  return res.status(201).json({
    status: true,
    message: "Vendor created successfully",
    data: vendor,
  });
});

// Read All
const getAllVendors = AsyncHandler(async (req, res) => {
  const vendors = await Vendor.findAll();
  return res.status(200).json({
    status: true,
    data: vendors,
  });
});

// Read One
const getVendorById = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const vendor = await Vendor.findByPk(id);

  if (!vendor) {
    throw new CustomError("Vendor not found", 404);
  }

  return res.status(200).json({
    status: true,
    data: vendor,
  });
});

// Update
const updateVendor = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, contact_person, email, phone, address, gst_number } = req.body;

  const vendor = await Vendor.findByPk(id);

  if (!vendor) {
    throw new CustomError("Vendor not found", 404);
  }

  vendor.name = name ?? vendor.name;
  vendor.contact_person = contact_person ?? vendor.contact_person;
  vendor.email = email ?? vendor.email;
  vendor.phone = phone ?? vendor.phone;
  vendor.address = address ?? vendor.address;
  vendor.gst_number = gst_number ?? vendor.gst_number;

  await vendor.save();

  return res.status(200).json({
    status: true,
    message: "Vendor updated successfully",
    data: vendor,
  });
});

// Delete
const deleteVendor = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const vendor = await Vendor.findByPk(id);

  if (!vendor) {
    throw new CustomError("Vendor not found", 404);
  }

  await vendor.destroy();

  return res.status(200).json({
    status: true,
    message: "Vendor deleted successfully",
  });
});

module.exports = {
  addVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
};
