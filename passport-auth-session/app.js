const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");

require("./src/config/database");

//session and flash message
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000,
    },
  })
);

const authRouter = require("./src/routers/auth-router");

//to read values from the form
app.use(express.urlencoded({ extended: true }));

const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

app.use(expressLayouts);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./src/views"));

let counter = 0;

app.get("/", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
  } else {
    req.session.counter = 1;
  }

  res.json({
    message: "hello",
    counter: req.session.counter,
  });
});

app.use("/", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`The server started on port ${process.env.PORT}`);
});
