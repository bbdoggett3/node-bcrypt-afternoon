const bcrypt = require('bcryptjs');

module.exports = {
    register:  async(req, res, next) => {
        const {username, password, is_admin} = req.body
        const db = req.app.get('db')

        const result = await db.get_user([username])
        const existingUser = result[0]

        if(existingUser) {
            return res.status(409).send('Username taken')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const registeredUser = await db.register_user([is_admin, username, hash])
        const user = registeredUser[0]

        req.session.user = {
            is_admin: user.is_admin,
            username: user.username,
            id: user.id,
        }
        res.status(201).send(req.session.user)
    }
}