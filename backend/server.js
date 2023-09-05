const express = require("express");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Recipe Book App!");
});

app.use("/api", recipeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
