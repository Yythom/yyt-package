/* eslint-disable react/jsx-no-useless-fragment */
import React, {
    createContext,
    Fragment,
    memo, useContext, useRef, useState,
} from 'react'
import Portals from 'yyt-portal'

const MoveBoxContext = createContext<any>(null)
/**
  <MoveBox>
     <MoveTigger>
        这是一段文字
     </MoveTigger>
     <MoveSquare>
        content
     </MoveSquare>
  </MoveBox>
 */
const MoveBox = memo((props: any) => {
    const creatAt = useRef(new Date().valueOf())
    const [show, setShow] = useState(false)

    return (
        <div
            onMouseEnter={() => setShow(true)}
            onMouseMove={e => {
                if (!show) return
                const X = e.clientX
                const Y = e.clientY
                const ele = document.getElementById(creatAt.current as any)
                ele.style.top = Y + 30 + 'px'
                ele.style.left = X - ele.clientWidth / 2 + 'px'
            }}
            onMouseLeave={() => setShow(false)}
            style={{
                width: 'max-content',
                height: 'max-content',
                cursor: 'inherit',
                ...props.style,
            }}
        >
            <MoveBoxContext.Provider value={{ creatAt: creatAt.current, show }}>
                {props.children}
            </MoveBoxContext.Provider>
        </div>
    )
})

const MoveSquare = memo((props: any) => {
    const ctx = useContext(MoveBoxContext)

    return (
        <>
            {
                ctx.show &&
                <Portals>
                    <div
                        id={ctx.creatAt}
                        style={
                            {
                                width: 'max-content',
                                height: 'max-content',
                                position: 'fixed',
                                background: '#fff',
                                borderRadius: '4px',
                                padding: '15px 30px',
                                boxShadow: '0 2px 5px 0 rgb(135 152 164 / 50%)',
                                ...props.style,
                            }
                        }
                    >
                        <div
                            style={{
                                border: '12px solid',
                                borderColor: 'transparent transparent #fff transparent',
                                position: 'absolute',
                                top: '-23px',
                                left: '50%',
                                borderRadius: '2px',
                                transform: 'translateX(-50%)',
                                filter: 'drop-shadow(1px -2px 2px rgba(0, 0, 0, .1))',
                            }}

                        />
                        {props.children}
                    </div>
                </Portals>
            }
        </>
    )
})

export {
    MoveBox,
    MoveSquare,
}
