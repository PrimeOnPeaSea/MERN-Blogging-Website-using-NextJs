const express = require("express");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
require("./config/db");
const cors = require("cors");

const app = express();

app.use(cors());

app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use("/api", (req, res, next) => {
  res.send("Blog API");
});

app.listen(5001, () => console.log("app started at 5001..."));
