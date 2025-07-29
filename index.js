require("dotenv").config();

const express = require("express");
const todoRoute = require("./src/routes/todo.route");
const { default: mongoose } = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


const mongoOptions = {
  maxPoolSize: 20,
};
let isConnected = false;


const connectToMongoDB = async () => {
  if (!isConnected) {
    try {
      const mongoUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.b9qeg0t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

      await mongoose.connect(mongoUri, mongoOptions);
      isConnected = true;
      console.log("✅ Connected to MongoDB with connection pooling");
    } catch (error) {
      console.log("❌ Error connecting to MongoDB", error.message);
      throw error;
    }
  }
};

app.use(async (_, res, next) => {
  try {
    await connectToMongoDB();
    next();
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// 🧾 Route handler
app.use("/api/todo", todoRoute);

// 👋 Welcome route
app.get("/", (_, res) => {
  res.send("Welcome to TODO backend");
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
