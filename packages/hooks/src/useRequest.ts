/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { useSearch } from './useSearch'

export function useRequest<T, P = undefined>(
    promise: (data: any) => Promise<any>,
    option: {
        start_owner?: boolean, // 是否手动fetch
        callback?: (data: T) => void,
        failCallBack?: () => void,
        initParams?: Object,
        listen_params?: Object, // 监听模式需要控制变量useMemo
    },
): [
        T | undefined,
        (_params?: P) => Promise<void>,
        (key: P | keyof P, v?: any) => void,
        boolean,
        P | undefined,
    ] {
    const [ret, setRet] = useState<T>()
    const [loading, setloading] = useState<boolean>(false)
    const [params, setParams] = useSearch<P>(option.initParams, {
        callback: (k, v) => {
            if (k === 'page' || k === 'pageSize' || k === 'page_Size') {
                option.start_owner && fetch({ ...params, [k]: v })
            }
        },
    })
    const fetch = useCallback(async (_params?: P, noSetParams?: boolean) => {
        !loading && setloading(true)
        if (_params && !noSetParams) {
            setParams({ ..._params })
        }
        const res = await promise(_params || params)
        setloading(false)
        if (res) {
            setRet(res)
            option.callback && option.callback(res)
        } else option.failCallBack && option.failCallBack()
    }, [params, option?.listen_params])

    useEffect(() => {
        if (params && !option.start_owner && !option.listen_params) {
            fetch()
        }
    }, [params])

    useEffect(() => {
        // 监听模式需要控制变量useMemo
        if (option?.listen_params && !option.start_owner) fetch({ ...params, ...option?.listen_params }, true)
    }, [option?.listen_params, params])

    return [
        ret,
        fetch,
        setParams,
        loading,
        params,
    ]
}
