const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/sqldb-connection");

const Manufacturer = sequelize.define(
  "manufacturer",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Manufacturer;
