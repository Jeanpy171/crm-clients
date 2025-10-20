import type React from "react";
import { Provider as AuthProvider } from "react-redux";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { store } from "../store/store";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider store={store}>
      <HeroUIProvider>
        <ToastProvider />
        {children}
      </HeroUIProvider>
    </AuthProvider>
  );
};
