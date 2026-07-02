import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "@fontsource-variable/shantell-sans";
import "@fontsource-variable/fredoka";

import "./styles/reset.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
