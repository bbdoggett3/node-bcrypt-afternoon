module.exports = {
    dragonTreasure: async(req,res) => {
        const db= req.app.get('db')

        const dragonTreasure = await db.get_dragon_treasure(1)
        return res.status(200).send(dragonTreasure);
    },

    getUserTreasure: async(req,res) => {
        const db = req.app.get('db');

        const userTreasure = await db.get_user_treasure([req.session.user.id])
        return res.status(200).send(userTreasure);
    }

}