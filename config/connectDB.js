const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URI);
    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
