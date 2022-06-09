import React from 'react'

export const FlushEffectsContext = React.createContext(null)

export function useFlushEffects(callbacks) {
    const flushEffectsImpl = React.useContext(FlushEffectsContext)

    if (flushEffectsImpl) {
        return flushEffectsImpl(callbacks)
    }

    // client side nothing happen or
    // throw new Error(`useFlushEffects cannot be called on the client`)
}
