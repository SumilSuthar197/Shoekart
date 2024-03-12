require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDatabase = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error");

app.use(cors());
app.use(express.static("./public"));
app.use(express.json());

// import routes
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");

app.get("/", (req, res) => {
  res.json("Hello World");
});

//using routes
app.use("/api/v1/", userRoute);
app.use("/api/v1/product", productRoute);

app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  res.json("404 Not Found");
});

// Middleware for Errors
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const StartServer = async () => {
  try {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    await connectDatabase(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

StartServer();
