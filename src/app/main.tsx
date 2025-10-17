import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./router/Router";
import { initializateContainer } from "../core/config/container";
import { Provider } from "./providers/Provider";

initializateContainer();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <Router />
    </Provider>
  </StrictMode>
);
