require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require('passport');
const mongoose = require('mongoose');
const seed = require('./seed/seed_dev');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

if(process.env.NODE_ENV == 'development'){
	seed.seedDevelopment();
}


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
const statusRouter = require('./routes/status');
app.use("/", authenticationRouter);
app.use("/users", userRouter);
app.use('/mission', missionRouter);
app.use('/roles', rolesRouter);
app.use('/status', statusRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
