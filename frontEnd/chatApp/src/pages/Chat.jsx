// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import {
//   Box,
//   Flex,
//   Text,
//   Input,
//   Button,
//   VStack,
//   HStack,
//   Spinner,
//   IconButton,
// } from '@chakra-ui/react';
// import { FaSmile, FaPaperclip } from 'react-icons/fa';
// import EmojiPicker from 'emoji-picker-react';
// import { AiOutlineCheck } from 'react-icons/ai';
// import { RiCheckDoubleLine } from 'react-icons/ri';
// import { useSelector, useDispatch } from 'react-redux';
// import Header from '../components/Header';
// import { useSocket } from '../SocketContext';
// import { setMessages } from '../store/actions';
// import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import axios from 'axios';

// function Chat() {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const socket = useSocket();
//   const dispatch = useDispatch();
//   const messages = useSelector((state) => state.chatMessages);
//   const selectedUser = useSelector((state) => state.ChatReciver?._id) || {};
//   const currentUser = useSelector((state) => state.user?.user1?._id) || {};
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const navigate = useNavigate();
//   const chatContainerRef = useRef(null);
//   const latestMessageRef = useRef(null);

//   const fetchMessages = useCallback(async () => {
//     const RoomUsers = {
//       selectedUser,
//       currentUser
//     };

//     try {
//       const response = await axios.post('/api/user/getRoomId', RoomUsers);
//       const roomId = response.data?.roomId;

//       if (!roomId) return;

//       setSelectedChat({ roomId, userId: selectedUser });

//       setLoading(true);
//       socket.emit('joinRoom', roomId);

//       socket.on('chatHistory', (room) => {
//         dispatch(setMessages(room.messages));
//       });

//       socket.on('messageReceived', (updatedRoom) => {
//         dispatch(setMessages(updatedRoom.messages));
//       });

//       socket.on('messageRead', (updatedRoom) => {
//         dispatch(setMessages(updatedRoom.messages));
//       });
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedUser, currentUser, dispatch, socket]);

//   useEffect(() => {
//     fetchMessages();
//   }, [fetchMessages]);

//   useEffect(() => {
//     if (selectedChat) {
//       const handleScroll = () => {
//         const chatContainer = chatContainerRef.current;
//         if (!chatContainer) return;

//         const scrollTop = chatContainer.scrollTop;
//         const scrollHeight = chatContainer.scrollHeight;
//         const clientHeight = chatContainer.clientHeight;

//         if (scrollTop + clientHeight >= scrollHeight - 5) {
//           const unreadMessages = messages.filter(msg => !msg.isRead && msg.sender.toString() !== currentUser);
//           console.log('Unread messages:', unreadMessages);
//           unreadMessages.forEach(msg => {
//             socket.emit('markMessageAsRead', {
//               roomId: selectedChat.roomId,
//               messageId: msg._id,
//               userId: currentUser,
//             });
//           });
//         }
//       };

//       const chatContainer = chatContainerRef.current;
//       chatContainer.addEventListener('scroll', handleScroll);
//       return () => chatContainer.removeEventListener('scroll', handleScroll);
//     }
//   }, [selectedChat, messages, socket, currentUser]);

//   useEffect(() => {
//     if (latestMessageRef.current) {
//       latestMessageRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (!newMessage.trim() || !selectedChat) return;

//     socket.emit('sendMessage', {
//       roomId: selectedChat.roomId,
//       text: newMessage,
//       sender: currentUser,
//     });

//     setNewMessage('');
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault(); // Prevent default behavior (like new line in the input)
//       handleSendMessage();
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     console.log('File selected:', file);
//   };

//   const handleBack = () => {
//     navigate('/Home');
//   };

//   if (!selectedChat || loading) {
//     return (
//       <Flex justify="center" align="center" height="100%">
//         <Spinner size="xl" />
//       </Flex>
//     );
//   }

//   return (
//     <Flex direction="column" flex="1" p={4} bg="white" borderRadius="md" boxShadow="sm" height="100vh">
//       <Header user={selectedChat.user} onBack={handleBack} />
//       <VStack
//         ref={chatContainerRef}
//         spacing={4}
//         align="stretch"
//         overflowY="auto"
//         flex="1"
//         mt={4}
//         height="calc(100vh - 150px)"
//       >
//         {messages.map((msg, index) => (
//           <Box
//             key={msg._id}
//             ref={index === messages.length - 1 ? latestMessageRef : null}
//             p={3}
//             bg={msg.sender === currentUser ? 'blue.100' : 'gray.100'}
//             borderRadius="md"
//             alignSelf={msg.sender === currentUser ? 'flex-end' : 'flex-start'}
//             maxWidth="80%"
//             position="relative"
//           >
//             <Text fontSize="sm">{msg.text}</Text>
//             {msg.sender === currentUser && (
//               <HStack spacing={1} mt={1} justify="flex-end" position="absolute" bottom="4px" right="8px">
//                 {msg.isRead ? (
//                   <RiCheckDoubleLine color="blue" />
//                 ) : (
//                   <AiOutlineCheck color="gray" />
//                 )}
//               </HStack>
//             )}
//           </Box>
//         ))}
//       </VStack>

//       <HStack spacing={2} mt={4} p={2} borderTopWidth={1} borderTopColor="gray.200" bg="white">
//         <IconButton
//           icon={<FaSmile />}
//           onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//           variant="ghost"
//           aria-label="Open emoji picker"
//         />
//         {showEmojiPicker && (
//           <Box position="absolute" bottom="60px">
//             <EmojiPicker onSelect={(emoji) => setNewMessage(newMessage + emoji.native)} />
//           </Box>
//         )}
//         <Input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Type a message..."
//           size="md"
//         />
//         <input
//           type="file"
//           onChange={handleFileChange}
//           style={{ display: 'none' }}
//           id="file-upload"
//         />
//         <label htmlFor="file-upload">
//           <IconButton icon={<FaPaperclip />} variant="ghost" aria-label="Attach file" />
//         </label>
//         <Button onClick={handleSendMessage} colorScheme="blue">
//           Send
//         </Button>
//       </HStack>
//     </Flex>
//   );
// }

// Chat.propTypes = {
//   user: PropTypes.object,
//   onBack: PropTypes.func,
// };

// export default Chat;



import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Spinner,
  IconButton,
} from '@chakra-ui/react';
import { FaSmile, FaPaperclip } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiCheckDoubleLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import { useSocket } from '../SocketContext';
import { setMessages } from '../store/actions';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const socket = useSocket();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatMessages);
  const selectedUser = useSelector((state) => state.ChatReciver?._id) || {};
  const currentUser = useSelector((state) => state.user?.user1?._id) || {};
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const latestMessageRef = useRef(null);

  const fetchMessages = useCallback(async () => {
    const RoomUsers = {
      selectedUser,
      currentUser,
    };

    try {
      const response = await axios.post('/api/user/getRoomId', RoomUsers);
      const roomId = response.data?.roomId;

      if (!roomId) return;

      setSelectedChat({ roomId, userId: selectedUser });

      setLoading(true);
      socket.emit('joinRoom', roomId);

      socket.on('chatHistory', (room) => {
        dispatch(setMessages(room.messages));
      });

      socket.on('messageReceived', (updatedRoom) => {
        dispatch(setMessages(updatedRoom.messages));
      });

      socket.on('messageRead', (updatedRoom) => {
        dispatch(setMessages(updatedRoom.messages));
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedUser, currentUser, dispatch, socket]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (selectedChat) {
      const handleScroll = () => {
        const chatContainer = chatContainerRef.current;
        if (!chatContainer) return;

        const scrollTop = chatContainer.scrollTop;
        const scrollHeight = chatContainer.scrollHeight;
        const clientHeight = chatContainer.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 5) {
          const unreadMessages = messages.filter(
            (msg) => !msg.isRead && msg.sender.toString() !== currentUser
          );
          console.log('Unread messages:', unreadMessages);
          unreadMessages.forEach((msg) => {
            socket.emit('markMessageAsRead', {
              roomId: selectedChat.roomId,
              messageId: msg._id,
              userId: currentUser,
            });
          });
        }
      };

      const chatContainer = chatContainerRef.current;
      chatContainer.addEventListener('scroll', handleScroll);
      return () => chatContainer.removeEventListener('scroll', handleScroll);
    }
  }, [selectedChat, messages, socket, currentUser]);

  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    socket.emit('sendMessage', {
      roomId: selectedChat.roomId,
      text: newMessage,
      sender: currentUser,
    });

    setNewMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior (like new line in the input)
      handleSendMessage();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('File selected:', file);
  };

  const handleBack = () => {
    navigate('/Home');
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(prevMessage => prevMessage + emoji.emoji);
    setShowEmojiPicker(false); // Hide the picker after selecting an emoji
  };

  if (!selectedChat || loading) {
    return (
      <Flex justify="center" align="center" height="100%">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex direction="column" flex="1" p={4} bg="white" borderRadius="md" boxShadow="sm" height="100vh">
      <Header user={selectedChat.user} onBack={handleBack} />
      <VStack
        ref={chatContainerRef}
        spacing={4}
        align="stretch"
        overflowY="auto"
        flex="1"
        mt={4}
        height="calc(100vh - 150px)"
      >
        {messages.map((msg, index) => (
          <Box
            key={msg._id}
            ref={index === messages.length - 1 ? latestMessageRef : null}
            p={3}
            bg={msg.sender === currentUser ? 'blue.100' : 'gray.100'}
            borderRadius="md"
            alignSelf={msg.sender === currentUser ? 'flex-end' : 'flex-start'}
            maxWidth="80%"
            position="relative"
          >
            <Text fontSize="sm">{msg.text}</Text>
            {msg.sender === currentUser && (
              <HStack spacing={1} mt={1} justify="flex-end" position="absolute" bottom="4px" right="8px">
                {msg.isRead ? (
                  <RiCheckDoubleLine color="blue" />
                ) : (
                  <AiOutlineCheck color="gray" />
                )}
              </HStack>
            )}
          </Box>
        ))}
      </VStack>

      <HStack spacing={2} mt={4} p={2} borderTopWidth={1} borderTopColor="gray.200" bg="white" position="relative">
        <IconButton
          icon={<FaSmile />}
          onClick={() => setShowEmojiPicker(prev => !prev)}
          variant="ghost"
          aria-label="Open emoji picker"
        />
        {showEmojiPicker && (
          <Box position="absolute" bottom="60px" zIndex="10">
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </Box>
        )}
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          size="md"
        />
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <IconButton icon={<FaPaperclip />} variant="ghost" aria-label="Attach file" />
        </label>
        <Button onClick={handleSendMessage} colorScheme="blue">
          Send
        </Button>
      </HStack>
    </Flex>
  );
}

Chat.propTypes = {
  user: PropTypes.object,
  onBack: PropTypes.func,
};

export default Chat;
