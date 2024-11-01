const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the user model
const nodemailer = require('nodemailer'); // Import nodemailer
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const bcrypt = require('bcrypt'); // Import bcrypt

const otpMap = new Map();

const JWT_SECRET = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

router.post('/register', async (req, res) => {
    const { name, phone, email, password } = req.body;
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
        return res.send({ status: "error", data: "User already exists" });
    }
    const encyptedPassword = await bcrypt.hash(password, 10);
    try {
        await User.create({
            name: name,
            phone: phone,
            email: email,
            password: encyptedPassword,
        });
        res.send({ status: "Ok", data: "User created" });
        console.log("User created");
    } catch (err) {
        res.send({ status: "error", data: err });
        console.log(err);
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email: req.body.email });
    if (!oldUser) {
        return res.send({ status: "error", data: "User Does Not Exist" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpMap.set(email, otp);

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Login OTP',
        text: `Your OTP for login is ${otp}. It is valid for 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.send({ status: "error", data: error.toString() });
        } else {
            return res.send({ status: "Ok", data: "OTP sent to email" });
        }
    });

    if (await bcrypt.compare(password, oldUser.password)) {
        const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);
        if (res.status(201)) {
            return res.send({ status: "Ok", data: "Success" });
        } else {
            return res.send({ status: "error", data: "Invalid password" });
        }
    } else {
        return res.send({ status: "error", data: "Invalid password" });
    }

    setTimeout(() => {
        otpMap.delete(email);
    }, 10 * 60 * 1000); // OTP expires in 10 minutes
})

router.post('/otpverify', async (req, res) => {
    const { email, otp } = req.body;
    const storedOtp = otpMap.get(email);

    if (!storedOtp) {
        return res.send({ status: "error", data: "OTP expired or invalid" });
    }

    if (storedOtp === otp) {
        return res.send({ status: "Ok", data: "OTP verified" });
    } else {
        return res.send({ status: "error", data: "Invalid OTP" });
    }
})

router.post("/userdata", async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SECRET);
      const useremail = user.email;
  
      User.findOne({ email: useremail }).then((data) => {
        return res.send({ status: "Ok", data: data });
      });
    } catch (error) {
      return res.send({ error: error });
    }
  });

router.post("/forget", async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.send({ status: "error", data: "User does not exist" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpMap.set(email, otp);

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.send({ status: "error", data: error.toString() });
        } else {
            return res.send({ status: "Ok", data: "OTP sent to email" });
        }
    });

    setTimeout(() => {
        otpMap.delete(email);
    }, 10 * 60 * 1000); // OTP expires in 10 minutes
});

router.post("/otpResend", async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpMap.set(email, otp);

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.send({ status: "error", data: error.toString() });
        } else {
            return res.send({ status: "Ok", data: "OTP sent to email" });
        }
    });

    setTimeout(() => {
        otpMap.delete(email);
    }, 10 * 60 * 1000); // OTP expires in 10 minutes
})

router.post("/reset", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.send({ status: "error", data: "User does not exist" });
    }
    const encyptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ email }, { password: encyptedPassword });
    return res.send({ status: "Ok", data: "Password reset successful" });
})

module.exports = router