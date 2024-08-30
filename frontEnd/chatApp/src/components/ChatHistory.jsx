// import React, { useState } from 'react';
// import {
//   Box,
//   Flex,
//   Avatar,
//   Text,
//   Icon,
//   VStack,
//   HStack,
//   Spinner,
// } from '@chakra-ui/react';
// import { CheckCircleIcon, CheckIcon } from '@chakra-ui/icons';
// import { useNavigate } from 'react-router-dom'; 
// import axios from 'axios';
// import Chat from '../pages/Chat'; 

// function ChatHistory() {
//   const [loading, setLoading] = useState(false);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const navigate = useNavigate(); 

//   const chatData = [
//     {
//       "userName": "John Doe",
//       "userImage": "https://via.placeholder.com/150",
//       "lastMessage": "Hey, how are you?",
//       "seen": true
//     },
//     {
//       "userName": "Jane Smith",
//       "userImage": "https://via.placeholder.com/150",
//       "lastMessage": "Let's catch up later!",
//       "seen": false
//     }
//   ];

//   if (loading) {
//     return (
//       <Flex justify="center" align="center" height="100%">
//         <Spinner size="xl" />
//       </Flex>
//     );
//   }

//   const handleProfileClick = (chat) => {
//     setSelectedChat(chat);
//     // Navigate to the chat page with the selected chat's userName
//     //navigate(`/chat/${chat.userName}`, { state: { user: chat.userName, id: chat.userName } });
//     navigate("/Chat");
//   };

//   return (
//     <Flex direction="row" height="100%">
//       <VStack
//         spacing={4}
//         align="stretch"
//         height="100%"
//         overflowY="auto"
//         p={4}
//         bg="gray.100"
//         borderRadius="md"
//         flex="1"
//       >
//         {chatData.map((chat, index) => (
//           <Flex
//             key={index}
//             align="center"
//             p={4}
//             bg="white"
//             borderRadius="md"
//             boxShadow="sm"
//             _hover={{ bg: 'gray.50' }}
//             cursor="pointer"
//             onClick={() => handleProfileClick(chat)}
//           >
//             <Avatar size="md" name={chat.userName} src={chat.userImage} />

//             <Box ml={4} flex="1">
//               <Text fontWeight="bold" fontSize="lg">
//                 {chat.userName}
//               </Text>

//               <Text fontSize="sm" color="gray.500" isTruncated>
//                 {chat.lastMessage}
//               </Text>
//             </Box>

//             <HStack spacing={2}>
//               {chat.seen ? (
//                 <Icon as={CheckCircleIcon} color="green.500" w={5} h={5} />
//               ) : (
//                 <Icon as={CheckIcon} color="gray.400" w={5} h={5} />
//               )}
//             </HStack>
//           </Flex>
//         ))}
//       </VStack>
//     </Flex>
//   );
// }

// export default ChatHistory;




//===========================================================================================================================

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Flex,
//   Avatar,
//   Text,
//   VStack,
//   Spinner,
// } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom'; 
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { loadchat } from "../store/actions.js";

// function ChatHistory() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
   

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {

//         console.log("responseresponse");
//         const response = await axios.post('/api/user/findAllUsers');
//         setUsers(response.data.data); 
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleProfileClick = () => {
//     dispatch(loadchat(response.data));
//     navigate("/Chat");
//   };

//   if (loading) {
//     return (
//       <Flex justify="center" align="center" height="100%">
//         <Spinner size="xl" />
//       </Flex>
//     );
//   }

//   return (
//     <Flex direction="row" height="100%">
//       <VStack
//         spacing={4}
//         align="stretch"
//         height="100%"
//         overflowY="auto"
//         p={4}
//         bg="gray.100"
//         borderRadius="md"
//         flex="1"
//       >
//         {users.map((user) => (
//           <Flex
//             key={user._id}
//             align="center"
//             p={4}
//             bg="white"
//             borderRadius="md"
//             boxShadow="sm"
//             _hover={{ bg: 'gray.50' }}
//             cursor="pointer"
//             onClick={() => handleProfileClick(user)}
//           >
//             <Avatar size="md" name={`${user.firstName} ${user.lastName}`} src={`${user.avatar}`} />

//             <Box ml={4} flex="1">
//               <Text fontWeight="bold" fontSize="lg">
//                 {user.firstName} {user.lastName}
//               </Text>

//               <Text fontSize="sm" color="gray.500" isTruncated>
//                 {user.phoneNumber}
//               </Text>
//             </Box>
//           </Flex>
//         ))}
//       </VStack>
//     </Flex>
//   );
// }

// export default ChatHistory;





import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Text,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loadchat } from "../store/actions";

function ChatHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
   
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users");
        const response = await axios.post('/api/user/findAllUsers');
        setUsers(response.data.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleProfileClick = (user) => {

    // Dispatch action with user data
    dispatch(loadchat({
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
      _id : user._id
    }));
    // Navigate to the Chat page
    navigate("/Chat");
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100%">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex direction="row" height="100%">
      <VStack
        spacing={4}
        align="stretch"
        height="100%"
        overflowY="auto"
        p={4}
        bg="gray.100"
        borderRadius="md"
        flex="1"
      >
        {users.map((user) => (
          <Flex
            key={user._id}
            align="center"
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            _hover={{ bg: 'gray.50' }}
            cursor="pointer"
            onClick={() => handleProfileClick(user)}
          >
            <Avatar size="md" name={`${user.firstName} ${user.lastName}`} src={`${user.avatar}`} />
            <Box ml={4} flex="1">
              <Text fontWeight="bold" fontSize="lg">
                {user.firstName} {user.lastName}
              </Text>
              <Text fontSize="sm" color="gray.500" isTruncated>
                {user.phoneNumber}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
}

export default ChatHistory;
