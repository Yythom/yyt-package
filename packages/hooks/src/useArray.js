import { useCallback, useRef, useState } from 'react'

export function useArray(initialArray = []) {
    const initialArrayRef = useRef(initialArray)

    const [array, updateArray] = useState(initialArray)

    const add = newItem => updateArray(oldArray => oldArray.concat(newItem))

    const safeAdd = useCallback(
        newItem => !array.includes(newItem) && add(newItem),
        [array],
    )

    const remove = target => {
        const filterFn = typeof target === 'function' ? target : item => item === target

        updateArray(oldArray => oldArray.filter((...params) => !filterFn(...params)))
    }

    const removeAt = targetIndex => remove((_, index) => index === targetIndex)

    const toggle = useCallback(
        target => (array.includes(target) ? remove(target) : add(target)),
        [array],
    )

    const reset = newArray => {
        initialArrayRef.current = newArray || initialArrayRef.current
        updateArray(initialArrayRef.current)
    }

    const clear = _ => updateArray([])

    return {
        array, add, safeAdd, toggle, remove, removeAt, reset, clear,
    }
}
