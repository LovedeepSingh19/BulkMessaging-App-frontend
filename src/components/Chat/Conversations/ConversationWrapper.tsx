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
}

const ConversationWrapper: React.FC<ConversationWrapperProps> = ({
  session,
}) => {
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (counter < 3) {
          const response = await axios.post(
            "http://localhost:8080/getcontacts",
            { uid: session.user?.email! },
            { headers: { "Content-Type": "application/json" } }
          );
          const data = response.data;
          setItems(data);
          console.log(items);
          setCounter((prevCounter) => prevCounter + 1); // Increment the counter
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, [counter]);

  // setTempItems(items)

  const onDeleteitem = async (id: string) => {
    console.log(id);
    try {
      const response = await axios.post("http://localhost:8080/delete", {
        uid: id,
      });
      const data = response.data;
      // setTempItems(data);
      const index = items.findIndex(
        (element: GetSearchedUser) => element.email === id
      );
      if (index !== -1) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
      }
    } catch (error) {
      console.error("Error Deleting items:", error);
    }
  };

  return (
    <Box
      display={"flex"}
      width={{ base: "100%", md: "430px" }}
      flexDirection="column"
      bg="whiteAlpha.50"
      gap={4}
      py={6}
      px={3}
    >
      <Box
  bg="whiteAlpha.50"
  borderRadius={8}
  >
<Text
  fontSize={"34"}
  fontWeight="bold"
  align={'center'}
  justifyContent={'center'}
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
