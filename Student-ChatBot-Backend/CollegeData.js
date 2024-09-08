const mongoose = require("mongoose");

// Create a College schema
const collegeSchema = new mongoose.Schema({
    name: String,
    fee: String,
    place: String,
    branches: [String],
    img: String,
  });
  
//   // Create a model for colleges
// const courseSchema = new mongoose.Schema({
//   name: String,
//   duration: String,
//   fees: String,
// });

// const contactSchema = new mongoose.Schema({
//   email: String,
//   phone: String,
//   address: String,
//   website: String,
// });

// const collegeSchema = new mongoose.Schema({
//   name: String,
//   img: String,
//   courses: [courseSchema],
//   contact: contactSchema,
// });

// const citySchema = new mongoose.Schema({
//   city: String,
//   colleges: [collegeSchema],
// });
const College = mongoose.model('College', collegeSchema);

