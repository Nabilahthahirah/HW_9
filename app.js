require("dotenv").config();
const express = require("express");
const router = require("./routes");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = 3000;
const errorHandler = require("./middlewares/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./Swegger.json");

app.use(morgan("tiny"));

// Membuka swegger http://localhost:3000/api-docs/
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

//Sharing resourse
app.use(cors());

// Middleware untuk menerima json
app.use(express.json());

// Middleware untuk menerima urlEncoded
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use(errorHandler);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});