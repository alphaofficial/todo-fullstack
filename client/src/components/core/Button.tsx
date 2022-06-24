import { Button as AppButton, ButtonProps } from "@chakra-ui/react";
import { FC } from "react";

const Button: FC<ButtonProps> = (props) => <AppButton {...props} />;

Button.defaultProps = {
  sx: {
    bg: "gray.50",
  },
};
