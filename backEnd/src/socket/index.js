const { Server } = require("socket.io");
const ChatSocket = require("./chat.js");
const app = require("../../app.js")

console.log("socket created");

exports.setupSocket = (server)=>{

  ChatSocket(server,app);
}
