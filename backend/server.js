const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const session = require("express-session"); // ✅ ADD
const path = require("path");               // ✅ ADD
const connectDB = require("./config/db");

connectDB();

const app = express();

/* ===== SESSION SETUP ===== */
app.use(
  session({
    secret: "finchatgpt_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true only if HTTPS
    },
  })
);

/* ===== AUTH MIDDLEWARE ===== */
function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  next();
}

/* ===== CORS ===== */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

/* ===== ROUTES ===== */
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

/* ===== BASIC TEST ROUTE ===== */
app.get("/", (req, res) => {
  res.send("FinChatGPT Backend Running 🚀");
});

/* ===== PROTECTED CHAT ROUTE ===== */
app.get("/chat", (req, res) => {
  res.sendFile(
    path.join(__dirname,"../finchatgpt/finchatgpt/templates/chat.html")
  );
});


/* ===== LOGIN PAGE ===== */
app.get("/login", (req, res) => {
  res.sendFile(
    path.join(__dirname,"../finchatgpt/finchatgpt/templates/login.html")
    );
});

const axios = require("axios");

app.post("/api/chat", async (req, res) => {
  const { query } = req.body;

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3.2:1b",
      prompt: query,
      stream: false
    });

    res.json({
      answer: response.data.response
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      answer: "Error connecting to LLaMA model"
    });
  }
});



/* ===== START SERVER ===== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
