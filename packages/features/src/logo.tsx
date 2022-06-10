import React, { memo } from 'react'

export const Logo = memo((props: any) => {
    return (
        <div className="logo" style={{ fontSize: '24px', fontStyle: 'normal', cursor: 'pointer' }}>
            <a href={window.location.origin} style={{ color: 'inherit', fontSize: '45px' }}>
                {props.children || 'logo'}
            </a>
        </div>
    )
})
