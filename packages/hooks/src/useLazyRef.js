import { useRef } from 'react'

export default function useLazyRef(initializer) {
    const ref = useRef(undefined)

    if (ref.current === undefined) {
        ref.current = initializer()
    }

    return ref
}
