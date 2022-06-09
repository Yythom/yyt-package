import React, { useMemo } from 'react'

const useCuttleList = (list, min, max) => {
    const maxList = useMemo(() => (Array.isArray(list) ? list.slice(0, max || list.length) : []), [max, list])
    const minList = useMemo(() => (Array.isArray(list) ? list.slice(0, min) : []), [min, list])
    const isCuttle = useMemo(() => minList.length !== maxList.length, [minList, maxList])

    return [minList, maxList, isCuttle]
}

export default useCuttleList
