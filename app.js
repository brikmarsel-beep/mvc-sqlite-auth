require("dotenv").config();

console.log("YT KEY LEN =", (process.env.YOUTUBE_API_KEY || "").length);
console.log("NODE_ENV =", process.env.NODE_ENV);

const express = require("express");
const path = require("path");
const http = require("http");

const sessionMiddleware = require("./config/session");
const authRoutes = require("./routes/authRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const requireAuth = require("./middleware/requireAuth");

const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// body parsing
app.use(express.urlencoded({ extended: true }));

// sessions (must be before routes)
app.use(sessionMiddleware);

// make user available in views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// routes
app.use(authRoutes);
app.use(favoritesRoutes);

// protected home
app.get("/", requireAuth, (req, res) => {
  res.render("home", { user: req.session.user });
});

// fallback
app.use((req, res) => {
  res.status(404).send("Not Found");
});

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`http://localhost:${PORT}`);
});

// keep process alive (WSL/nodemon weird exit protection)
setInterval(() => {}, 60 * 1000);

