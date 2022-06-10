/* eslint-disable react/no-unstable-nested-components */
import React, { memo } from 'react'
import { ErrorBoundary as Origin } from 'react-error-boundary'
import { QueryErrorResetBoundary } from 'react-query'

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}
const myErrorHandler = (error, info) => {
    console.log({
        error,
        info,
    }, 'error')
    // Do something with the error
    // E.g. log to an error logging client here
}

export const ErrorBoundary = memo((props: any) => (
    <QueryErrorResetBoundary>
        {/* <Origin FallbackComponent={ErrorFallback} onError={myErrorHandler}>
            {props.children}
        </Origin> */}
        {({ reset }) => (
            <Origin
                fallbackRender={({ error, resetErrorBoundary }) => (
                    <div>
                        There was an error!{' '}
                        <button onClick={() => resetErrorBoundary()}>Try again</button>
                        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
                    </div>
                )}
                onReset={reset}
            >
                {props.children}
                {/* <React.Suspense fallback={<h1>Loading projects...</h1>}>
                    {showProjects ? (
                        activeProject ? (
                            <Project
                                activeProject={activeProject}
                                setActiveProject={setActiveProject}
                            />
                        ) : (
                            <Projects setActiveProject={setActiveProject} />
                        )
                    ) : null}
                </React.Suspense> */}
            </Origin>
        )}

    </QueryErrorResetBoundary>
))
