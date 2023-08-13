import { GetSearchedUser } from "@/util/types";
import { Box, Icon, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { Dispatch, SetStateAction } from "react";
import { BiSolidHelpCircle } from "react-icons/bi";
import SkeletonLoader from "../../Common/SkeletonLoader";
import ConversationList from "../../Conversations/ConversationList";

type HeaderProps = {
  session: Session;
  items: Array<GetSearchedUser>;
  onDeleteitem: (id: string) => Promise<void>;
  helpIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ session, items, onDeleteitem, helpIsOpen }) => {
  return (
    <>
      <Box
        display={{ base: "flex", sm: "none" }}
        width={{ base: "100%", md: "430px" }}
        flexDirection="column"
        bg="whiteAlpha.50"
        gap={4}
        pt={0}
        pb={4}
        px={3}
      >
        <>
          <Stack direction={"row"}></Stack>

          {!items ? (
            <SkeletonLoader count={11} height={"100%"} />
          ) : (
            <ConversationList
              session={session}
              items={items}
              onDeleteitem={onDeleteitem}
            />
          )}
        </>
      </Box>
      <Stack
        direction="row"
        display={{ base: "none", sm: "flex" }}
        align="center"
        justify={'space-between'}
        spacing={6}
        py={5}
        ml={4}
        mr={4}
        px={{ base: 4, md: 0 }}
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
      >
        {/* {loading && <SkeletonLoader count={1} height="30px" width="320px" />} */}
        <Stack justify={'space-between'} direction="row">
          <Text fontWeight={600} pr={2}>Caution:</Text>
          <Text color="whiteAlpha.600">
            SMS Service is Paid, So usage is Limited for now.
          </Text>
        </Stack>
          <Icon onClick={() => helpIsOpen(true)} as={BiSolidHelpCircle} />
      </Stack>
    </>
  );
};
export default Header;
