import type React from "react";
import { Provider as AuthProvider } from "react-redux";
import { store } from "../../core/store/store";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

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
