const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/sqldb-connection");

const Branch = sequelize.define(
  "branch",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: "active" },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Branch;
