export function contains(parent, child) {
    if (!parent) return false
    return parent === child || parent.contains(child)
}
