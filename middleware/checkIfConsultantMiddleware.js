const Consultant = require('../models/consultant.js');

module.exports = async (req, res, next) => {
    //check if the username is a consultant's username
    const consultant = await Consultant.findOne({
        where: {
            Username: req.username
        }
    });
    if (!consultant) return res.status(401).send('Access denied.');
    else {
        req.consultant = consultant;
        next();
    }
};