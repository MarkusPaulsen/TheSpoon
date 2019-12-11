const express = require('express');
const router = express();
router.use(express.json());

const Tag = require('../models/tag.js');

const auth = require('../middleware/authorizationMiddleware.js');
const isOwner = require('../middleware/checkIfOwnerMiddleware.js');

//Return all the available tags
router.get('/', auth, isOwner, async (req, res) => {
    const tagsFound = await Tag.findAll();
    const numberOfTagsFound = tagsFound.length;

    //initialize empty response
    let tags = [];

    //format the response
    for (let i=0; i < numberOfTagsFound; i++){
        tags[i] = tagsFound[i].dataValues.Name;
    }

    res.status(200).send(tags);
});


module.exports = router;