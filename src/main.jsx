import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import { CalendarProvider } from "./context/CalendarContext";

import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CalendarProvider>
      <App />
    </CalendarProvider>
  </StrictMode>
);