function getRects(str: string) {
    const rectArr = []
    const doms = document.querySelectorAll(str)
    doms.forEach(dom => {
        rectArr.push(dom.getBoundingClientRect())
    })
    return rectArr
}

function getRect(str: any) {
    const dom: any = document.getElementById(str)
    const scrollXY = [dom.scrollLeft, dom.scrollTop]

    return {
        rect: dom!.getBoundingClientRect(),
        scrollXY,
    }
}

export {
    getRect,
    getRects,
}
