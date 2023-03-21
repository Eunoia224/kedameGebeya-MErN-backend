const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 6969;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

// run the connection function
connectDB();

const app = express();
// parse JSON
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/products/", require("./routes/productRoutes.js"));
app.use("/users", require("./routes/userRoutes.js"));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
