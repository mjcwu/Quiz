const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

app.set("view engine", "ejs");
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

console.log("__dirname in ./index.js:", __dirname);
app.use(express.static(path.join(__dirname, "public")));

app.use((request, response, next) => {  
  // console.log("ðªðªðªðªðªðªðªðªðªðª");
  // console.log(request.cookies);
  // console.log("ðªðªðªðªðªðªðªðªðªðª");

  const username = request.cookies.username;
  response.locals.username = "";
  
  if (username) {
    response.locals.username = username;
    console.log(`🤑 Signed in as ${username}`);
  }
  next();
});
// routes
const cluckrRouter = require("./routes/cluckr");
app.use("/", cluckrRouter);

app.get("/hello_world", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

//cookie
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 5;
app.post("/sign_in", (request, response) => {
  const username = request.body.username;
  response.cookie("username", username, { maxAge: COOKIE_MAX_AGE })
  response.redirect("/cluckr/index");
});

app.post("/sign_out", (request, response /*, next */) => {
  response.clearCookie("username");
  response.redirect("/cluckr/index");
});

//server
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server is running 🤖 on http://localhost:${PORT}`);
});
