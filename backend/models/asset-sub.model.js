const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/sqldb-connection");
const AssetCategory = require("./asset-categories.model");

const AssetSubCategory = sequelize.define(
  "asset_subcategory",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category_id: {
      type: DataTypes.INTEGER,
      references: { model: AssetCategory, key: "id" },
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, defaultValue: "active" },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

AssetCategory.hasMany(AssetSubCategory, { foreignKey: "category_id" });
AssetSubCategory.belongsTo(AssetCategory, { foreignKey: "category_id" });

module.exports = AssetSubCategory;
