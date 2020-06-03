module.exports = {
    usersOnly: (req, res, next) => {
        if(!req.session.user) {
            return res.status(401).send('Please log in')
        }
        next();
    },

    adminsOnly: (req, res, next) => {
        if(!req.session.user.is_admin) {
            res.status(404).send('You are not an admin')
        }
        next()
    }
}