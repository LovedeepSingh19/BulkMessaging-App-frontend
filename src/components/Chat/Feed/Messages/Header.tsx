import { GetSearchedUser } from "@/util/types";
import { Box, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import React from "react";
import SkeletonLoader from "../../Common/SkeletonLoader";
import ConversationList from "../../Conversations/ConversationList";

type HeaderProps = {
  session: Session;
  items: Array<GetSearchedUser>;
  onDeleteitem: (id: string) => Promise<void>;
};

const Header: React.FC<HeaderProps> = ({ session, items, onDeleteitem }) => {
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
        spacing={6}
        py={5}
        px={{ base: 4, md: 0 }}
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
      >
        {/* {loading && <SkeletonLoader count={1} height="30px" width="320px" />} */}
        <Stack direction="row">
          <Text fontWeight={600}>Caution:</Text>
          <Text color="whiteAlpha.600">
            SMS Service is Paid, So usage is Limited for now.
          </Text>
        </Stack>
      </Stack>
    </>
  );
};
export default Header;
