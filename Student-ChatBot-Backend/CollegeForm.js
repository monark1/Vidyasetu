const mongoose = require("mongoose");

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
        collation: { locale: "en", strength: 1 },
    }
);

module.exports = mongoose.model("CollegeForm", CollegeFormSchema);