import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";
import UserContextProvider from "./context/UserContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
          <Toaster />
        </NextUIProvider>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
