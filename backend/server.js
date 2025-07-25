const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./utils/ErrorHandler");

const globalRoute = require("./routes/global.route");

app.use(
  cors({
    origin: "http://localhost:5173",
    // credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use("/api/v1", globalRoute);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at PORT: ${process.env.PORT}...`);
});
