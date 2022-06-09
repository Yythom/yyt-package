import * as React from 'react'

export type ReactRef<T> =
    | React.Ref<T>
    | React.MutableRefObject<T>

/**
 * Assigns a value to a ref function or object
 *
 * @param ref the ref to assign to
 * @param value the value
 */
export function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
    if (ref == null) return

    if (typeof ref === 'function') {
        ref(value)
        return
    }

    try {
        // @ts-ignore
        ref.current = value
    } catch (error) {
        throw new Error(`Cannot assign value '${value}' to ref '${ref}'`)
    }
}

/**
 * Combine multiple React refs into a single ref function.
 * This is used mostly when you need to allow consumers forward refs to
 * internal components
 *
 * @param refs refs to assign to value to
 */
export function mergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
    return (node: T | null) => {
        refs.forEach(ref => assignRef(ref, node))
    }
}

/**
 * Passes or assigns a value to multiple refs (typically a DOM node). Useful for
 * dealing with components that need an explicit ref for DOM calculations but
 * also forwards refs assigned by an app.
 *
 * @param refs Refs to fork
 */
export function useMergeRefs<T = any>(...refs: (ReactRef<T> | undefined)[]) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useCallback(mergeRefs(...refs), [refs])
}
