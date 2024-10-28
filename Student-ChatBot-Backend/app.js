const express = require('express');
const connectDB = require('./api/db');
const Auth = require('./routes/auth');
const Gemini = require('./routes/gemini');
const OnDemand = require('./routes/ondemand');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());

app.use('/', Auth); // Auth routes
app.use('/', Gemini); // Gemini routes
app.use('/', OnDemand); // OnDemand routes

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));