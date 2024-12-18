const cors = require("cors");
const express = require("express");
const app = express();

const port = 5000;
const prefix = "/api/v1";

// Allow multiple origins
const allowedOrigins = [
  "https://payverse-azjv.onrender.com", // Production origin
  "http://localhost:5173", // Development origin
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow requests with no origin (like mobile apps or Postman) or listed origins
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Enable credentials if needed
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // Dynamically allow the requesting origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allowed methods
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization" // Allowed headers
  );
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
  if (req.method === "OPTIONS") {
    // Preflight request
    return res.status(200).end();
  }
  next();
});


app.use(express.json());

// const router = require("./routes/router");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const adminRouter = require("./routes/adminRouter");
const authRouter = require("./Controllers/authController");
const payrollRouter = require("./routes/payrollRouter");
const tokenRouter = require("./routes/tokenrouter");
const employeeRouter = require("./routes/employeeRouter");
const lendingRouter = require("./routes/lendingRouter");
const borrowingRouter = require("./routes/borrowingRouter");
const stakeRouter = require("./routes/stakeRouter");

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use(
  "/admin",
  authRouter.isLoggedIn,
  authRouter.checkForEmployeer,
  adminRouter
);
app.use(
  "/payroll",
  authRouter.isLoggedIn,
  authRouter.checkForEmployeer,
  payrollRouter
);
app.use(
  "/token",
  authRouter.isLoggedIn,
  authRouter.checkForEmployeer,
  tokenRouter
);

app.use(
  "/employee",
  authRouter.isLoggedIn,
  authRouter.checkForEmployee,
  employeeRouter
);

app.use("/lending", authRouter.isLoggedIn, lendingRouter);
app.use("/borrowing", authRouter.isLoggedIn, borrowingRouter);
app.use("/stake", stakeRouter);
//  404 handler middleware
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
