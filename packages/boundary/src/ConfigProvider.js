import React, { useContext } from 'react'

const DEFAULT_CONFIG = {
    pendingFallback: null,
    FallbackComponent: ({ error, resetErrorBoundary }) => null,
    onError: (error, info) => { },
}

const Context = React.createContext(DEFAULT_CONFIG)

export function BoundaryConfigProvider({
    children, pendingFallback, FallbackComponent, onError,
}) {
    const config = React.useMemo(() => ({
        pendingFallback,
        FallbackComponent,
        onError,
    }), [pendingFallback, FallbackComponent, onError])

    return (
        <Context.Provider value={config}>
            {children}
        </Context.Provider>
    )
}

export const useBoundaryConfig = () => useContext(Context)
