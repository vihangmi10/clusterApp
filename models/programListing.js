const mongoose = require('mongoose');
const ProgramListingSchema = new mongoose.Schema(
    {
        school: {
            type: String,
            required: [true, 'Please add a school name'],
            trim: true,
        },
        programName: {
            type: String,
            required: [true, 'Please enter program name']
        },
        degreeType: {
            type: String,
            required: [true, 'Please enter degree type']
        },
        delivery: {
            type: String,
            required: [true, 'Please enter delivery type']
        },
        annualTuition: {
            type: String,
            required: [true, 'Please enter annual tuition fee']
        },
        location: {
            type: String,
            required: [true, 'Please enter the location']
        }

    }
);

module.exports = mongoose.model('ProgramListing', ProgramListingSchema);
