/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const doc = window.document // 或者可以指定index.html里的元素,参照官方文档
// class Portals extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {};
//         (this as any).elem = doc.createElement('div')
//     }

//     componentDidMount() {
//         doc.body.appendChild((this as any).elem)
//     }

//     componentWillUnmount() {
//         doc.body.removeChild((this as any).elem)
//     }

//     render() {
//         return createPortal(<div>{(this as any).props.children}</div>, (this as any).elem)
//     }
// }

function Portals({ children }: any) {
    const ref = useRef(doc.createElement('div'))
    useEffect(() => {
        doc.body.appendChild(ref.current)
        return () => {
            doc.body.removeChild(ref.current)
        }
    }, [])
    const a = createPortal(<div>{children}</div>, ref.current)
    return <div>{a}</div>
}

export default Portals
