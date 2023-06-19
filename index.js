require("dotenv").config();
const express = require('express')
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index");
const app = express()
const {PORT} = process.env
const bodyParser = require("body-parser");

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.status(200).json({
    error: false,
    status:200,
    message:"Welcome to ecotrack API",
  })
})


app.use("/user", routes.users)
app.use("/role", routes.roleUser)
app.use("/kondisi",routes.kondisi)
app.use("/laporan",routes.laporan)

app.listen(PORT || 5001, () => {
  console.log(`app listening on PORT ${PORT}`)
})