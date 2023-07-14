import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useState } from "react";
import ConversationModal from "./Modal/ConversationModal";
import ConversationItem from "./ConversationItem";
import { GetSearchedUser, SearchedUser } from "@/util/types";

interface ConversationListProps {
  session: Session;
  items: Array<GetSearchedUser>
  onDeleteitem: (id: string) => Promise<void>
}

const ConversationList: React.FC<ConversationListProps> = ({ session, items, onDeleteitem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Box width="100%" height={"90%"}>
      <Box
        py={2}
        px={4}
        mb={4}
        bg={"blackAlpha.300"}
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign={"center"} color={"whiteAlpha.800"} fontWeight={500}>
        Import Contacts
        </Text>
      </Box>
      <ConversationModal session={session} isOpen={isOpen} onClose={onClose} />
      <Flex direction={'column'} overflowY='scroll' maxHeight={'90%'}>
              {items.map((item: GetSearchedUser) => {
        return (
          <ConversationItem
            key={item.email}
            userId={session.user?.email as string}
            item={item}
            onDeleteitem={onDeleteitem}
          />
        );
      })}
  
      </Flex>

    </Box>
  );
};
export default ConversationList;
