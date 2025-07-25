const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/sqldb-connection");

const AssetCategory = sequelize.define(
  "asset_category",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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

module.exports = AssetCategory;
