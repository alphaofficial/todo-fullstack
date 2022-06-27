import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { Helmet } from "react-helmet";
import "@fontsource/source-sans-pro";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme";
import client from "./lib/apollo";
import { APP_NAME } from "./constants";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Helmet titleTemplate={`${APP_NAME} | %s`} />
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
