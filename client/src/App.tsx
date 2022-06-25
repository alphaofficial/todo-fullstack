import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { DragEvent, useRef, useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import AppWrapper from "./layout";

interface Todo {
  id: number;
  title: string;
  sectionId: number;
  userId: number;
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
      { id: 1, title: "Todo 1", sectionId: 1, userId: 1 },
      { id: 2, title: "Todo 2", sectionId: 1, userId: 2 },
      { id: 3, title: "Todo 3", sectionId: 1, userId: 3 },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    todos: [
      {
        id: 4,
        title: "Lorem ipsum skdfajsdkfhajsd jkasdhv jbasdjbcka",
        sectionId: 2,
        userId: 1,
      },
      { id: 5, title: "Todo 5", sectionId: 2, userId: 2 },
      { id: 6, title: "Todo 6", sectionId: 2, userId: 3 },
    ],
  },
];
function App() {
  const [sections, setSection] = useState<TodoSection[]>(initialSections);
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  const addNewSection = () => {
    const newSection: TodoSection = {
      id: sections.length + 1,
      title: "New Section",
      todos: [],
    };
    setSection([...sections, newSection]);
  };

  const addNewTodo = (sectionId: number) => {
    const newTodo: Todo = {
      id: sections.find((s) => s.id === sectionId)!.todos.length + 1,
      title: "New Todo",
      sectionId,
      userId: 1,
    };
    const newSections = sections.map((s) => {
      if (s.id === sectionId) {
        return { ...s, todos: [...s.todos, newTodo] };
      }
      return s;
    });
    setSection(newSections);
  };

  const onDragStart = (
    e: DragEvent<HTMLDivElement>,
    id: number,
    sectionId: number
  ) => {
    console.log("dragstart:", id);
    e.dataTransfer.setData("id", id.toString());
    e.dataTransfer.setData("currentSectionId", sectionId.toString());
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>, sectionId: number) => {
    console.log("dropArea", sectionId);
    let id = e.dataTransfer.getData("id");
    let currentSectionId = e.dataTransfer.getData("currentSectionId");

    //find todo
    const todo = sections
      .find((s) => s.id === +currentSectionId)!
      .todos.find((t) => t.id === +id);

    if (!!todo) {
      todo.sectionId = sectionId;
      const newSections = sections.map((s) => {
        if (s.id === +currentSectionId) {
          const newTodos = s.todos.filter((t) => t.id !== todo.id);
          return { ...s, todos: newTodos };
        } else if (s.id === sectionId) {
          const item = { ...todo };
          item.sectionId = sectionId;
          return { ...s, todos: [...s.todos, todo] };
        }
        return s;
      });
      setSection(newSections);
    }
  };
  return (
    <AppWrapper>
      <Flex
        direction="row"
        overflowX="scroll"
        overflowY="hidden"
        whiteSpace="nowrap"
        height="100vh"
      >
        {sections?.map?.((section) => (
          <Box
            sx={{
              "&:not(:first-child)": {
                ml: "30px",
              },
              borderRadius: "8px",
            }}
            display="inline-block"
            key={section.id}
            minW="300px"
            maxW="300px"
            onDrop={(e) => onDrop(e, section.id)}
            onDragOver={onDragOver}
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
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconButton
                    variant="ghost"
                    p={0}
                    aria-label="add-new-section"
                    onClick={addNewSection}
                  >
                    <RiAddCircleLine />
                  </IconButton>
                  <Box>
                    <IconButton variant="ghost" p={0} aria-label="more-options">
                      <BiDotsHorizontalRounded />
                    </IconButton>
                  </Box>
                </Stack>
              </Box>
            </Flex>
            <Box mt="30px">
              {section.todos?.map?.((todo) => (
                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "gray.400",
                    "&:not(:first-child)": {
                      mt: "10px",
                    },
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "gray.100",
                    },
                  }}
                  key={todo.id}
                  padding={4}
                  draggable
                  onDragStart={(e) => onDragStart(e, todo.id, section.id)}
                >
                  <Text noOfLines={1}>{todo.title}</Text>
                </Box>
              ))}
            </Box>
            <Box mt="30px">
              <Button
                variant="dashed"
                w="100%"
                onClick={() => addNewTodo(section.id)}
              >
                <Stack spacing={2} direction="row" alignItems="center">
                  <RiAddCircleLine />
                  <Text>Add todo</Text>
                </Stack>
              </Button>
            </Box>
          </Box>
        ))}
      </Flex>
    </AppWrapper>
  );
}

export default App;
