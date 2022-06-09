import React from 'react'
import Context from './Context'

function resolveConstructor(ctor) {
    // 如果没有经过babel转换
    if (typeof ctor === 'function') {
        return {
            chunkName: () => undefined,
            importAsync: ctor,
        }
    }

    return ctor
}

export default function lazy(loadableConstructor) {
    const ctor = resolveConstructor(loadableConstructor)
    const Comp = React.lazy(ctor.importAsync)

    return function LazyComponent(props) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const __chunkExtractor = React.useContext(Context)

        // SSR期间收集依赖chunk
        if (__chunkExtractor && ctor.chunkName()) {
            __chunkExtractor.addChunk(ctor.chunkName())
        }

        return <Comp {...props} />
    }
}
