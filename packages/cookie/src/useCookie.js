import { useCallback, useState, useContext } from 'react'
import { CookieContext } from './CookieProvider'

export function useUCookie(name) {
    const manager = useContext(CookieContext)

    if (!manager) {
        throw new Error('Missing <CookiesProvider>')
    }

    const [value, setValue] = useState(() => {
        return manager.get(name) || null
    })

    const updateCookie = useCallback((newValue, options) => {
        manager.set(name, newValue, options)
        setValue(newValue)
    }, [name])

    const deleteCookie = useCallback(options => {
        manager.remove(name, options)
        setValue(null)
    }, [name])

    return [value, updateCookie, deleteCookie]
}
