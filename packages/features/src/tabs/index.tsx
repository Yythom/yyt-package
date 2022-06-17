/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    Fragment, useEffect, useLayoutEffect, useRef, useState,
} from 'react'
import TabContext from './context'
import { getRect, getRects } from './utils/getRect'
import './init.css'
/*
<Tabs>
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
    <Tab>Three</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
 */

const Tabs = ({ children }) => {
    const ref = useRef(new Date().valueOf())
    const [lineXYW, setLineXYW] = useState([0, 0, 0])
    const [index, setIndex] = useState(0)
    useLayoutEffect(() => {
        move(0)
    }, [])

    function move(index: number) {
        const { rect: parent, scrollXY } = getRect(ref.current)
        const navInfos = getRects('.tab_item')
        const navInfo = navInfos[index]
        console.log(parent, scrollXY)

        const x = navInfo.left - parent.left + scrollXY[0]
        setLineXYW([x, 0, navInfo.width])
        setIndex(index)
    }

    return (
        <TabContext.Provider value={{
            parentClass: `${ref.current}`,
            index,
            move,
            lineXYW,
        }}
        >
            {children}
        </TabContext.Provider>
    )
}
const TabList = ({ children }) => {
    const ctx = React.useContext(TabContext)

    return (
        <div
            className="nav "
            id={ctx.parentClass}
            style={{
                position: 'relative', width: '100%', overflow: 'scroll', whiteSpace: 'nowrap',
            }}
        >
            {
                children.map((Ele, index) => {
                    return Ele.type === TabLine ?
                        Ele :
                        React.cloneElement(Ele, { index, active: index === ctx.index, key: index })
                })
            }
        </div>
    )
}

const Tab = ({ children, index = null, active = false }) => {
    const ctx = React.useContext(TabContext)

    return (
        <div
            className="tab_item"
            style={{
                display: 'inline-block',
                color: active ? 'red' : 'black',
                transition: '300ms',
            }}
            onClick={() => { ctx.move(index) }}
        >
            {children}
        </div>
    )
}
const TabLine = () => {
    const { lineXYW, index } = React.useContext(TabContext)
    return <div
        style={{
            minWidth: lineXYW[2] + 'px',
            height: '4px',
            background: 'red',
            borderRadius: '50px',
            position: 'absolute',
            transition: '300ms',
            left: lineXYW[0],
            bottom: 0,
        }}
    />
}

export default Tabs
export {
    TabList,
    Tab,
    TabLine,
}
