import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchParams from "./Components/SearchParams";
import ReportContext from "./ReportContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const currentReport = useState(null);
  return (
    <div>
      <BrowserRouter>
        <ReportContext.Provider value={currentReport}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </QueryClientProvider>
        </ReportContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
