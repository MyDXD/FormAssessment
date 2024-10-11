const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGOURL}`,
      {
        authSource: "admin",
        readPreference: "primary",
        appname: "MongoDB Compass",
        directConnection: true,
        ssl: false,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // หากเกิดปัญหาในการเชื่อมต่อ ให้หยุดโปรเซส
  }
};

module.exports = connectDB;
