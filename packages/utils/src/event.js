// from @chakra/react-utils
export function composeEventHandlers(...fns) {
    return function func(event) {
        fns.some(fn => {
            fn?.(event)
            return event?.defaultPrevented
        })
    }
}
