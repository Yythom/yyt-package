import * as React from 'react'
import { StoryFn, StoryContext } from "@storybook/addons"
import { withPerformance } from 'storybook-addon-performance'

const withProvider = (Story: StoryFn<any>, context: StoryContext) => {
    return (
        <React.StrictMode>
            <Story {...context} />
        </React.StrictMode>
    )
}

export const decorators = [withProvider, withPerformance]