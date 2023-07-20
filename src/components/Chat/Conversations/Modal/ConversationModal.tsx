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
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import Participants from "./Participants";
import { SearchedUser } from "@/util/types";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Session } from "next-auth";
import Papa from "papaparse";

interface CSVData {
  Name: string;
  Phone: string;
  Email: string;
}

interface ConversationModalProps {
  session: Session;
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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target?.result;
      if (typeof fileContent === "string") {
        const parsedData = Papa.parse<CSVData>(fileContent, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header: string) => header.trim(),
          transform: (value: string) => value.trim(),
        });

        const { data } = parsedData;
        processData(data); // Process the extracted data
      }
    };
    reader.readAsText(selectedFile);
  };

  const processData = (data: CSVData[]) => {
    console.log(data)
    data.forEach((item) => {
        const randomKey = uuidv4();

        const searchedUser: SearchedUser = {
          id: randomKey,
          createdBy: session.user?.email!,
          username: item.Name,
          email: item.Email,
          phone: item.Phone,
        };
        if (!participants.some((user) => user.email === searchedUser.email)) {
          addParticipant(searchedUser);
          setError("");
        } else {
          setError("Participant already exists");
        }
    });
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [isSecondModalOpen, setSecondModalOpen] = useState(false);

  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

  const validateIndianPhoneNumber = (phoneNumber: string) => {
    // Regular expression pattern to match Indian phone numbers
    const pattern = /^(\+?91|0)?[6789]\d{9}$/;

    return pattern.test(phoneNumber);
  };

  const validateEmail = (email: string) => {
    // Regular expression to validate email format
    const emailRegex =
      /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
  };

  const onSelect = async (event: React.FormEvent) => {
    event.preventDefault();

    // Example usage:
    const isValid = validateIndianPhoneNumber(phoneNo);
    const isValid2 = validateEmail(email);
    if (isValid && isValid2) {
      const randomKey = uuidv4();

      const searchedUser: SearchedUser = {
        id: randomKey,
        createdBy: session.user?.email!,
        username: username,
        email: email,
        phone: phoneNo,
      };
      if (!participants.some((user) => user.email === searchedUser.email)) {
        addParticipant(searchedUser);
        setError("");
        setPhoneNo("");
        setEmail("");
        setUsername("");
      } else {
        setError("Participant already exists");
      }
    } else {
      setError("Invalid phone number or Email");
    }
  };

  const onSubmit = async (event: React.FormEvent) => {
    console.log(participants)
    try {
      const response = await axios.post(
        `${apiUrl}/manual-contacts`,
        {
          participants,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const onClickCSV = async (event: React.FormEvent) => {
    event.preventDefault();
    setSecondModalOpen(true);
    onClose();
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
        <ModalContent bg="#2d2d2d" pb={4} width={"90%"}>
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
                {error && (
                  <Flex textColor={"red.500"} fontSize={16}>
                    {error}
                  </Flex>
                )}
                <Button
                  mb={3}
                  type="submit"
                  isDisabled={!email || !phoneNo || !username}
                >
                  Search
                </Button>
              </Stack>
            </form>
            <Stack>
              {participants.length !== 0 && (
                <>
                  <Participants
                    removeParticipant={removeParticipant}
                    participants={participants}
                  />
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
                // ml={120}
                // mr={120}
                fontWeight={400}
                fontSize={{ base: 11, sm: 13 }}
                flexWrap={{ base: "wrap", sm: "nowrap" }}
                onClick={onClickCSV}
                _hover={{ cursor: "pointer", color: "gray.300" }}
              >
                Import Data from CSV file
              </Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isSecondModalOpen}
        onClose={() => setSecondModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Import Data from CSV file</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSelect}>
              <Stack>
                <Stack align={"center"} justify={"center"} pb={3}>
                  {/* <Box p={4}> */}
                    <FormControl>
                      <FormLabel alignContent={'center'} justifyContent={'center'}>Select CSV File</FormLabel>
                      <Input p={1} type="file" onChange={handleFileChange} />
                    </FormControl>
                    <Button mt={4} colorScheme="teal" onClick={handleUpload}>
                      Upload
                    </Button>
                  {/* </Box> */}
                </Stack>
                {error && (
                  <Flex textColor={"red.500"} fontSize={16}>
                    {error}
                  </Flex>
                )}
              </Stack>
            </form>
            <Stack>
              {participants.length !== 0 && (
                <>
                  <Participants
                    removeParticipant={removeParticipant}
                    participants={participants}
                  />
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
