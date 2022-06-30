import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { DragEvent, useMemo, useRef, useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { BiDotsHorizontalRounded, BiPencil } from "react-icons/bi";
import AppWrapper from "./layout";
import {
  useCreateItemMutation,
  useCreateStatusMutation,
  useRemoveItemMutation,
  useRemoveStatusMutation,
  useStatusesQuery,
  useUpdateItemMutation,
  useUpdateStatusMutation,
} from "./generated/graphql";
import { ERROR_TOAST, SUCCESS_TOAST } from "./constants";
import { GoTrashcan } from "react-icons/go";
import { BsCheck } from "react-icons/bs";
import { useDebouncedCallback } from "use-debounce";

interface EditingMeta {
  id?: string;
  type?: "item" | "status";
}

interface UpdateItemArgs {
  itemId: string;
  title?: string;
  statusId?: string;
}

interface UpdateStatusArgs {
  title?: string;
  statusId: string;
}

function App() {
  const toast = useToast();
  const statusContainerRef = useRef<any>(null);
  const statusInputRef = useRef<any>(null);
  const itemInputRef = useRef<any>(null);

  const {
    data: statuses,
    loading: statusesLoading,
    refetch: refetchStatus,
  } = useStatusesQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [editing, setEditing] = useState<EditingMeta>({});

  const currentStatuses = useMemo(() => {
    return statuses?.statuses;
  }, [statuses]);

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

  const [removeItem] = useRemoveItemMutation({
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

  const [updateStatus] = useUpdateStatusMutation({
    onCompleted: () => {
      toast({ description: "Status updated.", ...SUCCESS_TOAST });
    },
    onError: () => {
      toast({
        description: "There was an error updating status.",
        ...ERROR_TOAST,
      });
    },
  });

  const [updateItem] = useUpdateItemMutation({
    onCompleted: () => {
      toast({ description: "Item updated.", ...SUCCESS_TOAST });
    },
    onError: () => {
      toast({
        description: "There was an error updating item.",
        ...ERROR_TOAST,
      });
    },
  });

  const addNewSection = async () => {
    const newStatus = {
      title: "New Section",
    };
    await createStatus({ variables: { createStatusInput: newStatus } });
    await refetchStatus();
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

  const onDeleteItem = async (itemId: string) => {
    await removeItem({ variables: { id: itemId } });
    await refetchStatus();
  };

  const onUpdateItem = async ({ itemId, title, statusId }: UpdateItemArgs) => {
    await updateItem({
      variables: {
        updateItemInput: {
          id: itemId,
          ...(title && { title }),
          ...(statusId && { status: statusId }),
        },
      },
    });
    await refetchStatus();
    setEditing({});
  };

  const onUpdateStatus = async ({ statusId, title }: UpdateStatusArgs) => {
    await updateStatus({
      variables: {
        updateStatusInput: {
          id: statusId,
          ...(title && { title }),
        },
      },
    });
    await refetchStatus();
    setEditing({});
  };

  const onEditValueChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditing((prev) => ({ ...prev, value: e.target.value }));
    },
    1600
  );

  const onDragStart = (
    e: DragEvent<HTMLDivElement>,
    id: string,
    statusId: string
  ) => {
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("currentStatusId", statusId);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>, statusId: string) => {
    let id = e.dataTransfer.getData("id");
    let currentStatusId = e.dataTransfer.getData("currentStatusId");

    const item = currentStatuses
      ?.find((s) => s.id === currentStatusId)!
      .items?.find((t) => t.id === id);

    if (item) {
      onUpdateItem({
        itemId: id,
        statusId,
      });
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
              key={status.id}
              sx={{
                "&:not(:first-of-type)": {
                  ml: "30px",
                },
                borderRadius: "8px",
              }}
              display="inline-block"
              minW="300px"
              maxW="300px"
              onDrop={(e) => onDrop(e, status.id)}
              onDragOver={onDragOver}
            >
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                onDoubleClick={() =>
                  setEditing({ id: status.id, type: "status" })
                }
              >
                <Box ref={statusContainerRef}>
                  {editing?.id === status.id ? (
                    <Stack
                      bg="gray.100"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <Input
                        ref={statusInputRef}
                        fontSize="2xl"
                        fontWeight="bold"
                        variant="unstyled"
                        defaultValue={status.title}
                        onChange={onEditValueChange}
                      />
                      <IconButton
                        p={0}
                        variant="ghost"
                        aria-label="update-title"
                        sx={{
                          "&:hover": {
                            bg: "transparent",
                          },
                        }}
                        onClick={() =>
                          onUpdateStatus({
                            statusId: status.id,
                            title: statusInputRef.current?.value,
                          })
                        }
                      >
                        <Box bg="secondary.400" borderRadius={4}>
                          <BsCheck color="white" size={20} />
                        </Box>
                      </IconButton>
                    </Stack>
                  ) : (
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{
                        "& > div:last-child": {
                          display: "none",
                        },
                        "&:hover": {
                          cursor: "pointer",
                          "& > div:last-child": {
                            display: "block",
                          },
                        },
                      }}
                    >
                      <Tooltip label="Double click to edit" placement="top">
                        <Heading as="h3" fontSize="2xl">
                          {status.title}
                        </Heading>
                      </Tooltip>
                      <Box>
                        <BiPencil />
                      </Box>
                    </Stack>
                  )}
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
                    alignItems="center"
                    key={item.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, item?.id, status?.id)}
                    sx={{
                      border: "1px solid",
                      borderColor: "gray.400",
                      borderRadius: "8px",
                      "&:not(:first-of-type)": {
                        mt: "10px",
                      },
                      "&:hover": {
                        backgroundColor: "gray.100",
                      },
                    }}
                    paddingY={2}
                    paddingX={4}
                    onDoubleClick={(e) => {
                      e.preventDefault();
                      setEditing({ id: item.id, type: "item" });
                    }}
                  >
                    {editing?.id === item.id ? (
                      <Stack
                        bg="gray.100"
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        w="100%"
                      >
                        <Input
                          ref={itemInputRef}
                          variant="unstyled"
                          defaultValue={item.title}
                          onChange={onEditValueChange}
                        />
                        <IconButton
                          p={0}
                          variant="ghost"
                          aria-label="update-title"
                          sx={{
                            "&:hover": {
                              bg: "transparent",
                            },
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            onUpdateItem({
                              itemId: item.id,
                              title: itemInputRef.current?.value,
                            });
                          }}
                        >
                          <Box bg="secondary.400" borderRadius={4}>
                            <BsCheck color="white" size={20} />
                          </Box>
                        </IconButton>
                      </Stack>
                    ) : (
                      <>
                        <Box>
                          <Text noOfLines={1}>{item?.title}</Text>
                        </Box>
                        <Box>
                          <IconButton
                            aria-label="delete-item"
                            variant="ghost"
                            onClick={() => onDeleteItem(item.id)}
                          >
                            <GoTrashcan />
                          </IconButton>
                        </Box>
                      </>
                    )}
                  </Flex>
                ))}
              </Box>
              <Box mt="30px">
                <Button
                  variant="dashed"
                  bg="secondary.500"
                  color="white"
                  w="100%"
                  sx={{
                    "&:hover": {
                      bg: "secondary.400",
                    },
                  }}
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
