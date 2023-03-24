export default (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.sendStatus(403)
}