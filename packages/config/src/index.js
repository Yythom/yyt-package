import React, { createContext, useContext } from 'react'

export const AppConfigContext = createContext({})

export const useConfig = () => useContext(AppConfigContext)

export function AppConfigProvider({ children, config }) {
    return (
        <AppConfigContext.Provider value={config}>
            {children}
        </AppConfigContext.Provider>
    )
}
