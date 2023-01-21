const { Sequelize } = require("sequelize");
const createDB = new Sequelize("test-db", "user", "pswd", {
  dialect: "sqlite",
  host: "./config/db.sqlite",
});
const connectDB = () => {
  createDB
    .sync()
    .then(() => {
      console.log("db is running....");
    })
    .catch((e) => {
      console.log("connection with database failed..");
    });
};
module.exports = { createDB, connectDB };
