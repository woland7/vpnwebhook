const express = require("express")
    , morgan = require("morgan")
    , bodyParser = require("body-parser")
    , cookieParser = require("cookie-parser")
    , helpers = require("./helpers")
    , webhook = require("./api/webhook")
    , app = express();

app.use(helpers.rewriteSlash);
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helpers.sessionMiddleware);
app.use(morgan("dev", {}));

/* Mount API endpoints */
app.use(webhook);

app.use(helpers.errorHandler);

var timeout = require('connect-timeout');
app.use(timeout('100s'));

const server = app.listen(process.env.PORT || 8881, function () {
  const port = server.address().port;
  console.log("App now running in %s mode on port %d", app.get("env"), port);
});