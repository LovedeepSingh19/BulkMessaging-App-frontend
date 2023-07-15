import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Input,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import Participants from "./Participants";
import { SearchedUser } from "@/util/types";
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import { Session } from "next-auth";

interface ConversationModalProps {
  session: Session
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal: React.FC<ConversationModalProps> = ({
  isOpen,
  session,
  onClose,
}) => {
  const [username, setUsername] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [isSecondModalOpen, setSecondModalOpen] = useState(false);

  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

  const validateIndianPhoneNumber = (phoneNumber: string) => {
    // Regular expression pattern to match Indian phone numbers
    const pattern = /^(\+?91|0)?[6789]\d{9}$/;
  
    return pattern.test(phoneNumber);
  };

  const validateEmail = (email: string) => {
    // Regular expression to validate email format
    const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
  };

  const onSelect = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Example usage:
    const isValid = validateIndianPhoneNumber(phoneNo);
    const isValid2 = validateEmail(email);
    if(isValid && isValid2){
      const randomKey = uuidv4();
      
      const searchedUser: SearchedUser = {
        id: randomKey,
        createdBy: session.user?.email!,
        username: username,
        email: email, 
        phone: phoneNo 
      };
      if (!participants.some(user => user.email === searchedUser.email)) {
        addParticipant(searchedUser);
        setError("");
        setPhoneNo("");
        setEmail("");
        setUsername("");
      }else{
        setError("Participant already exists")
      }
    }else{
      setError("Invalid phone number or Email");
    }
  };

  const onSubmit = async (event: React.FormEvent) => {
    try {
      const response = await axios.post('https://vercel.live/link/backend-bulk-message-app-git-main-lovedeepsingh19.vercel.app?via=deployment-domains-list-branch/manual-contacts', {
        participants
      });
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting data:', error);
    }


  }

  const onClickCSV = async (event: React.FormEvent) => {
    event.preventDefault();
    setSecondModalOpen(true)
    onClose()
  };

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev) => [...prev, user]);
  };

  const removeParticipant = (userId: string) => {
    setParticipants((prev) => prev.filter((u) => u.email !== userId));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Enter Details Manually</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSelect}>
            <Stack>
              <Input
                placeholder="Enter User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="Enter User's Phone Numebr"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <Input
                placeholder="Enter User' Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <Flex textColor={'red.500'} fontSize={16}>{error}</Flex>}
              <Button mb={3} type="submit" isDisabled={((!email) || (!phoneNo)) || (!username)}>
                Search
              </Button>
            </Stack>
              </form>
              <Stack>
              {participants.length !== 0 && (
              <>
                <Participants
                    removeParticipant={removeParticipant} participants={participants}/>
                <Button
                  bg="brand.100"
                  _hover={{ bg: "brand.100" }}
                  width="100%"
                  mt={6}
                  onClick={onSubmit}
                >
                  Add Contacts
                </Button>
              </>
            )}
              <Text
                textAlign={"center"}
                ml={120}
                mr={120}
                fontWeight={400}
                fontSize={13}
                onClick={onClickCSV}
                _hover={{ cursor: "pointer", color: "gray.300" }}
              >
                Import Data from CSV file
              </Text>
              </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isSecondModalOpen} onClose={() => setSecondModalOpen(false)}>
    <ModalOverlay />
    <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Import Data from CSV file</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSelect}>
              <Stack>
            <Stack align={'center'} justify={'center'} pb={3}>
            <Button
      size="lg"
      width="200px"
      height="100px"
      borderRadius="10%"
      bg="gray.700"
      color="white"
      _hover={{ bg: "gray.800" }}
      onClick={() => {}}
    >
      <Text fontSize={15} fontWeight={500}>

      Select CSV File
      </Text>
    </Button>
    </Stack>
              {error && <Flex textColor={'red.500'} fontSize={16}>{error}</Flex>}
            </Stack>
              </form>
              <Stack>
              {participants.length !== 0 && (
              <>
                <Participants
                    removeParticipant={removeParticipant} participants={participants}/>
                <Button
                  bg="brand.100"
                  _hover={{ bg: "brand.100" }}
                  width="100%"
                  mt={6}
                  onClick={onSubmit}
                >
                  Add Contacts
                </Button>
              </>
            )}
              </Stack>
          </ModalBody>
        </ModalContent>
  </Modal>
    </>
  );
};
export default ConversationModal;
