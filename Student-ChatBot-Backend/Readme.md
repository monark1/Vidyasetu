# Npm 

```sh
    npm i express
    npm i -g nodemon
    npm i mongoose
    npm i jsonwebtoken
    npm i bcryptjs
    npm i dotenv
    npm i @google/generative-ai
```

curl -X POST http://localhost:5001/colleges \
-H "Content-Type: application/json" \
-d '{
  "city": "Delhi",
  "colleges": [
    {
      "name": "Delhi Government Polytechnic College",
      "fee": "INR 10,000 per semester",
      "place": "Karampura, Delhi",
      "branches": ["Civil", "Mechanical", "Computer Science"],
      "img": "https://example.com/college1.jpg"
    }
  ]
}'

curl -X POST http://localhost:5001/college `
-H "Content-Type: application/json" `
-d '{"city":"Mumbai","colleges":[{"name":"Mumbai Polytechnic College","fee":"INR 12,000 per semester","place":"Andheri, Mumbai","branches":["Electrical","Electronics","Civil"],"img":"https://example.com/college2.jpg"}]}'

curl -X POST http://localhost:5001/college `
-H "Content-Type: application/json" `
-d '{"city":"Delhi","colleges":[{"name":"Delhi Government Polytechnic College","fee":"INR 10,000 per semester","place":"Karampura, Delhi","branches":["Civil","Mechanical","Computer Science"],"img":"https://example.com/college1.jpg"}]}'


const express = require('express');
const mongoose = require('mongoose');

// Create the Express app
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/collegesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the College schema
const collegeSchema = new mongoose.Schema({
  name: String,
  fee: String,
  place: String,
  branches: [String],
  img: String,
  city: String,
});

// Create a model for colleges
const College = mongoose.model('College', collegeSchema);

// POST route to handle chat and find college by city
app.post("/chat", async (req, res) => {
  try {
    // Extract the city from the user's message
    const city = req.body.message.trim();

    // Query MongoDB to find colleges by city
    const collegesInCity = await College.find({ city });

    // Check if colleges are found for the provided city
    if (collegesInCity.length > 0) {
      const collegeDetails = collegesInCity.map(college => {
        return `Name: ${college.name}\nFee: ${college.fee}\nPlace: ${college.place}\nBranches: ${college.branches.join(", ")}\n[Image](${college.img})`;
      }).join('\n\n');

      // Return the found college data
      res.send({
        status: "Ok",
        data: collegeDetails,
      });
    } else {
      // If no colleges are found, use Gemini AI to reply intelligently
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
      message: error.message,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
