import React from 'react'
import { Context } from '@yyt/react-lazy'

function ChunkExtractorManager({ extractor, children }) {
    return (
        <Context.Provider value={extractor}>
            {children}
        </Context.Provider>
    )
}

export default ChunkExtractorManager
