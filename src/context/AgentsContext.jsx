import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../useFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AgentsContext = createContext();

export function AgentsProvider({ children }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [agentsState, setAgentsState] = useState([]);
  
  const navigation = useNavigate();
  const hostedUrl = "https://crm-backend-tawny.vercel.app";

  // Fetch agents
  const { data, loading: fetchLoading, error: fetchError } = useFetch(`${hostedUrl}/agents`);

  // Update agents when data is fetched
  useEffect(() => {
    if (data?.data) {
      setAgentsState(data.data);
    }
  }, [data]);

  const displayAgents = agentsState.length > 0 ? agentsState : (data?.data || []);

  // Create new agent
  const formNewAgent = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name.trim()) {
      toast.error("Agent name is required");
      return;
    }
    if (!email.trim()) {
      toast.error("Agent email is required");
      return;
    }
    if (!email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
    };

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${hostedUrl}/agents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Agent added successfully");
        
        // Update local state
        setAgentsState(prev => [...prev, result.data]);
        
        // Reset form
        setName("");
        setEmail("");
        
        navigation("/leads");
      } else {
        toast.error(result.message || "Failed to add agent");
        setError(result.message);
      }
    } catch (error) {
      console.error("Error adding agent:", error);
      toast.error(error.message || "Something went wrong");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete agent
  const deleteListByAgent = async (agentName) => {
    if (!agentName) {
      toast.error("Agent name is required");
      return;
    }

    // Confirm deletion
    if (!window.confirm(`Are you sure you want to delete agent "${agentName}"?`)) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${hostedUrl}/agents/${encodeURIComponent(agentName)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(`Agent "${agentName}" deleted successfully`);
        
        // Update local state
        setAgentsState(prev => prev.filter(agent => agent.name !== agentName));
      } else {
        const result = await res.json();
        toast.error(result.message || "Failed to delete agent");
        setError(result.message);
      }
    } catch (error) {
      console.error("Error deleting agent:", error);
      toast.error(error.message || "Something went wrong");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AgentsContext.Provider
      value={{
        // State
        agents: displayAgents,
        loading: loading || fetchLoading,
        error: error || fetchError,
        
        // Form states
        name,
        setName,
        email,
        setEmail,
        
        // Functions
        formNewAgent,
        deleteListByAgent,
      }}
    >
      {children}
    </AgentsContext.Provider>
  );
}

export function useAgents() {
  const context = useContext(AgentsContext);

  if (!context) {
    throw new Error("useAgents must be used within AgentsProvider");
  }

  return context;
}

export default AgentsContext;