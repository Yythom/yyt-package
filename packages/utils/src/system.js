// from @chakra/utils
export function omit(object, keys) {
    const result = {}

    Object.keys(object).forEach(key => {
        if (keys.includes(key)) return
        result[key] = object[key]
    })

    return result
}

export function omitThemingProps(props) {
    return omit(props, ['styleConfig', 'size', 'variant', 'colorScheme'])
}
