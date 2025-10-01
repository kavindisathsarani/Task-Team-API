const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected with socket id:", socket.id);

  // Register a user (replace with an actual user _id from your DB)
  socket.emit("register", "68db8df60472f019e1afdb8e");
});

socket.on("taskAssigned", (task) => {
  console.log("New task assigned:", task);   
});

//first run -> npm run dev then in a new terminal run -> node socketClient.js
// Connected with socket id: xLzKnqaye2g4vo2TAAAB

//run the server first then run this file using node socketClient.js
//output will be like this

// socket connected xLzKnqaye2g4vo2TAAAB
// Socket event emitted: taskAssigned for user 68db8df60472f019e1afdb8e
