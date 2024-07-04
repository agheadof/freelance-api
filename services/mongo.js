const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("Connected To MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB Error: ${err}`);
});

async function connectToMongoDB() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function disconnectFromMongoDB() {
  await mongoose.disconnect();
}

module.exports = {
  connectToMongoDB,
  disconnectFromMongoDB,
};
