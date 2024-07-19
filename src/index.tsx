import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/app/styles/index.scss";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary/ui/ErrorBoundary";
import { StoreProvider } from "@/app/providers/StorProvider";
import { App } from "@/app/app";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProviderUi } from './app/providers/SnackbarProvider/SnackbarProvider';

const container = document.getElementById("root");

if (!container) {
  throw new Error(
    "Контейнер root не найден. НЕ удалось вмонтировать реакт приложение"
  );
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <ErrorBoundary>
          <SnackbarProviderUi>
          <App />
          </SnackbarProviderUi>
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
