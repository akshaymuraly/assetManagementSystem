const { DataTypes } = require("sequelize");
const Vendor = require("./vendors.model");
const Branch = require("./brancehs.model");
const { sequelize } = require("../utils/sqldb-connection");

const GRNHeader = sequelize.define(
  "grn_header",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    grn_number: { type: DataTypes.STRING, unique: true },
    grn_date: { type: DataTypes.DATEONLY },
    invoice_number: { type: DataTypes.STRING(30), allowNull: false },
    vendor_id: {
      type: DataTypes.INTEGER,
      references: { model: Vendor, key: "id" },
    },
    branch_id: {
      type: DataTypes.INTEGER,
      references: { model: Branch, key: "id" },
    },
    is_draft: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Vendor.hasMany(GRNHeader, { foreignKey: "vendor_id" });
Branch.hasMany(GRNHeader, { foreignKey: "branch_id" });
GRNHeader.belongsTo(Vendor, { foreignKey: "vendor_id" });
GRNHeader.belongsTo(Branch, { foreignKey: "branch_id" });

module.exports = GRNHeader;
