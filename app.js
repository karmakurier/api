require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const jwtExpress = require("express-jwt");

const publicRouter = require("./routes/public");
const customerRouter = require("./routes/customer");

const app = express();

const corsOptions = {
	origin: ["http://localhost:8080"],
	optionsSuccessStatus: 200
};

app.use(
	jwtExpress({ secret: process.env.JWT_SECRET }).unless({
		path: ["/login", "/signup", "/customer/favicon.ico", /\/voicemails*/]
	})
);

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", publicRouter);
app.use("/customer", customerRouter);

module.exports = app;
