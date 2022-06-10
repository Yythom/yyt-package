/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from 'react'

export function useSearch<T>(
    initSearch?: any,
    option?: {
        is_storage_cache_key?: string,
        callback: (key: T | keyof T, v?: any) => void
    },
): [T, (key: T | keyof T, v?: any) => void] {
    const [search, _setSearch] = useState<T>(initSearch)

    const setSearch = useCallback((key: T | keyof T, v?: any) => {
        if (typeof key === 'object') {
            _setSearch(key)
        } else {
            const c = JSON.parse(JSON.stringify(search || {}))
            c[key] = v
            _setSearch(c)
            option?.callback && option.callback(key, v)
            // if (option?.is_storage_cache_key) {
            //     Storage.setStorageSync(option.is_storage_cache_key, c)
            // }
        }
    }, [search, option])
    return [search, setSearch]
}
