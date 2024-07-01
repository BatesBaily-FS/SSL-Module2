const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const routeHandler = require("./routes");

app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: "http:localhost:3000",
    methods: ["GET", "POST"],
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running", success: true });
});

app.use("/api/v1", routeHandler);

module.exports = app;
