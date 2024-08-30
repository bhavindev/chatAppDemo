const { Server } = require('socket.io');
const ChatRoom = require('../models/chatRoom.js');

function ChatSocket(server, app) {
  const io = new Server(server, {
    cors: {
      origin: '*', // Adjust this to your specific frontend domain in production
      methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  app.set('io', io);

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle joining a chat room
    socket.on('joinRoom', async (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);

      try {
        const room = await ChatRoom.findOne({ roomId });
        if (room) {
          socket.emit('chatHistory', room);
        } else {
          socket.emit('chatHistory', { messages: [] });
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    });

    // Handle sending a message
    socket.on('sendMessage', async (data) => {
      const { roomId, text, sender } = data;
      const message = {
        text,
        sender,
        isRead: false,
        type: 'text',
      };

      try {
        const updatedRoom = await ChatRoom.findOneAndUpdate(
          { roomId },
          { $push: { messages: message } },
          { new: true, useFindAndModify: false }
        );

        io.to(roomId).emit('messageReceived', updatedRoom);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    // Handle marking messages as read
    socket.on('markMessageAsRead', async (data) => {
      const { roomId, messageId, userId } = data;

      try {
        const room = await ChatRoom.findOne({ roomId });
        const message = room.messages.id(messageId);

        if (message && message.sender.toString() !== userId && !message.isRead) {
          message.isRead = true;
          await room.save();

          const updatedRoom = await ChatRoom.findOne({ roomId });
          io.to(roomId).emit('messageRead', updatedRoom);
        }
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
}

module.exports = ChatSocket;
