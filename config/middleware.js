export default (req, res, next) => {
    if (req.body.auth) {
        return next()
    }
    return res.sendStatus(403)
}