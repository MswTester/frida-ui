import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface GlobalContextProps {
    log: string[];
    setLog: Dispatch<SetStateAction<string[]>>;
    tab: string;
    setTab: Dispatch<SetStateAction<string>>;
    session: number|null;
}

const GlobalContext = createContext<GlobalContextProps|undefined>(undefined);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [log, setLog] = useState<string[]>([]);
    const [tab, setTab] = useState<string>('memory');
    const [session, setSession] = useState<number|null>(null); // session pid

    useEffect(() => {
        window.API.on('attach', (_e:any, pid: number) => setSession(pid))
        window.API.on('detach', (_e:any, pid: number) => setSession(null))
    }, [])

    return (
        <GlobalContext.Provider value={{ log, setLog, tab, setTab, session }}>
            {children}
        </GlobalContext.Provider>
    );
}

const useGlobal = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }

    return context;
}

export { GlobalProvider, useGlobal };