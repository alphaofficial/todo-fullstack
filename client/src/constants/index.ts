import { UseToastOptions } from "@chakra-ui/react";

export const APP_NAME = "TASK MANAGER";

export const SUCCESS_TOAST: UseToastOptions = {
  duration: 2000,
  isClosable: true,
  title: "Success!",
  status: "success",
  position: "bottom-right",
};

export const ERROR_TOAST: UseToastOptions = {
  duration: 2000,
  title: "Oops!",
  status: "error",
  isClosable: true,
  position: "bottom-right",
};
