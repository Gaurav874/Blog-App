// const express = require("express");
// const app = express();
// const dbConnect = require("./config/database");
// const cookieParser = require("cookie-parser");
// const userRoute = require("./routes/user.route");
// const blogRoute = require("./routes/blog.route");
// const cors = require("cors");

// require("dotenv").config();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(cookieParser());
// app.set("trust proxy", 1);
// app.use(
//   cors({
//     origin: [
//       "https://blog-app-ecru-xi.vercel.app", // 👈 Tera Vercel Frontend URL
//       "http://localhost:5173"                // 👈 Local testing ke liye
//     ],
//     credentials: true,
//   })
// );

// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/blog", blogRoute);

// app.listen(PORT, () => {
//   console.log(`server started at:http://localhost:${PORT}`);
// });

// dbConnect();



const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.route");
const blogRoute = require("./routes/blog.route");
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "https://blog-app-ecru-xi.vercel.app", // Tera Vercel Frontend URL
      "http://localhost:5173"                // Local Vite development URL
    ],
    credentials: true,
  })
);

// Health check route (Vercel deployment test ke liye)
app.get("/", (req, res) => {
  res.send("Backend Server is Running Successfully!");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

dbConnect();

// Local run ke liye
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
  });
}

// Vercel serverless function export
module.exports = app;