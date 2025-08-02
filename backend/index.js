const express = require("express");
const dotenv = require("dotenv"); // loads dotenv
const cors = require("cors"); //load cors
const { bookRouter } = require("./routers/bookRouter");
const { userRouter } = require("./routers/userRouter");
const { readingListRouter } = require("./routers/readingListRouter");
const { ratingAndReviewRouter } = require("./routers/ratingAndReviewRouter");
const { connectDB } = require("./config/dbconnect");

const path = require("path");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // express json middleware
app.use(cors()); // cors middleware
app.use("/static", express.static(path.join(__dirname, "/uploads")));

app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/ratingandreview", ratingAndReviewRouter);
app.use("/api/addremovefavourite", readingListRouter);
// app.use("/api/search", searchBook)
// app.use("/api/filterbooks", allBooksWithFilter)

// to handle undefined routes
app.use("/", (req, res) => {
  return res.status(404).json({
    status: 404,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.listen(process.env.BACKEND_PORT || 4000, async () => {
  await connectDB();
  console.log("App is running on ", process.env.BACKEND_PORT || 4000);
});
