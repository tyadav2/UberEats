const express = require("express");
const sequelize = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});



const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log("Database connected successfully");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => console.error("Database connection error:", err));
