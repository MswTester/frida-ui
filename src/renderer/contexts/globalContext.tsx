import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface GlobalContextProps {
    log: string[];
    setLog: Dispatch<SetStateAction<string[]>>;
    tab: string;
    setTab: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<GlobalContextProps|undefined>(undefined);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [log, setLog] = useState<string[]>([]);
    const [tab, setTab] = useState<string>('process');

    return (
        <GlobalContext.Provider value={{ log, setLog, tab, setTab }}>
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