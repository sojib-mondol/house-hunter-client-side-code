import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { Toaster } from "react-hot-toast";

// Create a client for tanstack query
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
