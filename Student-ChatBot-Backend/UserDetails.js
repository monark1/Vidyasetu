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
const collegeSchema = new mongoose.Schema({
  collegeName: String,
  collegeCode: String,
  collegeLocation: String,
  numberOfDepartments: String,
  collegeEmail: String,
  collegePhone: String,
  collegeWebsite: String,
  city: String,
  collegePerson: String,
  collegeFacilities: String,
  courseName: String,
  courseDuration: String,
  branchName: String,
  fee: String,
  placements: String,
  img:String,
  facilities: String,
  eligibility: String,
  scholarship: String,
}
);

const branchSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  // fee: { type: String, required: true },
  // placements: { type: String, required: true },
  // scholarship: { type: String, required: true },
  // facilities: { type: String, required: true },
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  branches: [branchSchema],  // Use the branch schema here
});

const collegeSchemas = new mongoose.Schema({
  collegeName: { type: String, required: true },
  collegeCode: { type: String, required: true },
  collegeLocation: { type: String, required: true },
  numberOfDepartments: { type: Number, required: true },
  collegeEmail: { type: String, required: true },
  collegePhone: { type: String, required: true },
  collegeWebsite: { type: String, required: true },
  collegePerson: { type: String, required: true },
  collegeFacilities: { type: String, required: true },
  courses: [courseSchema],  // Use the course schema here
});
mongoose.model("CollegeInfo", collegeSchema);
mongoose.model("UserInfo", UserDetailsSchema);
// mongoose.model("CollegeForm", CollegeFormSchema);