import React, { useState } from 'react'
import { ErrorBoundary } from 'yyt-hooks/src'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MoveBox, MoveSquare } from '../src'
import OssUpload from '../src/oss/oss_upload'
import SendQuery from './query'
import Tabs, { Tab, TabLine, TabList } from '../src/tabs'

const queryClient = new QueryClient()
export const Demo = () => {
    const [pos, setPos] = useState<any>('top-center')

    return (
        <div style={{ paddingLeft: '100px' }}>
            {/*
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
            <OssUpload /> */}

            <div style={{ width: '150px' }}>
                <Tabs>
                    <TabList>
                        <Tab><div style={{ padding: '20px' }}>One</div></Tab>
                        <Tab><div style={{ padding: '20px' }}>Two</div></Tab>
                        <Tab><div style={{ padding: '20px' }}>three</div></Tab>
                        <TabLine />
                    </TabList>

                </Tabs>
            </div>
        </div>
    )
}
export default {
    title: 'features',
}
