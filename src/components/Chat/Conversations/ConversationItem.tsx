import {
    Avatar,
    Button,
    Flex,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
import { GetSearchedUser } from "@/util/types";
  
  
  interface ConversationItemProps {
    userId: string;
    item: GetSearchedUser;
    onDeleteitem: (id: string) => void;
  }
  
  const ConversationItem: React.FC<ConversationItemProps> = ({
    userId,
    item,
    onDeleteitem,
  }) => {
    const [menuOpen, setMenuOpen] = useState(false);
  
    const handleClick = (event: React.MouseEvent) => {
      if (event.type === "contextmenu") {
        event.preventDefault();
        setMenuOpen(true);
      }
    };

  
    return (
      <Stack
        direction="row"
        align="center"
        justify="space-between"
        mb={1}
        p={4}
        borderRadius={4}
        bg={ "whiteAlpha.200"}
        // : "none"
        _hover={{ bg: "whiteAlpha.200" }}
        onClick={handleClick}
        onContextMenu={handleClick}
        position="relative"
      >
        <Avatar size={"sm"} />
        <Flex justify="space-between" width="80%" height="100%">
          <Flex direction="column" width="70%" height="100%">
            <Text
            fontSize={15}
              fontWeight={400}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
                {item.username}
            </Text>
          </Flex>
          <Button size={"xs"} onClick={() => onDeleteitem(item.email)}>-</Button>
        </Flex>
      </Stack>
    );
  };
  export default ConversationItem;