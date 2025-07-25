const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    port: 3306,
    dialect: "mysql",
    host: "localhost",
  }
);
sequelize
  .sync({ alter: true })
  .then(() => console.log("All models synchronized"))
  .catch((err) => console.error("Error syncing models:", err));

module.exports = {
  sequelize,
};

// module.exports = async function () {
//   try {
//     await sequelize.authenticate();
//     console.log("connection established!");
//   } catch (err) {
//     console.log(err);
//   }
// };
