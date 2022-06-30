import { extendTheme } from "@chakra-ui/react";
import defaultTheme from "@chakra-ui/theme";
import { StyleFunctionProps } from "@chakra-ui/theme-tools";

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
  body: "Source Sans Pro",
  heading: "Source Sans Pro",
};

const components = {
  Button: {
    variants: {
      dashed: (props: StyleFunctionProps) => ({
        ...defaultTheme.components.Button.variants.solid(props),
        borderRadius: "8px",
        borderStyle: "dashed",
        borderWidth: "1px",
        borderColor: "secondary.800",
      }),
    },
  },
};

const theme = extendTheme({
  colors: {
    gray: {
      100: "#F5f5f5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    primary,
    secondary,
  },
  fonts,
  components,
});

export { theme, primary, secondary };
