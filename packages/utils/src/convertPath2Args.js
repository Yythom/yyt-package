function parse(str, multi) {
    const urlMapping = {}

    str
        ?.match(/[a-zA-Z]+\d+/g)
        ?.forEach(paramString => {
            const symbol = paramString.replace(/([a-zA-Z]+)(\d+)/, '$1')
            const valueSymbol = paramString.replace(/([a-zA-Z]+)(\d+)/, '$2')

            if (multi[symbol]) {
                if (urlMapping[symbol] && !urlMapping[symbol].includes(valueSymbol)) {
                    urlMapping[symbol].push(valueSymbol)
                } else {
                    urlMapping[symbol] = [valueSymbol]
                }
            } else {
                urlMapping[symbol] = valueSymbol
            }
        })

    return urlMapping
}

// eslint-disable-next-line default-param-last
export function convertPath2Args(str = '', mapping) {
    const multiMapping = Object.keys(mapping).reduce((multiMap, field) => {
        const { multi, symbol } = mapping[field]
        multiMap[symbol] = multi
        return multiMap
    }, {})

    const urlMapping = parse(str, multiMapping)

    const params = {}

    Object.keys(mapping).forEach(field => {
        const { valueMap, symbol, default: defaultValue } = mapping[field]
        const valueSymbol = urlMapping[symbol]

        if (valueSymbol) {
            if (valueMap) {
                if (multiMapping[symbol]) {
                    params[field] = valueSymbol?.reduce?.((arr, el) => {
                        if (valueMap[el]) {
                            arr.push(valueMap[el])
                        }
                        return arr
                    }, [])
                } else {
                    params[field] = valueMap[valueSymbol]
                }

                // 如果没有设置valueMap，则代表是动态数字
            } else {
                params[field] = valueSymbol
            }
        } else if (defaultValue !== undefined) {
            params[field] = defaultValue
        }
    })

    return params
}
