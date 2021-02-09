const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: [true, 'Name field is required!']},
    email: {type: String, required: [true, 'Email field is required!'] },
    complaint: {type: String, required: [true, 'Complaint field is required']}
});


module.exports = mongoose.model('user', userSchema);