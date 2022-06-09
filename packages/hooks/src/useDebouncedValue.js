import { useDebounce } from 'react-use'
import { useState } from 'react'

export function useDebounceValue(value, ms) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useDebounce(
        () => {
            setDebouncedValue(value)
        },
        ms,
        [value],
    )

    return debouncedValue
}
