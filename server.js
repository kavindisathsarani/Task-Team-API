require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const teamRoutes = require('./routes/teams');
const taskRoutes = require('./routes/tasks');
const reportRoutes = require('./routes/reports');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});

// simple socket map: userId -> socketId
const sockets = new Map();
io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('register', (userId) => {
    sockets.set(userId, socket.id);
    console.log('registered', userId, socket.id);
  });

  socket.on('disconnect', () => {
    for (const [k, v] of sockets.entries()) {
      if (v === socket.id) sockets.delete(k);
    }
    console.log('socket disconnected', socket.id);
  });
});

// expose sendNotification helper to controllers via app.locals
app.locals.io = io;
app.locals.sockets = sockets;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reports', reportRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/taskteam')
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.error(err));
