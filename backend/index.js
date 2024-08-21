const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const post = require("./routes/post");
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/auth", auth);
app.use("/api/post", post);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to DB!");
  } catch (error) {
    console.log(error);
  }
};

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server listening on PORT: ${process.env.PORT}`);
});
