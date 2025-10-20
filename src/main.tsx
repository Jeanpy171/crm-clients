import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HttpClient } from "./infrastructure/http/http-client";
import { LocalSessionStorage } from "./infrastructure/storage/LocalSessionStorage";
import { Provider } from "./infrastructure/providers/Provider";
import { Router } from "./presentation/routing/Router";

// ============ SESSION STORAGE ===============
const tokenStorage = new LocalSessionStorage();
HttpClient.getInstance().setToken(tokenStorage.getToken() as unknown as string);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <Router />
    </Provider>
  </StrictMode>
);
