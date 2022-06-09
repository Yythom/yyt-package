import { ErrorBoundary as OriginalErrorBoundary } from 'react-error-boundary'
import React, { Suspense } from 'react'
import { QueryErrorResetBoundary } from 'react-query'
import { useBoundaryConfig } from './ConfigProvider'

export function ErrorBoundary({ children, ...props }) {
    const { FallbackComponent, onError } = useBoundaryConfig()

    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <OriginalErrorBoundary onReset={reset} FallbackComponent={FallbackComponent} onError={onError} {...props}>
                    {children}
                </OriginalErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    )
}

export function SuspenseBoundary(props) {
    const { pendingFallback } = useBoundaryConfig()

    return (
        <Suspense fallback={pendingFallback} {...props} />
    )
}
