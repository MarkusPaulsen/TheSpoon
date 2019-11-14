const Owner = require('../models/owner.js');

module.exports = async (req, res, next) => {
    //check if the username is a restaurant owner's username
    const owner = await Owner.findAll({
        where: {
            Username: req.username
        }
    });
    if (owner.length <= 0) return res.status(401).send('Access denied');
    else next();
};