const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: String, required: true },
    fees: { type: String, required: true },
  });
  
  const contactSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    website: { type: String, required: true },
  });
  
  const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    courses: [courseSchema],
    contact: contactSchema,
  });
  
  const citySchema = new mongoose.Schema({
    city: { type: String, required: true },
    colleges: [collegeSchema],
  });
  
  const City = mongoose.model("City", citySchema);