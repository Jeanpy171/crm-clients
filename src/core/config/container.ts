import { HttpClient } from "../http/httpclient";
import { SessionLocalStorageAdapter } from "../storage/adapters/SessionLocalStorageAdapter";

export const initializateContainer = () => {
  const tokenStorage = new SessionLocalStorageAdapter();
  HttpClient.getInstance().setToken(
    tokenStorage.getToken() as unknown as string
  );
};
