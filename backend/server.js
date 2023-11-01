const express = require("express");
const app = express();
const cors = require("cors");
const todoRoutes = require("./Routes/todoRoutes.js");

require("dotenv").config();

// Middleware Connections
app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
