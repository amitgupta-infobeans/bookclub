const express = require("express");
const dotenv = require("dotenv"); // loads dotenv
const cors = require("cors"); //load cors
const { userRouter } = require("./routers/userRouter");
const { connectDB } = require("./config/dbconnect");
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); // express json middleware

app.use(cors()); // cors middleware

app.use("/api/user", userRouter);
// app.use("/api", bookRouter);
// app.use("/api", ratingAndReviewRouter);

app.listen(process.env.BACKEND_PORT || 4000, async () => {
  await connectDB();
  console.log("App is running on ", process.env.BACKEND_PORT || 4000);
});
