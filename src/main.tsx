import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TimerSettingsProvider } from "./context/TimerSettingsProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TimerSettingsProvider>
      <App />
    </TimerSettingsProvider>
  </StrictMode>
);
