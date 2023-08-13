import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Header from "./Messages/Header";
import MessageInput from "./Messages/Input";
import Messages from "./Messages/Messages";
import { GetSearchedUser, SendMessageVariables } from "@/util/types";
import axios from "axios";

interface FeedWrapperProps {
  session: Session;
  items: Array<GetSearchedUser>;
  onDeleteitem: (id: string) => Promise<void>;
  helpIsOpen: Dispatch<SetStateAction<boolean>>;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({
  session,
  items,
  onDeleteitem,
  helpIsOpen,
}) => {
  const [messages, setMessages] = useState(Array<SendMessageVariables>);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${apiUrl}/fetchMessages`, {
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
    <Flex display={"flex"} width="100%" direction="column">
      <>
        <Flex
          direction="column"
          justify="space-between"
          overflow="hidden"
          flexGrow={1}
        >
          <Header
            session={session}
            items={items}
            onDeleteitem={onDeleteitem}
            helpIsOpen={helpIsOpen}
          />
          <Messages messages={messages} />
        </Flex>
        <MessageInput
          session={session}
          setMessages={setMessages}
          messages={messages}
        />
      </>
    </Flex>
  );
};
export default FeedWrapper;
