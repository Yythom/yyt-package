import React, { useEffect, useState } from 'react'

// 输入法输入
const useComposition = elm => {
    const [composition, setComposition] = useState(false)

    useEffect(() => {
        const canObserve = elm && typeof elm.addEventListener === 'function'

        if (!canObserve) return

        const onCompostitionStart = () => setComposition(true)

        const onCompositionEnd = () => setComposition(false)

        if (canObserve) {
            elm.addEventListener('compositionstart', onCompostitionStart)
            elm.addEventListener('compositionend', onCompositionEnd)
        }

        return () => {
            if (canObserve) {
                elm.removeEventListener('compositionstart', onCompostitionStart)
                elm.removeEventListener('compositionend', onCompositionEnd)
            }
        }
    }, [elm])

    return composition
}

export default useComposition
