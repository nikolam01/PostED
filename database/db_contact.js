const mongoose = require("mongoose");

async function connectContactDB() {
  try {
    const connectionContact = mongoose.createConnection(
      process.env.Contact_DB_LINK,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Kontakt baza konektovana!");
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}
module.exports = connectContactDB;
