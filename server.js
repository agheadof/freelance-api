const http = require("http");
require("dotenv").config();
const { connectToMongoDB } = require("./services/mongo");

const app = require("./app");

const { PORT } = process.env;

const server = http.createServer(app);

async function startServer() {
  await connectToMongoDB();

  server.listen(PORT);
}

startServer().then(() => console.log("Started Server"));

// node .\server.js