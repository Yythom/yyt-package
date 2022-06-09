// from @chakra/utils
export function runIfFn(children, ...args) {
    if (typeof children === 'function') {
        return children(...args)
    }

    return children || null
}
