import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LeadProvider } from "./context/LeadContext.jsx";
import Leads from "./pages/Leads.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LeadProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/leads" element={<Leads />} />
      </Routes>
    </LeadProvider>
  </BrowserRouter>,
);
