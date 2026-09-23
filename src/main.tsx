import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouteProvider } from "./route";
import { initUmami } from "./umami";

initUmami();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouteProvider>
      <App />
    </RouteProvider>
  </StrictMode>
);
