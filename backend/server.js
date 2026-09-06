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
      "https://blog-app-ecru-xi.vercel.app", // Tera exact Vercel Frontend URL (bina trailing slash '/')
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

dbConnect();

// Local run ke liye (Vercel deployment par app.listen blocking ban jata hai)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
  });
}

// Vercel serverless function execution ke liye export
module.exports = app;