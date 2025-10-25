import express from "express";
import "dotenv/config";
import mainRouter from "./routes/index.js";

const app = express();

app.use(express.json());

let users = [];
app.get("/", (req, res) => {
  // console.log(req);
  res.send(`Hello ${process.env.NAME}! Welcome to the express server`);
  console.log(res)
  // console.log(`Hello,${process.env.NAME}`);
});

app.post("/register", (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // console.log(users,"users");
    const existedUser = users.find((user) => user.email === email);
    if (existedUser) {
      res.send("User already exist");
    }
    users.push({ email, password });
    res.send("Registered successfully");
  } catch (error) {
    console.log(error);
  }
});
console.log(users);
app.get("/name", (req, res) => {
  res.send("Pooja");
});

app.use('/api/v1',mainRouter);
app.listen(8000, () => {
  console.log(`app is listening on port ${8000}`);
});
