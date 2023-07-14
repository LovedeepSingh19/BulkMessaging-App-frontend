import { Box, Flex, Stack } from "@chakra-ui/react";
import MessageItem from "./MessageItem";
import SkeletonLoader from "../../Common/SkeletonLoader";
import { SendMessageVariables } from "@/util/types";

interface MessagesProps {
  messages: Array<SendMessageVariables>
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {

  return (
    <Flex direction="column" justify="flex-end" overflow="hidden">
        {/* <Stack spacing={4} px={4}>
          <SkeletonLoader count={4} height="60px" />
        </Stack> */}
        <Flex direction="column-reverse" overflowY="scroll" height="100%">
        {messages.sort((a, b) => b.timeStamp - a.timeStamp).map((message: SendMessageVariables) => {
        return (
          <MessageItem key={message._id} message={message}/>

        );
      })}
        </Flex>
    </Flex>
  );
};

export default Messages;