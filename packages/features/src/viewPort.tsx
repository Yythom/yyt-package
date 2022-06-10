/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    memo, useMemo, useRef,
} from 'react'
import { useInViewport } from 'react-in-viewport'

export const ViewPort = memo((props: any) => {
    const ref = useRef<HTMLElement>(null)
    const {
        inViewport, // 是否在视窗
        enterCount, // 视窗显示的次数
        leaveCount, // 在视窗离开的次数
    } = useInViewport(
        ref as any,
        {},
        { disconnectOnLeave: false },
        props,
    )

    const getStyle = useMemo(() => {
        // Fade in only the first time we enter the viewport
        if (inViewport && enterCount === 1) {
            return { WebkitTransition: 'opacity 0.75s ease-in-out' }
        } if (!inViewport && enterCount < 1) {
            return { WebkitTransition: 'none', opacity: '0' }
        }
        return {}
    }, [inViewport])

    return (
        <section ref={ref} style={{ ...props.style }}>
            <div
                className="viewport-content"
                style={getStyle}
            >
                {enterCount >= 1 && <div style={{ display: inViewport ? 'block' : 'none' }}>{props?.children}</div>}
            </div>
        </section>
    )
})
