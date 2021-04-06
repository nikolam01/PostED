const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: Number,
        trim: true,
    },
    message: {
        type: String,
        trim: true,
    },

});

module.exports = mongoose.model("Contact", ContactSchema);