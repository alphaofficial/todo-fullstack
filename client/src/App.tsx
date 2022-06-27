import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { DragEvent, useMemo } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import AppWrapper from "./layout";
import {
  useCreateItemMutation,
  useCreateStatusMutation,
  useRemoveStatusMutation,
  useStatusesQuery,
} from "./generated/graphql";
import { ERROR_TOAST, SUCCESS_TOAST } from "./constants";
import { GoTrashcan } from "react-icons/go";

function App() {
  const toast = useToast();
  const {
    data: statuses,
    loading: statusesLoading,
    refetch: refetchStatus,
  } = useStatusesQuery({
    notifyOnNetworkStatusChange: true,
  });

  const currentStatuses = useMemo(() => {
    return statuses?.statuses;
  }, [statuses]);

  console.log(currentStatuses);
  const [createStatus] = useCreateStatusMutation({
    onCompleted: () => {
      toast({ description: "Status created.", ...SUCCESS_TOAST });
    },
    onError: () => {
      toast({
        description: "There was an error creating status.",
        ...ERROR_TOAST,
      });
    },
  });

  const [createItem] = useCreateItemMutation({
    onCompleted: () => {
      toast({ description: "Item created.", ...SUCCESS_TOAST });
    },
    onError: () => {
      toast({
        description: "There was an error creating item.",
        ...ERROR_TOAST,
      });
    },
  });

  const [removeStatus] = useRemoveStatusMutation({
    onCompleted: () => {
      toast({ description: "Status deleted.", ...SUCCESS_TOAST });
    },
    onError: () => {
      toast({
        description: "There was an error deleting status.",
        ...ERROR_TOAST,
      });
    },
  });

  const addNewSection = async () => {
    const newStatus = {
      title: "New Section",
      todos: [],
    };
    console.log({ newStatus });
    await createStatus({ variables: { createStatusInput: newStatus } });
  };

  const addNewTodo = async (statusId: string) => {
    const newTodo = {
      title: "New Todo",
      status: statusId,
    };
    await createItem({ variables: { createItemInput: newTodo } });
    await refetchStatus();
  };

  const onDeleteStatus = async (statusId: string) => {
    await removeStatus({ variables: { id: statusId } });
    await refetchStatus();
  };

  const onDragStart = (
    e: DragEvent<HTMLDivElement>,
    id: string,
    statusId: string
  ) => {
    console.log("dragstart:", id);
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("currentSectionId", statusId);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>, statusId: string) => {
    console.log("dropArea", statusId);
    let id = e.dataTransfer.getData("id");
    let currentStatusId = e.dataTransfer.getData("currentStatusId");

    //find todo
    const item = currentStatuses
      ?.find((s) => s.id === currentStatusId)!
      .items?.find((t) => t.id === id);

    if (!!item) {
      item.status.id = statusId;

      const newStatus = currentStatuses?.map((s) => {
        if (s.id === currentStatusId) {
          const newItems = s.items?.filter((t) => t.id !== item.id);
          return { ...s, todos: newItems };
        } else if (s.id === statusId) {
          const _item = { ...item };
          _item.status.id = statusId;
          //@ts-ignore
          return { ...s, todos: [...s.items, item] };
        }
        return s;
      });
      console.log({ newStatus });
      // setSection(newStatus);
    }
  };

  return (
    <AppWrapper>
      {statusesLoading ? (
        <Box>
          <Text>Loading...</Text>
        </Box>
      ) : (
        <Flex
          direction="row"
          overflowX="scroll"
          overflowY="hidden"
          whiteSpace="nowrap"
          height="100vh"
        >
          {currentStatuses?.map?.((status) => (
            <Box
              sx={{
                "&:not(:first-child)": {
                  ml: "30px",
                },
                borderRadius: "8px",
              }}
              display="inline-block"
              key={status.id}
              minW="300px"
              maxW="300px"
              onDrop={(e) => onDrop(e, status.id)}
              onDragOver={onDragOver}
            >
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Heading as="h3" fontSize="2xl">
                    {status.title}
                  </Heading>
                </Box>
                <Box>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <IconButton
                      variant="ghost"
                      p={0}
                      aria-label="add-new-status"
                      onClick={addNewSection}
                    >
                      <RiAddCircleLine />
                    </IconButton>
                    <Box>
                      <Menu>
                        <MenuButton p={0} aria-label="more-options">
                          <BiDotsHorizontalRounded />
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() => onDeleteStatus(status.id)}
                            icon={<GoTrashcan />}
                            command="⌘T"
                          >
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Box>
                  </Stack>
                </Box>
              </Flex>
              <Box mt="30px">
                {status?.items?.map?.((item) => (
                  <Flex
                    direction="row"
                    justifyContent="space-between"
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
                    key={item.id}
                    padding={4}
                    draggable
                    onDragStart={(e) => onDragStart(e, item?.id, status?.id)}
                  >
                    <Box>
                      <Text noOfLines={1}>{item?.title}</Text>
                    </Box>
                    <Box>
                      <Menu>
                        <MenuButton p={0} aria-label="more-options">
                          <BiDotsHorizontalRounded />
                        </MenuButton>
                        <MenuList>
                          <MenuItem icon={<GoTrashcan />} command="⌘T">
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Box>
                  </Flex>
                ))}
              </Box>
              <Box mt="30px">
                <Button
                  variant="dashed"
                  w="100%"
                  onClick={() => addNewTodo(status?.id as string)}
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
      )}
    </AppWrapper>
  );
}

export default App;
