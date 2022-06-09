import { useCallback, useMemo } from 'react'
import { useCookie } from 'react-use'

export function useSearchHistory(name, cookieOptions, max = 5) {
    const [value, updateCookie, deleteCookie] = useCookie(name)

    const searchHistory = useMemo(() => {
        let historyArray = []

        try {
            historyArray = JSON.parse(value) || []
        } catch (e) { }

        return historyArray
    }, [value])

    const add = useCallback(
        word => {
            word = word.trim()

            if (!word || searchHistory.includes(word)) {
                return
            }

            const newValue = [...searchHistory]

            newValue.unshift(word)

            newValue.length > max && newValue.pop()

            updateCookie(JSON.stringify(newValue), cookieOptions)
        },
        [searchHistory, max, cookieOptions],
    )

    const clear = useCallback(() => {
        deleteCookie()
    }, [])

    return {
        history: searchHistory,
        add,
        clear,
    }
}
