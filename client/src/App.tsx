import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { BiDotsHorizontalRounded } from "react-icons/bi";

interface Todo {
  id: number;
  title: string;
  sectionId: number;
}
interface TodoSection {
  id: number;
  title: string;
  todos: Todo[];
}

const initialSections: TodoSection[] = [
  {
    id: 1,
    title: "To do",
    todos: [
      { id: 1, title: "Todo 1", sectionId: 1 },
      { id: 2, title: "Todo 2", sectionId: 1 },
      { id: 3, title: "Todo 3", sectionId: 1 },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    todos: [
      { id: 4, title: "Todo 4", sectionId: 2 },
      { id: 5, title: "Todo 5", sectionId: 2 },
      { id: 6, title: "Todo 6", sectionId: 2 },
    ],
  },
];
function App() {
  const [sections] = useState<TodoSection[]>(initialSections);

  return (
    <Box p="8">
      <Box>
        <Heading as="h2">To do list</Heading>
        <Text>Add sections</Text>
      </Box>
      <Flex
        mt="20"
        direction="row"
        overflowX="scroll"
        overflowY="hidden"
        whiteSpace="nowrap"
      >
        {sections?.map?.((section) => (
          <Box
            sx={{
              "&:not(:first-child)": {
                ml: "30px",
              },
              // bg: "gray.100",
              padding: "10px",
              borderRadius: "8px",
            }}
            display="inline-block"
            key={section.id}
            width="300px"
          >
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Heading as="h3" fontSize="2xl">
                  {section.title}
                </Heading>
              </Box>
              <Box>
                <Stack direction="row" spacing={2}>
                  <Box>
                    <RiAddCircleLine />
                  </Box>
                  <Box>
                    <BiDotsHorizontalRounded />
                  </Box>
                </Stack>
              </Box>
            </Flex>
            <Box mt="30px">
              <Button variant="dashed" w="100%">
                <Stack spacing={2} direction="row" alignItems="center">
                  <RiAddCircleLine />
                  <Text>Add todo</Text>
                </Stack>
              </Button>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default App;
