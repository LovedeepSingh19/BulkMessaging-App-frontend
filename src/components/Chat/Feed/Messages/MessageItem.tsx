import { SendMessageVariables } from "@/util/types";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { color } from "framer-motion";
import React, { useState } from "react";

interface MessageItemProps {
  message: SendMessageVariables
}

const MessageItem: React.FC<MessageItemProps> = ({message}) => {

  const currentTime = new Date();
let hours = currentTime.getHours();
const minutes = currentTime.getMinutes();
const seconds = currentTime.getSeconds();
let meridiem = "AM";

if (hours >= 12) {
  meridiem = "PM";
  if (hours > 12) {
    hours -= 12;
  }
}

const formatRelativeLocale = {
  lastWeek: "eeee 'at' p",
  yesterday: "'Yesterday at' p",
  today: "p",
  other: "MM/dd/yy",
};

    return (
        <Stack
          direction="row"
          p={4}
          spacing={4}
          _hover={{ bg: "whiteAlpha.200" }}
          justify={"flex-end"}
          wordBreak="break-word"
        >

          <Stack spacing={1} width="100%">
            <Stack
              direction="row"
              align="center"
              justify={"flex-end"}
            >

              <Text fontSize={12} color="whiteAlpha.700">
              {formatRelative(message.timeStamp, Date.now(), {
              locale: {
                ...enUS,
                formatRelative: (token) =>
                  formatRelativeLocale[
                    token as keyof typeof formatRelativeLocale
                  ],
              },})}
                {/* // {`Now: ${hours}:${minutes}:${seconds}`} */}
              </Text>
            </Stack>
            <Flex justify={"flex-end"}>
              <Box
                bg={"brand.100"}
                px={2}
                py={1}
                borderRadius={12}
                maxWidth="65%"
              >
                <Text>{message.body}</Text>
              </Box>
            </Flex>
            <Stack
              direction="row"
              align="center"
              justify={"flex-end"}
            >
              <Stack direction={'row'}>
            {message.whatsApp && <Text color={'green.400'} fontSize={10}>WA</Text>}
            {message.email && <Text color={'blue.400'} fontSize={10}>EM</Text>}
            {message.sms && <Text color={'purple.400'} fontSize={10}>sms</Text>}
              </Stack>
          </Stack>
          </Stack>
        </Stack>
      );
};
export default MessageItem;
