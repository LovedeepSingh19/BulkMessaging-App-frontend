import { GetSearchedUser } from "@/util/types";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ConversationItem from "./ConversationItem";
import ConversationModal from "./Modal/ConversationModal";

interface ConversationListProps {
  session: Session;
  items: Array<GetSearchedUser>;
  onDeleteitem: (id: string) => Promise<void>;
}

const ConversationList: React.FC<ConversationListProps> = ({
  session,
  items,
  onDeleteitem,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const isDesktop = useBreakpointValue({ base: false, sm: true });

  return (
    <Box width="100%" height={"78%"}>
      {isDesktop ? (
        <Box
          py={2}
          px={4}
          mb={4}
          bg={"blackAlpha.300"}
          borderRadius={4}
          cursor="pointer"
          onClick={onOpen}
        >
          <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
            Import Contacts
          </Text>
        </Box>
      ) : (
        <Stack direction={"row"} flexWrap={"initial"} justify={'space-evenly'} align={'center'} >
          <Stack pt={4} justify={'center'} align={'center'}>
          <Icon
            onClick={onOpen}
            as={AddIcon}
            cursor="pointer"
            bg={"blackAlpha.300"}
            p={2}
            boxSize={8}
            borderRadius={8}
            color="whiteAlpha.800"
            _hover={{}}
          />
          <Text fontSize={8}>Add</Text>
          </Stack>
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

          <Box>
            <Button
              borderRadius={12}
              bg={"red.900"}
              height={"6"}
              px={8}
              py={2}
              width="10%"
              fontSize={13}
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </Box>
        </Stack>
      )}
      <ConversationModal session={session} isOpen={isOpen} onClose={onClose} />
      {isDesktop ? (
        <Flex px={4} direction={"column"} overflowY="auto" maxHeight={"90%"}>
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
      ) : (
        // <Flex direction={"row"} overflowX="scroll" maxHeight={"90%"}>
          <Flex
            direction="row"
            mt={{ sm: 7, base: 3 }}
            // flexWrap="wrap"
            overflowX={items.length > 8 ? "auto" : "hidden"} flexWrap={items.length > 8 ?"unset":"wrap"}
            gap="10px"
          >
            <Divider />
            {items.map((item: GetSearchedUser) => (
              <Stack
                key={item.email}
                direction="row"
                align="center"
                bg="whiteAlpha.200"
                borderRadius={4}
                justifyContent={'center'}
                minW="100px"
                p={2}
                cursor="pointer"
                  onClick={() => onDeleteitem(item.email)}
              >
                <Text fontSize={12}>{item.username}</Text>
                <IoIosCloseCircleOutline
                  size={15}
                />
              </Stack>
            ))}
          </Flex>
      )}
    </Box>
  );
};
export default ConversationList;
