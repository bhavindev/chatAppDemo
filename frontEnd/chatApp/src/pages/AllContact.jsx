import React from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/react';

const dummyContacts = [
  { id: '1', name: 'John Doe', avatarUrl: 'https://via.placeholder.com/50' },
  { id: '2', name: 'Jane Smith', avatarUrl: 'https://via.placeholder.com/50' },
  { id: '3', name: 'Alice Johnson', avatarUrl: 'https://via.placeholder.com/50' },
  { id: '4', name: 'Bob Brown', avatarUrl: 'https://via.placeholder.com/50' },
];

function AllContact() {
  return (
    <Flex direction="column" p={4} bg="white" borderRadius="md" boxShadow="sm">
      {dummyContacts.length === 0 ? (
        <Text>No contacts found</Text>
      ) : (
        dummyContacts.map((contact) => (
          <Flex
            key={contact.id}
            align="center"
            p={2}
            borderBottomWidth={1}
            borderBottomColor="gray.200"
          >
            <Image
              src={contact.avatarUrl}
              alt={contact.name}
              borderRadius="full"
              boxSize="50px"
              mr={3}
            />
            <Text fontSize="md">{contact.name}</Text>
          </Flex>
        ))
      )}
    </Flex>
  );
}

export default AllContact;


























// import React, { useEffect, useState } from 'react';
// import { Box, Flex, Text, Image, Spinner } from '@chakra-ui/react';
// import axios from 'axios';

// function AllContact() {
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const response = await axios.get('/api/contacts'); // Replace with your API endpoint
//         setContacts(response.data);
//       } catch (error) {
//         setError('Error fetching contacts');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContacts();
//   }, []);

//   if (loading) {
//     return (
//       <Flex justify="center" align="center" height="100%">
//         <Spinner size="xl" />
//       </Flex>
//     );
//   }

//   if (error) {
//     return (
//       <Flex justify="center" align="center" height="100%">
//         <Text color="red.500">{error}</Text>
//       </Flex>
//     );
//   }

//   return (
//     <Flex direction="column" p={4} bg="white" borderRadius="md" boxShadow="sm">
//       {contacts.length === 0 ? (
//         <Text>No contacts found</Text>
//       ) : (
//         contacts.map((contact) => (
//           <Flex
//             key={contact.id}
//             align="center"
//             p={2}
//             borderBottomWidth={1}
//             borderBottomColor="gray.200"
//           >
//             <Image
//               src={contact.avatarUrl || 'https://via.placeholder.com/50'}
//               alt={contact.name}
//               borderRadius="full"
//               boxSize="50px"
//               mr={3}
//             />
//             <Text fontSize="md">{contact.name}</Text>
//           </Flex>
//         ))
//       )}
//     </Flex>
//   );
// }

// export default AllContact;
