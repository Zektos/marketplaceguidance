const express = require("express");
const app = express();

// Controllers
// Users
const userController = require("./src/controllers/user-controller");


const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static("./src/views"));
// JSON
app.use(express.json());

// Routes
app.use("/users", userController);

// Start server
app.listen(PORT, console.log(`Server is live on http://localhost:${PORT}`));