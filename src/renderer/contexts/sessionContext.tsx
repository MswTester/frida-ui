import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface SessionContextProps {
    scanlist: Address[];
    setScanlist: Dispatch<SetStateAction<Address[]>>;
    scanHistory: Address[][];
    setScanHistory: Dispatch<SetStateAction<Address[][]>>;
    addresslist: Address[];
    setAddresslist: Dispatch<SetStateAction<Address[]>>;
    scanRange: string;
    setScanRange: Dispatch<SetStateAction<string>>;
    ranges: RangeDetails[];
    setRanges: Dispatch<SetStateAction<RangeDetails[]>>;
    modules: Module[];
    setModules: Dispatch<SetStateAction<Module[]>>;
    selectedRanges: number[];
    setSelectedRanges: Dispatch<SetStateAction<number[]>>;
    selectedModules: number[];
    setSelectedModules: Dispatch<SetStateAction<number[]>>;
    viewCurrent: string;
    setViewCurrent: Dispatch<SetStateAction<string>>;
    viewType: string;
    setViewType: Dispatch<SetStateAction<string>>;
}

const SessionContext = createContext<SessionContextProps|undefined>(undefined);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [scanlist, setScanlist] = useState<Address[]>([]);
    const [scanHistory, setScanHistory] = useState<Address[][]>([]);
    const [addresslist, setAddresslist] = useState<Address[]>([]);
    const [scanRange, setScanRange] = useState<string>('range');
    const [ranges, setRanges] = useState<RangeDetails[]>([]);
    const [modules, setModules] = useState<Module[]>([]);
    const [selectedRanges, setSelectedRanges] = useState<number[]>([]);
    const [selectedModules, setSelectedModules] = useState<number[]>([]);
    const [viewCurrent, setViewCurrent] = useState<string>('');
    const [viewType, setViewType] = useState<string>('');

    useEffect(() => {
        const init = async () => {
            setRanges(await window.API.getRanges());
            setModules(await window.API.getModules());
        };
        init();
    }, []);

    return (
        <SessionContext.Provider value={{
            scanlist, setScanlist, addresslist, setAddresslist,
            scanHistory, setScanHistory, scanRange, setScanRange,
            ranges, setRanges, modules, setModules,
            selectedRanges, setSelectedRanges, selectedModules, setSelectedModules,
            viewCurrent, setViewCurrent, viewType, setViewType
        }}>
            {children}
        </SessionContext.Provider>
    );
}

const useSession = () => {
    const context = useContext(SessionContext);

    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }

    return context;
}

export { SessionProvider, useSession };