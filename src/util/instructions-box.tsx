import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  Heading,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon, ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const instructions = [
  {
    title: "Welcome to SwiftLink!!",
    image: "",
    content:
      "SwiftLink is a website that provide functionality to send messages in bulk via SMS, Email and Whatsapp. Please follow this guide to have a smooth and hastlefree experiance.",
  },
  {
    title: "Email usage: Navigation",
    alt: "2 Step verification reference Image",
    image: "images/image-1.png",
    content:
      "just Search my account in google. Then go to security -> signing in to google and enable 2 Step verification",
  },
  {
    title: "Email usage: App Password",
    alt: "Searchbar Image",
    image: "images/image-2.png",
    content:
      "Search for app password in the searchbar. Then select your and app type as mail. It'll generate a key that you must use for sending emails",
  },
  {
    title: "SMS limited use",
    alt: "",
    image: "",
    content:
      "As of now the SMS service is paid, so you can only send sms to some of the contacts by manually adding them to the twillio trial account. You can send me those contacts on 'lovedeep.kuk81@gmail.com' for SMS services",
  },
  {
    title: "WhatsApp delay",
    alt: "",
    image: "",
    content:
      "The server is very slow so you'll have to wait 1-2 min for QR code to appear, the QR code must be scanned by your whatapp mobile app to send messages",
  },
  {
    title: "Have Fun exploring",
    image: "",
    content:
      "Thank you for your patience, you should be more confortable now while using the SwiftLink website.",
  },
];

type instructionBoxProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const InstructionDialog: React.FC<instructionBoxProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isNext, setIsNext] = useState(true);

  const nextPage = () => {
    if (currentPage < instructions.length - 1) {
      setCurrentPage(currentPage + 1);
      setIsNext(true);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsNext(false);
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <ChakraProvider>
      <AnimatePresence>
        {isOpen && (
          <Box
            minWidth={450}
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="black"
            padding="20px"
            borderRadius="md"
            boxShadow="md"
            maxWidth="400px"
            width="100%"
            textAlign="center"
          >
            <Button
              position="absolute"
              top="5px"
              right="5px"
              bg="transparent"
              onClick={closeDialog}
            >
              <CloseIcon />
            </Button>
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: isNext ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isNext ? -50 : 50 }}
              transition={{ duration: 0.3 }}
            >
              <Heading mb={4} size="lg">
                {instructions[currentPage].title}
              </Heading>
              {instructions[currentPage].image !== "" && (
                <Image
                  p={2}
                  src={`${instructions[currentPage].image}`}
                  alt={`${instructions[currentPage].alt}`}
                />
              )}
              <Text
                bg={"gray.800"}
                p={2}
                borderRadius={10}
                fontWeight={600}
                mt={2}
              >
                {instructions[currentPage].content}
              </Text>
            </motion.div>
            <Flex mt={6} justifyContent="space-between">
              <Button
                leftIcon={<ArrowBackIcon />}
                onClick={prevPage}
                isDisabled={currentPage === 0}
              >
                Previous
              </Button>
              <Button
                rightIcon={<ArrowForwardIcon />}
                onClick={nextPage}
                isDisabled={currentPage === instructions.length - 1}
              >
                Next
              </Button>
            </Flex>
          </Box>
        )}
      </AnimatePresence>
    </ChakraProvider>
  );
};

export default InstructionDialog;
