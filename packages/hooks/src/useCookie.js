import { useCallback, useState } from 'react'
import Cookies from 'js-cookie'

export function useCookie(cookieName) {
    const [value, setValue] = useState(() => Cookies.get(cookieName) || null)

    const updateCookie = useCallback((newValue, options) => {
        Cookies.set(cookieName, newValue, options)
        setValue(newValue)
    }, [cookieName])

    const deleteCookie = useCallback(options => {
        Cookies.remove(cookieName, options)
        setValue(null)
    }, [cookieName])

    return [value, updateCookie, deleteCookie]
}
