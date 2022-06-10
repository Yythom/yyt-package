import React, { useState } from 'react'
import Portals from 'yyt-portal'
import { Editor } from '../src'

export const Demo = () => {
    const [pos, setPos] = useState<any>('top-center')

    return (
        <div>
            <Editor placeholder="dadwalkdnlk" option={{ minHeight: 1000 }} />
        </div>
    )
}
export default {
    title: 'editor',
}
