import { Stack, Button, Text } from '@chakra-ui/react';
import React from 'react';


type HeaderProps = {
};

const Header:React.FC<HeaderProps> = () => {
    
    return (
        <Stack
          direction="row"
          align="center"
          spacing={6}
          py={5}
          px={{ base: 4, md: 0 }}
          borderBottom="1px solid"
          borderColor="whiteAlpha.200"
        >
          {/* {loading && <SkeletonLoader count={1} height="30px" width="320px" />} */}
            <Stack direction="row">
              <Text fontWeight={600}>
                Caution:
                </Text>
              <Text color="whiteAlpha.600">
                SMS Service is Paid, So usage is Limited for now.
              </Text>
            </Stack>
        </Stack>
      );
}
export default Header;