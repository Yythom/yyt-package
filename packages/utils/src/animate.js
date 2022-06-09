import BezierEasing from 'bezier-easing'

const defaultEasing = BezierEasing(0.25, 0.1, 0.25, 1.0)
// requestAnimationFrame 来自 window 所以不支持 ssr
// easing 配合`bezier-easing`使用

/**
 *
 * @param {value => {}} update 动画执行函数
 * @param {Number} duration  ms
 * @param {easing()} easing from bezier-easing
 * @returns
 */
export const animate = (update, duration = 300, easing = defaultEasing) => {
    return new Promise(resolve => {
        let startTime

        function step(timestamp) {
            if (startTime === undefined) startTime = timestamp

            const elapsed = timestamp - startTime

            const value = Math.min(1, elapsed / duration)

            update(easing ? easing(value) : value)

            value < 1 ? requestAnimationFrame(step) : resolve()
        }

        requestAnimationFrame(step)
    })
}
