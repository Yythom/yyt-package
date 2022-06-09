import React from 'react'

export const DocumentContext = React.createContext({})

export const useDocumentContext = () => React.useContext(DocumentContext)

export function Html(props) {
    return (
        <html
            {...props}
        />
    )
}

export function Head({ children, ...props }) {
    const { helmet } = useDocumentContext()

    // const registeredKeys = Object.keys(cache.registered).map(key => key.split('-').reverse().shift())
    // const globalKeys = difference(
    //     Object.keys(cache.inserted),
    //     registeredKeys
    // )

    return (
        <head {...props}>
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}

            {/* {globalKeys.map(globalKey => (
                <style
                    data-emotion={`${cache.key}-global ${globalKey}`}
                    key={globalKey}
                    nonce=""
                    dangerouslySetInnerHTML={{
                        __html: cache.inserted[globalKey]
                    }}
                />
            ))}

            <style
                data-emotion={`${cache.key} ${registeredKeys.join(' ')}`}
                nonce=""
                dangerouslySetInnerHTML={{
                    __html: registeredKeys.map(key => cache.inserted[key]).join('')
                }}
            /> */}
            {children}
            {/* preload script */}
            {/* {chunkExtractor.getLinkElements()} */}
            {/* <MetaData /> */}
        </head>
    )
}

export function Main() {
    return (
        <>
            <internal-content />
            {/* <RuntimeConfig />
            <ServerState /> */}
        </>
    )
}

// export function MetaData() {
//     const { runtimeConfig = {}, pathname } = useDocumentContext()
//     return (
//         <script
//             type="application/json"
//             id="__META_DATA__"
//             dangerouslySetInnerHTML={{
//                 __html: `${JSON.stringify({ runtimeConfig, pathname })}`,
//             }}
//         />
//     )
// }

// export function ServerState() {
//     const { initialState = {} } = useDocumentContext()

//     return (
//         <script
//             nonce=""
//             dangerouslySetInnerHTML={{
//                 __html: `window.__INITIAL_STATE__=${serialize({ ...initialState })}`
//             }}
//         />
//     )
// }

export function BootstrapScripts(props) {
    const { chunkExtractor } = useDocumentContext()

    return chunkExtractor.getScriptElements(props)
}

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <BootstrapScripts crossOrigin="anonymous" />
            </Head>
            <body>
                <Main />
                {/* <Scripts /> */}
            </body>
        </Html>
    )
}
