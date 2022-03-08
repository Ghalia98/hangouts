const app = require("./app");;
const socket = require('socket.io');
const cors = require('cors')

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
}
)

let users = []
const addUsers = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId })
  console.log(users)
}


const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId)
}

const getUser = userId => {
  return users.find(user => user.userId === userId)
}

io.on('connection', (socket) => {
  // when a user connects
  console.log('new client connected with id', socket.id)
  // take userId and socketId from user
  socket.on("addUser", userId => {
    addUsers(userId, socket.id);
    io.emit("getUsers", users)
    // send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });

    // when a user disconnects
    socket.on("disconnect", () => {
      console.log("a user disconnected")
      removeUser(socket.id)
      io.emit("getUsers", users)
    })
  })
})