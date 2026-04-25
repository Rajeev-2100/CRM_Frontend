import { createContext, useContext } from "react";
import useFetch from "../useFetch";

const LeadContext = createContext();

export function LeadProvider({ children }) {
  const { data } = useFetch(`http://localhost:3001/leads/`);
  const leads = data?.data;

  const { data: status } = useFetch(`http://localhost:3001/leads/status-count`)

  const leadStatus = status?.data
  console.log("Lead Status: ", leadStatus)

  return (
    <LeadContext.Provider value={{ leads, leadStatus }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLead() {
  const context = useContext(LeadContext);

  if (!context) {
    throw new Error("useLead must be used within LeadProvider");
  }

  return context;
}

export default LeadContext;