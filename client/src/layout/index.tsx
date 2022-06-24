import { Box, BoxProps, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";

const AppWrapper: FC<BoxProps> = ({ children }) => {
  return (
    <Box>
      <Flex
        w="100%"
        direction="row"
        px={8}
        py={1}
        sx={{
          bg: "primary.900",
        }}
      >
        <Box>
          <Heading fontSize="lg" color="white">
            TODO APP
          </Heading>
        </Box>
      </Flex>
      <Box p={8}>{children}</Box>
    </Box>
  );
};

export default AppWrapper;
