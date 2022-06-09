export { default as lazy } from './lazy'
export { default as Context } from './Context'
export { invariant } from './util'
const LOADABLE_REQUIRED_CHUNKS_KEY = '__LOADABLE_REQUIRED_CHUNKS__'

export function getRequiredChunkKey(namespace) {
    return `${namespace}${LOADABLE_REQUIRED_CHUNKS_KEY}`
}
