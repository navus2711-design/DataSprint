const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Create Express app
const app = express();
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Store rooms and users
const rooms = new Map();

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  let currentRoom = null;
  let userId = null;
  let username = null;
  
  // Handle join room
  socket.on('join-room', (data) => {
    userId = data.userId;
    username = data.username;
    currentRoom = data.roomId;
    
    // Join the room
    socket.join(currentRoom);
    
    // Create room if it doesn't exist
    if (!rooms.has(currentRoom)) {
      rooms.set(currentRoom, new Map());
    }
    
    // Add user to room
    rooms.get(currentRoom).set(userId, {
      id: userId,
      username,
      socketId: socket.id,
      position: data.position || { x: 0, y: 0, z: 0 },
      rotation: data.rotation || { x: 0, y: 0, z: 0 }
    });
    
    // Notify other users in the room
    socket.to(currentRoom).emit('user-joined', {
      userId,
      username,
      position: data.position || { x: 0, y: 0, z: 0 },
      timestamp: Date.now()
    });
    
    // Send existing users to the new user
    const existingUsers = [];
    rooms.get(currentRoom).forEach((user, id) => {
      if (id !== userId) {
        existingUsers.push({
          userId: id,
          username: user.username,
          position: user.position,
          rotation: user.rotation
        });
      }
    });
    
    socket.emit('existing-users', existingUsers);
    
    console.log(`User ${username} (${userId}) joined room ${currentRoom}`);
  });
  
  // Handle user transform update
  socket.on('user-transform', (data) => {
    if (!currentRoom) return;
    
    // Update user position and rotation
    const room = rooms.get(currentRoom);
    if (room && room.has(data.userId)) {
      const user = room.get(data.userId);
      user.position = data.position;
      user.rotation = data.rotation;
    }
    
    // Broadcast to other users in the room
    socket.to(currentRoom).emit('user-transform', data);
  });
  
  // Handle object transform update
  socket.on('object-transform', (data) => {
    if (!currentRoom) return;
    
    // Broadcast to other users in the room
    socket.to(currentRoom).emit('object-transform', data);
  });
  
  // Handle chat message
  socket.on('chat-message', (data) => {
    if (!currentRoom) return;
    
    // Broadcast to other users in the room
    socket.to(currentRoom).emit('chat-message', data);
  });
  
  // Handle add object
  socket.on('add-object', (data) => {
    if (!currentRoom) return;
    
    // Broadcast to other users in the room
    socket.to(currentRoom).emit('add-object', data);
  });
  
  // Handle remove object
  socket.on('remove-object', (data) => {
    if (!currentRoom) return;
    
    // Broadcast to other users in the room
    socket.to(currentRoom).emit('remove-object', data);
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    if (currentRoom && userId) {
      // Remove user from room
      const room = rooms.get(currentRoom);
      if (room) {
        room.delete(userId);
        
        // Delete room if empty
        if (room.size === 0) {
          rooms.delete(currentRoom);
        }
        
        // Notify other users in the room
        socket.to(currentRoom).emit('user-left', {
          userId,
          timestamp: Date.now()
        });
      }
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});