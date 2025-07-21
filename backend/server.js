const express = require("express");
const app = express();

const globalRoute = require("");

app.use(express.json());
app.use("/api/v1/", globalRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at PORT: ${process.env.PORT}...`);
});
