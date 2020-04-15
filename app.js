require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require('passport');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB);

const app = express();
const corsOptions = {
	origin: ["http://localhost:8080"],
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);
console.log("Passport initialized")


const authenticationRouter = require("./routes/authentication")(passport);
const userRouter = require("./routes/user");
const missionRouter = require("./routes/mission")();
const rolesRouter = require('./routes/roles');
app.use("/", authenticationRouter);
app.use("/users", userRouter);
app.use('/mission', missionRouter);
app.use('/roles', rolesRouter);

module.exports = app;
