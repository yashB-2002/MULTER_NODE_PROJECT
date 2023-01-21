const express = require("express");
const app = express();
const PORT = 5000;
const { connectDB } = require("./config/db");
const user_route = require("./routes/userRoute");
const prod_route = require("./routes/prodRoute");
// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api/v1/user", user_route);
app.use("/api/v1/product", prod_route);
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
  connectDB();
});
