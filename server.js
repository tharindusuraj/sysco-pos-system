const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

//Middleware
app.use(bodyParser.json());

//DB config
const DB = require("./config/keys").mongoURI;

//connect to DB

mongoose
  .connect(DB)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

//Use routes
app.use("/api/items", items);

//serve static asset if in production
if (process.env.NODE_ENV === "production") {
  //set the static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
