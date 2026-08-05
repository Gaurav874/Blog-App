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
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`server started at:http://localhost:${PORT}`);
});

dbConnect();