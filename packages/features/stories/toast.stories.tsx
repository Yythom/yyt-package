import React, { useState } from 'react'
import { ErrorBoundary } from 'yyt-hooks/src'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MoveBox, MoveSquare } from '../src'
import OssUpload from '../src/oss/oss_upload'
import SendQuery from './query'

const queryClient = new QueryClient()
export const Demo = () => {
    const [pos, setPos] = useState<any>('top-center')

    return (
        <div>

            <MoveBox>
                移入到此处
                <MoveSquare>1923890</MoveSquare>
            </MoveBox>
            <div>---</div>
            <QueryClientProvider client={queryClient}>
                <ErrorBoundary>
                    <SendQuery />
                </ErrorBoundary>
            </QueryClientProvider>

            <div>---</div>
            <OssUpload />
        </div>
    )
}
export default {
    title: 'features',
}
