const express = require("express");
const morgan = require("morgan");
const mainRouter = require("./router/main-router");
const userRouter = require("./router/user-router");
const aboutRouter = require("./router/about-router");
const unknownRouter = require("./router/error-router");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));

app.use("/", mainRouter);
app.use("/users", userRouter);
app.use("/about", aboutRouter);
app.use(unknownRouter)

app.listen(3000, () => {
  console.log("serves is listening on port 3000");
});
