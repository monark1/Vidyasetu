const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoUrl =
  "mongodb+srv://white728:admin@cluster0.6gf9j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const JWT_SECRET = "dasdhajgdkuefa17323183hnjkanflnuea";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

require("./UserDetails");

const User = mongoose.model("UserInfo");

app.get("/", (req, res) => {
  res.send({ status: "Server is running" });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email: req.body.email });
  if (oldUser) {
    return res.send({ status: "error", data: "User already exists" });
  }
  const encyptedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      name: name,
      email: email,
      password: encyptedPassword,
    });
    res.send({ status: "Ok", data: "User created" });
  } catch (err) {
    res.send({ status: "error", data: err });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email: req.body.email });
  if (!oldUser) {
    return res.send({ status: "error", data: "User does not exist" });
  }

  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);
    if (res.status(201)) {
      return res.send({ status: "Ok", data: token });
    } else {
      return res.send({ status: "Error", data: "Invalid password" });
    }
  } else {
    return res.send({ status: "Error", data: "Invalid password" });
  }
});

app.get("/userdata", async (req, res) => {
    const {token} = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const useremail = user.email;

        User.findOne({email: useremail}, (err, user) => {
            if (err) {
                res.send({status: "error", data: "Invalid token"});
            }
            res.send({status: "Ok", data: user});
        });
    } catch (err) {
        res.send({status: "error", data: "Invalid token"});
    }
});

app.listen(5001, () => {
  console.log("Server is running on port 3000");
});
