const { DataTypes } = require("sequelize");
const GRNHeader = require("./grns.model");
const AssetSubCategory = require("./asset-sub.model");
const { sequelize } = require("../utils/sqldb-connection");

const GRNLineItem = sequelize.define(
  "grn_line_item",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    grn_id: {
      type: DataTypes.INTEGER,
      references: { model: GRNHeader, key: "id" },
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      references: { model: AssetSubCategory, key: "id" },
    },
    item_description: { type: DataTypes.STRING(100), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    tax_percent: { type: DataTypes.DECIMAL(5, 2) },
    taxable_value: { type: DataTypes.DECIMAL(10, 2) },
    total_amount: { type: DataTypes.DECIMAL(10, 2) },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

GRNHeader.hasMany(GRNLineItem, { foreignKey: "grn_id" });
AssetSubCategory.hasMany(GRNLineItem, { foreignKey: "subcategory_id" });
GRNLineItem.belongsTo(GRNHeader, { foreignKey: "grn_id" });
GRNLineItem.belongsTo(AssetSubCategory, { foreignKey: "subcategory_id" });

module.exports = GRNLineItem;
