const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");
const SortMiddleware = require("./app/middlewares/sortMiddleware");

// Connect ro DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

// Custom middleware
app.use(SortMiddleware);

// HTTP logger
app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: require("./helpers/handlebars"),
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

app.listen(port, () => console.log(`App listen at http://localhost:${port}`));
app.set("views", path.join(__dirname, "resources", "views"));
