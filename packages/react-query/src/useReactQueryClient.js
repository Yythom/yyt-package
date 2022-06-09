/**
 * React Query
 */
import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider as OriginalQueryClientProvider, hydrate } from 'react-query'
// 我们并不太在乎安全性，所以使用更快的non-secure generator
import { nanoid } from 'nanoid/non-secure'
import { useFlushEffects } from '@yyt/streaming'

const STREAMING_STATE_PREFIX = 'streaming_state'
// const HYDRATE_STATE_PREFIX = 'hydrate_state'
// We use the luck number 10 of messi in Barcelona ^_^
const LUCK_NUMBER_OF_MESSI = 10

function dehydrateQuery(query) {
    return {
        state: query.state,
        queryKey: query.queryKey,
        queryHash: query.queryHash,
    }
}

function generateRandomId(prefix = '') {
    return `${prefix}_${nanoid(LUCK_NUMBER_OF_MESSI)}`
    // return `${prefix || ''}_${(Math.random() * 1000000).toFixed()}`
}

export function useReactQueryClient(queryClientConfig, nonce) {
    const [queryClient] = useState(() => new QueryClient(queryClientConfig))

    // TODO: 如果一个query已经在客户端上发起，则不应该再用服务端的过时数据hydrate了
    // UPDATE: SOLVED above TODO: react-query 的hydrate会检测数据的dataUpdatedAt 旧的数据不会覆盖新的数据
    const flushEffect = () => {
        const queryClientCache = queryClient.getQueryCache().getAll()
        const readyQueries = queryClientCache.filter(query => query.state.status === 'success')
        const scripts = readyQueries.map(readyQuery => {
            const queryData = JSON.stringify({
                queries: [dehydrateQuery(readyQuery)],
            })

            // 1 清除已经成功并发送到客户端的state,避免重复hydrate
            // 2 防止queryCache过大占用服务端内存
            // 3 React-Query v4在服务端已经将cacheTime设置为Infinity防止内存占用过大
            // See: https://react-query.tanstack.com/guides/ssr#high-memory-consumption-on-server
            queryClient.removeQueries(readyQuery.queryKey, { exact: true })

            const id = generateRandomId(STREAMING_STATE_PREFIX)

            return (
                <React.Fragment key={id}>
                    <script
                        id={id}
                        {...(nonce === undefined ? {} : { nonce })}
                        dangerouslySetInnerHTML={{
                            __html: `(function() {var __state = ${queryData};window.__INITIAL_STATE__ = window.__INITIAL_STATE__ || [];window.__INITIAL_STATE__.push(__state);window.__hydrate_state__ && window.__hydrate_state__(__state);})()`,
                        }}
                    />
                    {/*
                         Bug fix
                         ** important **
                         不能使用application/json，当下面的WithReactQueryClient中useEffect执行的时候，我们无法保证一个完整的application/json类型的script标签被flush到客户端了，这样可能会导致获取到的json不完整
                     */}
                    {/* <script
                         id={id}
                         type="application/json"
                         dangerouslySetInnerHTML={{
                             __html: queryData
                         }}
                     />
                     <script
                         {...( nonce === undefined ? {} : { nonce } )}
                         id={hydrateId}
                         dangerouslySetInnerHTML={{
                             __html: `var state = JSON.parse(document.getElementById('${id}').textContent);window.__hydrate_state__ && window.__hydrate_state__(state);`
                         }}
                     /> */}
                </React.Fragment>
            )
        })

        return scripts
    }

    function WithReactQueryClient({ children }) {
        // client hydrate
        useEffect(() => {
            window.__hydrate_state__ = state => hydrate(queryClient, state)
            const __INITIAL_STATE__ = window.__INITIAL_STATE__ || []
            __INITIAL_STATE__.forEach(state => hydrate(queryClient, state))
            // const scriptNodes = Array.from(document.querySelectorAll(`script[id^="${STREAMING_STATE_PREFIX}"]`)) || []
            // scriptNodes.forEach(script => {
            //     try {
            //         hydrate(queryClient, JSON.parse(script.textContent))
            //     } catch(e) {}
            // })
            return () => {
                window.__hydrate_state__ = undefined
            }
        }, [])

        return (
            <OriginalQueryClientProvider client={queryClient}>
                {children}
            </OriginalQueryClientProvider>
        )
    }

    return [flushEffect, WithReactQueryClient]
}

export function QueryClientProvider({ children, nonce, queryClientOptions }) {
    const [flushEffect, WithReactQueryClient] = useReactQueryClient(queryClientOptions, nonce)

    useFlushEffects([flushEffect])

    return (
        <WithReactQueryClient>
            {children}
        </WithReactQueryClient>
    )
}
