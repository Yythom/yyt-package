/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { memo } from 'react'
import { useQuery } from 'yyt-hooks/src/useQuery'

const SendQuery = memo(() => {
    const [data, params, setParams, { fetch, fetchPage }] = useQuery<any, any>(
        async params => {
            console.log(params, 'send-params')
            return true
        },
        {
            initParams: {
                password: '7c222fb2927d828af22f592134e8932480637c0d',
                account: 'superadmin',
                page: 1,
            } as any,
        },
    )
    // const mutation = useMutation(postTodo, {
    //     onSuccess: () => {
    //       // Invalidate and refetch
    //       queryClient.invalidateQueries('todos')
    //     },
    //   })

    return (
        <div
            className="SendQuery"
            onClick={() => {
                // setParams({
                //     "password": "1",
                //     "account": "superadmin",
                // })
            }}
        >
            123123

            <button onClick={() => fetchPage()}>分页</button>
            <button onClick={() => fetchPage(10)}>第10</button>
        </div>
    )
})
export default SendQuery
