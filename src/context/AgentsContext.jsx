import { createContext, useContext } from "react";
import useFetch from "../useFetch";

const AgentsContext = createContext()

export function AgentsProvider ({children}){

    const { data } = useFetch('http://localhost:3001/agents')

    const agents = data?.data
    // console.log(agents)
    return (
        <>
            <AgentsContext.Provider value={{ agents }}>
                {children}
            </AgentsContext.Provider>
        </>
    )
}

export function useAgents (){
    const context = useContext(AgentsContext)

    if(context){
        throw new Error('useAgent must be used within AgentsProvider')
    }

    return context
}

export default AgentsContext