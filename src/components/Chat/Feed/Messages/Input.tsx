import { SendMessageVariables } from "@/util/types";
import {
  Box,
  Image,
  Flex,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Switch,
} from "@chakra-ui/react";
import axios from "axios";
import { Session } from "next-auth";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface MessageInputProps {
  session: Session;
  setMessages: React.Dispatch<React.SetStateAction<SendMessageVariables[]>>;
  messages: Array<SendMessageVariables>;
}

const MessageInput = ({
  session,
  setMessages,
  messages,
}: MessageInputProps) => {
  const [messageBody, setMessageBody] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const [whatsapp, setWhatsapp] = useState(false);
  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(false);

  const [qrCodeData, setQRCodeData] = useState("");
  const [qrCodeImage, setQRCodeImage] = useState("");
  const [loading, setloading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Decode the QR code string and generate the image
    const generateQRCodeImage = async () => {
      try {
        const qrCodeImage = await QRCode.toDataURL(qrCodeData);
        setQRCodeImage(qrCodeImage);
        setIsOpen(true);
      } catch (error) {
        console.error("Error generating QR code image:", error);
      }
    };

    if (qrCodeData) {
      generateQRCodeImage();
    }
  }, [qrCodeData]);

  const handleSwitchChange = (name: string) => {
    if (name === "whatsapp") {
      setWhatsapp((prevValue) => !prevValue);
    } else if (name === "email") {
      setEmail((prevValue) => !prevValue);
    } else if (name === "sms") {
      setSms((prevValue) => !prevValue);
    }
  };

  const onSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const randomKey = uuidv4();

      const NewMessage: SendMessageVariables = {
        timeStamp: Date.now(),
        _id: randomKey,
        createdBy: session.user?.email!,
        body: messageBody,
        whatsApp: whatsapp,
        sms: sms,
        email: email,
      };
      setloading(true);

      const response = await axios.post(
        `${apiUrl}/sendMessage`,
        {
          message: NewMessage,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data && NewMessage.whatsApp) {
        console.log(response.data);
        const { phones, messages, qr } = response.data;

        setQRCodeData(qr);
        try {
          await axios
            .post(
              `${apiUrl}/qr-whatsApp`,
              {
                phones: phones,
                messages: messages,
              },
              { headers: { "Content-Type": "application/json" } }
            )
            .then(() => {
              setIsOpen(false);
              setQRCodeData("");
            });
        } catch (error: any) {
          console.log("WhatsApp Error: " + error.response.data.error);
        }
      }

      if (messages) {
        const updatedMessages = [...messages, NewMessage];
        setMessages(updatedMessages);
      } else {
        const updatedMessages = [NewMessage];
        setMessages(updatedMessages);
      }

      setloading(false);
      setMessageBody("");
    } catch (error) {
      console.log("onSendMessage error", error);
    }
  };

  return (
    <Box
      px={4}
      py={6}
      width={"100%"}
      pt={3}
      borderTop="1px solid"
      borderColor="whiteAlpha.200"
    >
      <form onSubmit={onSendMessage}>
        <Stack direction="row" spacing={4} pb={3} alignItems="center">
          <HStack spacing={1} alignItems="center">
            <FormLabel
              htmlFor="whatsapp"
              mb={0}
              color={whatsapp ? "green.600" : "gray.600"}
              fontWeight="semibold"
            >
              WhatsApp
            </FormLabel>
            <Box
              bg={whatsapp ? "green.800" : "gray.800"}
              borderRadius="full"
              boxShadow={whatsapp ? "md" : "none"}
              cursor="pointer"
              onClick={() => handleSwitchChange("whatsapp")}
            >
              <Switch
                id="whatsapp"
                size={"sm"}
                pl={1}
                pr={1}
                colorScheme="green.800"
                isChecked={whatsapp}
                onChange={() => handleSwitchChange("whatsapp")}
              />
            </Box>
          </HStack>
          <HStack spacing={1} alignItems="center">
            <FormLabel
              htmlFor="email"
              mb={0}
              color={email ? "blue.600" : "gray.600"}
              fontWeight="semibold"
            >
              Email
            </FormLabel>
            <Box
              bg={email ? "blue.800" : "gray.800"}
              borderRadius="full"
              boxShadow={email ? "md" : "none"}
              cursor="pointer"
              onClick={() => handleSwitchChange("email")}
            >
              <Switch
                id="email"
                size={"sm"}
                pl={1}
                pr={1}
                colorScheme="blue.800"
                isChecked={email}
                onChange={() => handleSwitchChange("email")}
              />
            </Box>
          </HStack>
          {qrCodeImage && (
            <Flex>
              <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Modal Title</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Image src={qrCodeImage} alt="Dan Abramov" />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Flex>
          )}
          <HStack spacing={1} alignItems="center">
            <FormLabel
              htmlFor="sms"
              mb={0}
              color={sms ? "purple.600" : "gray.600"}
              fontWeight="semibold"
            >
              SMS
            </FormLabel>
            <Box
              bg={sms ? "purple.800" : "gray.800"}
              borderRadius="full"
              boxShadow={sms ? "md" : "none"}
              cursor="pointer"
              onClick={() => handleSwitchChange("sms")}
            >
              <Switch
                id="sms"
                size={"sm"}
                pl={1}
                pr={1}
                colorScheme="purple.800"
                isChecked={sms}
                onChange={() => handleSwitchChange("sms")}
              />
            </Box>
          </HStack>
        </Stack>
        <InputGroup>
          <Input
            value={messageBody}
            placeholder="New Message"
            disabled={loading}
            resize="none"
            _focus={{
              boxShadow: "none",
              border: "1px solid",
              borderColor: "whiteAlpha.300",
            }}
            size="md"
            onChange={(event) => {
              setMessageBody(event.target.value);
            }}
          />
          {loading && (
            <InputRightElement>
              <Spinner size="sm" color="gray.500" />
            </InputRightElement>
          )}
        </InputGroup>
      </form>
    </Box>
  );
};

export default MessageInput;
