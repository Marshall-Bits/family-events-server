require("dotenv").config();

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const indexRoutes = require("./routes/event.routes");
app.use("/api/events", indexRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);

require("./error-handling")(app);

module.exports = app;
