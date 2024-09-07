const {GoogleGenerativeAI} = require("@google/generative-ai");
// const genAI = require('gemini-ai');
const env = require("dotenv");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);// Import Google's Gemini API

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",  // Use the appropriate Gemini model
});

const generationConfig = {
  temperature: 0.7,  // Moderate randomness in the response
  topP: 0.9,         // Sampling from the most likely tokens
  topK: 50,          // Limits to top-k most probable options
  maxOutputTokens: 500,
  responseMimeType: "text/plain",
};

// Polytechnic College Data
const colleges = {
  "Delhi": [
    {
      name: "Delhi Government Polytechnic College",
      fee: "INR 10,000 per semester",
      place: "Karampura, Delhi",
      branches: ["Civil", "Mechanical", "Computer Science"],
      img: "https://example.com/college1.jpg",
    }
  ],
  "Mumbai": [
    {
      name: "Mumbai Polytechnic College",
      fee: "INR 12,000 per semester",
      place: "Andheri, Mumbai",
      branches: ["Electrical", "Electronics", "Civil"],
      img: "https://example.com/college2.jpg",
    }
  ],
  // Add more cities and colleges
};

const express = require('express');
const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const city = req.body.message;

    // Check if the city exists in the database
    if (colleges[city]) {
      const collegeDetails = colleges[city].map(college => {
        return `Name: ${college.name}\nFee: ${college.fee}\nPlace: ${college.place}\nBranches: ${college.branches.join(", ")}\n[Image](${college.img})`;
      }).join('\n\n');

      // Return the pre-loaded college data
      res.send({
        status: "Ok",
        data: collegeDetails,
      });
    } else {
      // No data found, use Gemini to reply intelligently
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(`No data found for ${city}. Could you provide more information on this city's polytechnic colleges?`);
      const responseText = await result.response.text();

      res.send({
        status: "Ok",
        data: responseText,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Error",
    //   message: error.message,
    });
  }
});

app.listen(4001, () => {
    console.log('Server is running on port 4001');
});
