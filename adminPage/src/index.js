import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot() for React 18+
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>
);
