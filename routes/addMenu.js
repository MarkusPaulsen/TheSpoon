const express = require('express');
const router = express();
router.use(express.json());

const Owner = require('../models/owner.js');

const auth = require('../middleware/authorizationMiddleware.js');

router.post('/', auth, async (req, res) => {
    //check if the username is a restaurant owner's username
    const owner = await Owner.findAll({
        where: {
            Username: req.body.username
        }
    });
    if (owner.length <= 0) res.status(401).send('Access denied');
    else {

    }
});

module.exports = router;