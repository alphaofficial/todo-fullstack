import { extendTheme } from "@chakra-ui/react";

const primary = {
  50: "#e1f5fc",
  100: "#b4e6f8",
  200: "#84d5f3",
  300: "#56c5ee",
  400: "#36b8ec",
  500: "#1bacea",
  600: "#159edb",
  700: "#0c8bc8",
  800: "#0b7ab4",
  900: "#035a93",
};

const secondary = {
  50: "#f5e7e4",
  100: "#efc9b6",
  200: "#e6a687",
  300: "#dc8658",
  400: "#d56f34",
  500: "#cf5a0b",
  600: "#c65507",
  700: "#b94e04",
  800: "#ab4803",
  900: "#933c03",
};

const fonts = {
  body: "Source Sans Pro, sans-serif",
  heading: "Source Sans Pro, sans-serif",
};

const theme = extendTheme({
  colors: {
    primary,
    secondary,
  },
  fonts,
});

export { theme, primary, secondary };
