import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// const queryClient = new QueryClient();

// const root = ReactDOM.createRoot(document.getElementById("root")!);
// root.render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//       <ReactQueryDevtools />
//     </QueryClientProvider>
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
