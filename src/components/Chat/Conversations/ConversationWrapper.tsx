import { Box, Button, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import { Interface } from "readline";
import ConversationList from "./ConversationList";
import { signOut } from "next-auth/react";
import axios from "axios";
import SkeletonLoader from "../Common/SkeletonLoader";
import { GetSearchedUser } from "@/util/types";

interface ConversationWrapperProps {
  session: Session;
  items: Array<GetSearchedUser>;
  onDeleteitem: (id: string) => Promise<void>;
}

const ConversationWrapper: React.FC<ConversationWrapperProps> = ({
  session,
  items,
  onDeleteitem,
}) => {
  // setTempItems(items)

  return (
    <Box
      display={{ base: "none", sm: "flex" }}
      width={{ base: "100%", md: "430px" }}
      flexDirection="column"
      bg="whiteAlpha.50"
      gap={4}
      py={6}
      px={3}
    >
      <Box bg="whiteAlpha.50" borderRadius={8}>
        <Text
          fontSize={"34"}
          fontWeight="bold"
          align={"center"}
          justifyContent={"center"}
          fontStyle="italic"
          bgGradient="linear(to-r, #4FC0D0, #164B60)"
          backgroundClip="text"
          color="transparent"
          letterSpacing="wide"
        >
          SwiftLink
        </Text>
      </Box>

      {!items ? (
        <SkeletonLoader count={10} height={"100%"} />
      ) : (
        <ConversationList
          session={session}
          items={items}
          onDeleteitem={onDeleteitem}
        />
      )}
      <Box
        bottom={0}
        left={0}
        position={"relative"}
        width="100%"
        bg="#313131"
        px={8}
        py={6}
        zIndex={0}
      >
        <Button width="100%" onClick={() => signOut()}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};
export default ConversationWrapper;
