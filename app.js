require("./db/mongo");
const catwaysRouter = require("./routes/catways");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");

const cookieSession = require("cookie-session");
const catwaysViewRouter = require("./routes/catwayView");
const reservationsViewRouter = require("./routes/reservationView");
const usersViewRouter = require("./routes/userView");

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const dashboardRouter = require("./routes/dashboard");

var app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY],
    maxAge: 24 * 60 * 60 * 1000, // 24 heures
  }),
);

app.use("/dashboard", dashboardRouter);
app.use("/catways-view", catwaysViewRouter);
app.use("/users-view", usersViewRouter);

app.use("/reservations-view", reservationsViewRouter);

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/catways", catwaysRouter);
app.use("/users", usersRouter);

app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

module.exports = app;
