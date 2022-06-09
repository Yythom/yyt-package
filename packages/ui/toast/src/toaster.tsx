import { css, setup } from 'goober'
import * as React from 'react'
import { resolveValue, ToasterProps, ToastPosition } from './interface/types'
import { useToaster } from './core/use-toaster'
import { createRectRef, prefersReducedMotion } from './core/utils'
import { ToastBar } from './toast-bar'

setup(React.createElement)

const getPositionStyle = (
    position: ToastPosition,
    offset: number,
): React.CSSProperties => {
    const top = position.includes('top')
    const verticalStyle: React.CSSProperties = top ? { top: 0 } : { bottom: 0 }
    const horizontalStyle: React.CSSProperties = position.includes('center') ?
        {
            justifyContent: 'center',
        } :
        position.includes('right') ?
            {
                justifyContent: 'flex-end',
            } :
            {}
    return {
        left: 0,
        right: 0,
        display: 'flex',
        position: 'absolute',
        transition: prefersReducedMotion() ?
            undefined :
            'all 230ms cubic-bezier(.21,1.02,.73,1)',
        transform: `translateY(${offset * (top ? 1 : -1)}px)`,
        ...verticalStyle,
        ...horizontalStyle,
    }
}

const activeClass = css`
  > * {
    pointer-events: auto;
  }
`

const DEFAULT_OFFSET = 16

export const Toaster: React.FC<ToasterProps> = ({
    reverseOrder, // 是否反向
    position = 'top-center',
    toastOptions,
    gutter, // bar间距
    children,
    containerStyle,
    limit, // 屏幕最大出现数量
}) => {
    const { toasts, handlers } = useToaster(toastOptions, limit)

    return (
        <div
            style={{
                position: 'fixed',
                zIndex: 1700,
                top: '30vh',
                left: DEFAULT_OFFSET,
                right: DEFAULT_OFFSET,
                bottom: DEFAULT_OFFSET,
                pointerEvents: 'none',
                ...containerStyle,
            }}
            onMouseEnter={handlers.startPause}
            onMouseLeave={handlers.endPause}
        >
            {toasts.map(t => {
                const toastPosition = t.position || position
                const offset = handlers.calculateOffset(t, {
                    reverseOrder,
                    gutter,
                    defaultPosition: position,
                })

                const positionStyle = getPositionStyle(toastPosition, offset)

                const ref = t.height ?
                    undefined :
                    createRectRef(rect => {
                        handlers.updateHeight(t.id, rect.height)
                    })

                return (
                    <div
                        ref={ref}
                        className={t.visible ? activeClass : ''}
                        key={t.id}
                        style={positionStyle}
                    >
                        {t.type === 'custom' ? (
                            resolveValue(t.message, t)
                        ) : children ? (
                            children(t)
                        ) : (
                            <ToastBar toast={t} position={toastPosition} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
