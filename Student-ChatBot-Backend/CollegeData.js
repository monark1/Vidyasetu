const mongoose = require("mongoose");

// Create a College schema
const collegeSchema = new mongoose.Schema({
    name: String,
    fee: String,
    place: String,
    branches: [String],
    img: String,
  });
  
  // Create a model for colleges
  const College = mongoose.model('College', collegeSchema);