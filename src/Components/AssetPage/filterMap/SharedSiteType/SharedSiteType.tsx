//@ts-nocheck
import React, { createContext, useContext, useState } from 'react';

// Create a context
const SharedContext = createContext();

// Create a provider component
export const SharedProvider = ({ children }) =>
{
    const [siteData, setSiteData] = useState({
        siteName: null,
        latitude: null,
        longitude: null,
        type:null
    });

    return (
        <SharedContext.Provider value={{ siteData, setSiteData }}>
            {children}
        </SharedContext.Provider>
    );
};

// Custom hook to use the context
export const useSharedContext = () => {
    return useContext(SharedContext);
};
