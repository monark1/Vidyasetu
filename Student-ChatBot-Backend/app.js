const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const nodemailer = require('nodemailer');
const axios = require("axios");
require("dotenv").config();

const apikeyOnDemand = process.env.ONDEMAND_API_KEY;

const post = process.env.PORT || 5001;

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const mongoUrl = process.env.MONGOURL;
const JWT_SECRET = "dasdhajgdkuefa17323183hnjkanflnuea";

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const geminiFunction = async (city) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(`${city}`);
  const responseText = await result.response.text();

  res.send({
    status: "Ok",
    data: responseText,
  });
};

app.post("/chat", async (req, res) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(req.body.message);
  res.send({ status: "Ok", data: result.response.text() });
});

// POST route to handle chat and find college by city
app.post("/chats", async (req, res) => {
  try {
    // Extract the user's message
    const userMessage = req.body.message.trim().toLowerCase(); // Normalize the message for easier comparison
    // const userMessage = req.body.message.trim(); // Normalize the message for easier comparison
    // Check if the message is "hi" or "hello"
    if (userMessage === "hi" || userMessage === "hello") {
      return res.send({
        status: "Ok",
        data: "May I help you?",
      });
    }
    // Extract the city from the user's message
    // const city = req.body.message.trim();
    const city = userMessage;
    // Query MongoDB to find colleges by city
    const collegesInCity = await College.find({ city });

    // Check if colleges are found for the provided city
    if (collegesInCity.length > 0) {
      const collegeDetails = collegesInCity
        .map((college) => {
          return `Name: ${college.name}\n
          Website: ${college.website}
          \nAddress: ${college.place
            }\nBranches: ${college.branches.join(", ")}`;
        })
        .join("\n\n");

      const collegeImages = collegesInCity
        .map((college) => {
          return `${college.img}`;
        })
        .join("\n\n");
      // Return the found college data
      res.send({
        status: "Ok",
        data: collegeDetails,
        dataImg: collegeImages,
      });
    } else {
      //If no colleges are found, use Gemini AI to reply intelligently
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(
        `No data found for ${city}. Could you provide more information on this city's polytechnic colleges?`
        // city
      );
      const responseText = await result.response.text();

      res.send({
        status: "Ok",
        data: responseText,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error.message,
    });
  }
});

// Replace with your actual API key and external user ID
const externalUserId = 'Chirag';

// Function to create a chat session
async function createChatSession() {
  try {
    const response = await axios.post('https://api.on-demand.io/chat/v1/sessions', {
      pluginIds: [],
      externalUserId: externalUserId
    }, {
      headers: {
        apikey: apikeyOnDemand
      }
    });

    // Extract session ID from the response
    const sessionId = response.data.data.id;
    console.log('Session ID:', sessionId);
    return sessionId;
  } catch (error) {
    console.error('Error creating chat session:', error);
  }
}

// Function to submit a query using the session ID
async function submitQuery(sessionId, city) {
  try {
    const response = await axios.post(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
      endpointId: 'predefined-openai-gpt4o',
      query: `Could you provide information on polytechnic colleges in ${city}?`,
      pluginIds: ['plugin-1712327325', 'plugin-1713962163', 'plugin-1729879193'],
      responseMode: 'sync'
    }, {
      headers: {
        apikey: apikeyOnDemand
      }
    });

    console.log('Query Response:', response.data);
  } catch (error) {
    console.error('Error submitting query:', error);
  }
}

// Main function to execute the API calls
let city = "Mumbai";
async function main() {
  const sessionId = await createChatSession();
  if (sessionId) {
    // await submitQuery(sessionId,city);
    // await fetchFromAgent(sessionId, "");
  }
}
main();


// Ondemand API call to fetch data from agent
// Function to fetch information from the on-demand API using the agent
const fetchFromAgent = async (sessionId, city) => {
  try {
    const response = await axios.post(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
      endpointId: 'predefined-openai-gpt4o',
      query: `Could you provide information on polytechnic colleges in ${city}?`,
      pluginIds: ['plugin-1712327325', 'plugin-1713962163', 'plugin-1729879193'],
      responseMode: 'sync',
      // message: `Could you provide information on polytechnic colleges in ${city}?`
    },
      {
        headers: {
          apikey: apikeyOnDemand
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in on-demand API call:", error);
    return {
      status: "Error",
      message: "Unable to fetch data from the agent."
    };
  }
};

app.post("/chatss", async (req, res) => {
  try {
    // Extract and normalize the user's message
    const userMessage = req.body.message.trim().toLowerCase();

    // Basic greeting response
    if (userMessage === "hi" || userMessage === "hello") {
      return res.send({
        status: "Ok",
        data: "May I help you?",
      });
    }

    // Extract the city name from the user message
    const city = userMessage;

    // Query MongoDB to find colleges by city
    const collegesInCity = await College.find({ city });

    // Check if colleges are found in MongoDB
    if (collegesInCity.length > 0) {
      const collegeDetails = collegesInCity
        .map((college) => {
          return `Name: ${college.name}\nAddress: ${college.place}\nBranches: ${college.branches.join(", ")}`;
        })
        .join("\n\n");

      const collegeImages = collegesInCity
        .map((college) => `${college.img}`)
        .join("\n\n");

      // Return the college data found in MongoDB
      return res.send({
        status: "Ok",
        data: collegeDetails,
        dataImg: collegeImages,
      });
    } else {
      // Call the on-demand agent API if no data found in MongoDB
      const sessionId = await createChatSession();
      // const agentResponse = await fetchFromAgent(sessionId,city);
      // const agentResponse = await submitQuery(sessionId, city);
      const result = await axios.post(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
        endpointId: 'predefined-openai-gpt4o',
        query: `Could you provide information on polytechnic colleges in ${city}?`,
        pluginIds: ['plugin-1712327325', 'plugin-1713962163', 'plugin-1729879193'],
        responseMode: 'sync'
      }, {
        headers: {
          apikey: apikeyOnDemand
        }
      });
      // Respond based on the agent API result
      // const responseText = result.data.data.messages[0].content
      const responseText = result.data.data.answer;
      res.send({
        status: "Ok",
        data: responseText,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error.message,
    });
  }
})

// College Data System
mongoose // connecting to the database for college data
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

require("./CollegeData");

const College = mongoose.model("College");

app.post("/college", async (req, res) => {
  try {
    const city = req.body.city; // Get city from request body
    const collegesInCity = req.body.colleges; // Get colleges array from request body

    // Save each college in the city to the database
    const savedColleges = [];
    for (let collegeData of collegesInCity) {
      const newCollege = new College(collegeData);
      const savedCollege = await newCollege.save();
      savedColleges.push(savedCollege);
    }
    res
      .status(201)
      .send({ message: `Colleges added in ${city}`, data: savedColleges });
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to retrieve colleges from MongoDB
app.get("/college/:city", async (req, res) => {
  try {
    const city = req.params.city;

    // Find colleges by city
    const colleges = await College.find({ city });

    if (colleges.length > 0) {
      res.status(200).send(colleges);
    } else {
      res.status(404).send({ message: `No colleges found in ${city}` });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// User data System

mongoose //connecting to the database for user details
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
      return res.send({ status: "Ok", data: token });
    } else {
      return res.send({ status: "Error", data: "Invalid password" });
    }
  } else {
    return res.send({ status: "Error", data: "Invalid password" });
  }

  setTimeout(() => {
    otpMap.delete(email);
  }, 10 * 60 * 1000); // OTP expires in 10 minutes
});

app.post("/userdata", async (req, res) => {
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

const otpMap = new Map();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post("/forget", async (req, res) => {
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

app.post("/otpResend", async (req, res) => {
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

app.post("/otpverify", async (req, res) => {
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

app.post("/reset", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ status: "error", data: "User does not exist" });
  }
  const encyptedPassword = await bcrypt.hash(password, 10);
  await User.updateOne({ email }, { password: encyptedPassword });
  return res.send({ status: "Ok", data: "Password reset successful" });
})

const CollegeForm = mongoose.model("CollegeInfo");

app.post("/collegeform", async (req, res) => {
  const { collegeName, collegeCode, collegeLocation, numberOfDepartments, collegeEmail, collegePhone, collegeWebsite, collegePerson, collegeFacilities, coursesName, courseDuration, branchName, fee, placements, facilities, eligibility, scholarship } = req.body;
  const oldCollege = await CollegeForm.findOne({ collegeName: req.body.collegeName });
  if (oldCollege) {
    return res.send({ status: "error", data: "College already exists" });
  }
  try {
    await CollegeForm.create({
      collegeName: collegeName,
      collegeCode: collegeCode,
      collegeLocation: collegeLocation,
      numberOfDepartments: numberOfDepartments,
      collegeEmail: collegeEmail,
      collegePhone: collegePhone,
      collegeWebsite: collegeWebsite,
      collegePerson: collegePerson,
      collegeFacilities: collegeFacilities,
      coursesName: coursesName,
      courseDuration: courseDuration,
      branchName: branchName,
      fee: fee,
      placements: placements,
      facilities: facilities,
      eligibility: eligibility,
      scholarship: scholarship,
    });
    res.send({ status: "Ok", data: "College created" });
  } catch (err) {
    res.send({ status: "error", data: err });
  }
});


app.listen(post, () => {
  console.log(`Server is running on port ${post}`);
});
