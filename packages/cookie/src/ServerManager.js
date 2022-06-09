export class ServerManager {
    constructor(req, res) {
        this._req = req
        this._res = res
    }

    get(name) {
        return this._req.cookies[name]
    }

    set(name, value, options) {
        return this._res.cookie(name, value, options)
    }

    remove(name, options) {
        return this._res.clearCookie(name, options)
    }
}
