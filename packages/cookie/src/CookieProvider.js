import React from 'react'

export const CookieContext = React.createContext(null)

export function CookieProvider({ children, manager }) {
    return (
        <CookieContext.Provider value={manager}>
            {children}
        </CookieContext.Provider>
    )
}
