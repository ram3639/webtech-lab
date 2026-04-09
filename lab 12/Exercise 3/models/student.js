const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    age: {
        type: Number,
        required: [true, 'Please add an age']
    },
    course: {
        type: String,
        required: [true, 'Please add a course']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
