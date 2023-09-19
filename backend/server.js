const express = require("express");
const recipeRoutes = require("./routes/recipeRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const verifyToken = require("./middlewares/verify-token.auth");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://cluster-1.sajpeze.mongodb.net/recipebook", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: "recipebook",
  pass: "pLTKZCj8sIxLr3mp",
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Recipe Book App!");
});

app.use("/api", verifyToken, recipeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
