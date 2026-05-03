import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import AgentsHeader from "../components/Header/AgentsHeader";
import { useContext } from "react";
import AgentsContext from "../context/AgentsContext";

const AgentsList = () => {
  const { agents } = useContext(AgentsContext);

  const date = new Date(agents);

  return (
    <>
      <AgentsHeader />
      <main className="py-0">
        <div className="d-flex flex-row">
          <div
            className="d-flex flex-column align-items-center py-4"
            style={{ width: "30%", height: "100%" }}
          >
            <h3>SideBar</h3>
            <hr className="bg-danger" />
            <Link
              className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              to={`/`}
            >
              <h5>Back to Dashboard</h5>
            </Link>
          </div>
          <div
            className="d-flex flex-column align-items-center bg-danger py-4 "
            style={{ width: "70%", marginBottom: "3.5rem" }}
          >
            <h3 className="fs-bold">Sales Agent List</h3>
            <hr />
            <table className="table px-4" style={{ borderSpacing: "8px" }}>
              <thead>
                <tr>
                  <th scope="col">Agent Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Date joined</th>
                </tr>
              </thead>
              {agents?.map((agent) => {
                const date = new Date(agent.createdAt);
                return (
                  <tbody>
                    <tr>
                      <td>{agent.name}</td>
                      <td>{agent.email}</td>
                      <td>{date.toLocaleString()}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
            <div className="d-grid gap-2">
              <Link to={`/addNewAgents`} className="btn btn-primary" type="button">
                Add new Agents
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AgentsList;
