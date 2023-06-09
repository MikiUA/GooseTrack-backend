const express = require("express");
const app = express();

const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./docs/swagger.json");

const { router } = require("./routes/index");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { filter: true })
);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { filter: true })
);

app.use(router);
// app.use("/api/tasks", router);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = { app };
