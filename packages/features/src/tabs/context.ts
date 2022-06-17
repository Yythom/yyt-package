import React from 'react'

type TabContextType = {
    navInfos?: Record<string, any>
    parentClass?: string
    index: number
    move: Function
    lineXYW?: number[]
}
const TabContext = React.createContext<TabContextType>({
    navInfos: {},
    index: 0,
    move: () => { },
    parentClass: '',
    lineXYW: [0, 0],
})

export default TabContext
