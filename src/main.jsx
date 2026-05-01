import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LeadProvider } from "./context/LeadContext.jsx";
import Leads from "./pages/Leads.jsx";
import LeadManagement from "./pages/LeadManagement.jsx";
import AddLeadForm from "./pages/AddLeadForm.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LeadProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/leads/:leadId" element={<LeadManagement/>}/>
        <Route path="/addleadform" element={<AddLeadForm/>}/>
      </Routes>
    </LeadProvider>
  </BrowserRouter>,
);
