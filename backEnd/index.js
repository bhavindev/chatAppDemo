const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});
const connectDB = require("./src/config/connectDb.js");
const app = require("./app.js");
const http = require("http");
const { setupSocket } = require("./src/socket/index.js");

const server = http.createServer(app);

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });

    setupSocket(server); 
  })
  .catch((error) => {
    console.log("Unabel to start server", error);
  });
