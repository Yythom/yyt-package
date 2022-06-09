import Cookies from 'js-cookie'

export class ClientManager {
    get(name) {
        return Cookies.get(name)
    }

    set(name, value = '', options = {}) {
        return Cookies.set(name, value, options)
    }

    remove(name, options) {
        return Cookies.remove(name, options)
    }
}
