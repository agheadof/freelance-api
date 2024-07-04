const path = require("path");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");

/** Routes */

const usersRoutes = require("./routes/users/users.route");
const itemsRoutes = require("./routes/items/items.route");
const categoriesRoutes = require("./routes/categories/categories.route");
const purchasesRoutes = require("./routes/purchase/purchase.route")

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

/** App Routes */

app.use("/users", usersRoutes);
app.use("/items", itemsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/purchases", purchasesRoutes)

/** Error Handling */

app.use((error, _req, res, _) => {
  const status = error.statusCode || 500;
  let message = error.message;

  if (message.toString().includes("phoneNumber_1 dup key")) {
    message = "Phone Number Already Exists";
  }

  res.status(status).json({
    message,
  });
});

module.exports = app;
