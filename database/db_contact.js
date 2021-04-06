const mongoose = require("mongoose");
//const Contact_DB_LINK = require("mongodb+srv://nikolamirilo:rowing123@cluster0.28wug.mongodb.net/Contact_DB?retryWrites=true&w=majority");

async function connectContactDB() {
    try {
        const connectionContact = mongoose.createConnection(process.env.Contact_DB_LINK, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true

        });
        console.log("Kontakt baza konektovana!");
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}
module.exports = connectContactDB;