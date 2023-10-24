require("dotenv").config({ debug: true });

const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const path = require("path");
const methodOverride = require("method-override");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { ROLE } = require("./config/roles");
const { authRole } = require("./middleware/authMiddleware");
//const { logger } = require("./middleware/logEvents");
const credentials = require("./middleware/credentials");
const errorHandler = require("./middleware/errorHandler");
const {
  requireAuth,
  setUser,
  checkUser,
} = require("./middleware/authMiddleware");
const indexRouter = require("./routes/index");
const projectRouter = require("./routes/projects");
const adminRouter = require("./routes/admin");
const uploadRouter = require("./routes/uploads");
const connectRouter = require("./routes/connect");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(compression());
//app.use(logger);

app.use(credentials);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname + "/views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));

// app.use(express.static("/public"));
app.use("/public/", express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());

app.get("*", checkUser);
app.use("/", indexRouter);
app.use("/admin", requireAuth, adminRouter);
app.use("/projects", projectRouter);
app.use("/connect", connectRouter);
app.use("/uploads", requireAuth, uploadRouter);

app.use(authRoutes, errorHandler);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 3800;
app.listen(PORT, () => {
  console.log(`connected on http://localhost:${PORT}`);
});

module.exports = app;