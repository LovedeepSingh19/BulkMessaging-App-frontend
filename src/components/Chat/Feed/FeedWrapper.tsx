import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import Header from "./Messages/Header";
import MessageInput from "./Messages/Input";
import Messages from "./Messages/Messages";
import { SendMessageVariables } from "@/util/types";
import axios from "axios";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
const [messages, setMessages] = useState(Array<SendMessageVariables>);

useEffect(() => {
  const fetchMessages = async () => {
    try {
      const response = await axios.get("https://backend-bulk-message-app.vercel.app/fetchMessages", {
        params: {
          createdBy: session.user.email,
        },
      });
      const data = response.data;
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  if (session) {
    fetchMessages();
  }
}, [session]);

  return (
    <Flex
      display={"flex"}
      width="100%"
      direction="column"
    >
        <>
          <Flex
            direction="column"
            justify="space-between"
            overflow="hidden"
            flexGrow={1}
          >
            <Header/>
            <Messages messages={messages} />
          </Flex>
          <MessageInput session={session} setMessages={setMessages} messages={messages} />
        </>
    </Flex>
  );
};
export default FeedWrapper;
