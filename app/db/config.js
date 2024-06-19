const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI_1, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "artistCollection",
    });

    await mongoose.connect(process.env.MONGODB_URI_2, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "paintingCollection",
    });

    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
