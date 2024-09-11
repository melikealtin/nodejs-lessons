const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

app.use(expressLayouts);
app.use(express.static("public"));
app.use("/admin", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./src/views"));

require("./src/config/database");

const MongoDBStore = require("connect-mongodb-session")(session);

const sessionStore = new MongoDBStore({
  uri: process.env.MONGODB_CONNECTION_STRING,
  collection: "mySessions",
});

//session and flash message
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: sessionStore,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.validation_error = req.flash("validation_error");
  res.locals.success_message = req.flash("success_message");
  res.locals.email = req.flash("email");
  res.locals.firstName = req.flash("firstName");
  res.locals.lastName = req.flash("lastName");
  res.locals.password = req.flash("password");
  res.locals.repeatPassword = req.flash("repeatPassword");

  res.locals.login_error = req.flash("error");

  next();
});

app.use(passport.initialize());
app.use(passport.session());

const authRouter = require("./src/routers/auth-router");
const adminPanelRouter = require("./src/routers/admin-router");

//to read values from the form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
app.use("/admin", adminPanelRouter);

app.listen(process.env.PORT, () => {
  console.log(`The server started on port ${process.env.PORT}`);
});
