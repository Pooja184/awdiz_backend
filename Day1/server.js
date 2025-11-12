import express from "express";
import "dotenv/config";
import mainRouter from "./routes/index.js";
import connectDB from "./config/mongodb.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { tokenDecoder } from "./middlewares/tokenMiddleware.js";
const app = express();

app.use(express.json());
// app.use(cors())
const corsOptions = {
  origin: "http://localhost:5173", // Allow only a specific origin
  credentials: true, // Enable cookies and credentials
};
app.use(cors(corsOptions));
app.use(cookieParser());

connectDB();
let users = [];
app.get("/", (req, res) => {
  // console.log(req);
  res.send(`Hello ${process.env.NAME}! Welcome to the express server`);
  console.log(res)
  // console.log(`Hello,${process.env.NAME}`);
});

// app.post("/register", (req, res) => {
//   try {
//     // console.log(req.body);
//     const { email, password } = req.body;
//     // console.log(users,"users");
//     const existedUser = users.find((user) => user.email === email);
//     if (existedUser) {
//       res.send("User already exist");
//     }
//     users.push({ email, password });
//     res.send("Registered successfully");
//   } catch (error) {
//     console.log(error);
//   }
// });
// console.log(users);
app.get("/name", (req, res) => {
  res.send("Pooja");
});

app.use('/api/v1',tokenDecoder,mainRouter);
app.listen(8000, () => {
  console.log(`app is listening on port ${8000}`);
});
