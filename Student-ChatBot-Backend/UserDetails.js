const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collation: { locale: "en", strength: 1 },
  }
);

const CollegeFormSchema = new mongoose.Schema(
  {
    name: String,
    code: String,
    location: String,
    departments: String,
    website: String,
    email: { type: String, unique: true },
    phone: String,
    person: String,
    facilities: String,
    courses: [
      {
        name: String,
        duration: String,
        branches: [
          {
            name: String,
            fee: String,
            placements: String,
            scholarship: String,
            facilities: String,
          },
        ],
      },
    ],
  },
  {
    collation: { locale: "en", strength: 1 }
  }
)
const branchSchema = new mongoose.Schema({
  name: String,
  fee: String,
  placements: String,
  scholarship: String,
  facilities: String,
});

const courseSchema = new mongoose.Schema({
  name: String,
  duration: String,
  branches: [branchSchema],
});

const collegeSchema = new mongoose.Schema({
  name: String,
  code: String,
  location: String,
  departments: String,
  website: String,
  email: String,
  phone: String,
  person: String,
  facilities: String,
  courses: [courseSchema],
});

mongoose.model("CollegeForm", collegeSchema);
mongoose.model("UserInfo", UserDetailsSchema);
// mongoose.model("CollegeForm", CollegeFormSchema);