const mongoose = require("mongoose");

async function connectDB() {
    try {
        const connection = mongoose.connect(process.env.DB_LINK, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });

        console.log("Baza konektovana");
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

module.exports = connectDB;