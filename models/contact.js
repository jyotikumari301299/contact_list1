const mongoose = require('mongoose');

// creating Schemas 
// Added some comment

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    phone: {
        type : String,
        required: true
    }
});
// Contact database me collection ka naam rhega or yha usi schema ko contactschema bol rhe h
const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;