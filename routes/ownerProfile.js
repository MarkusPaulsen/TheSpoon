const express = require('express');
const router = express();
router.use(express.json());

const auth = require('../middleware/authorizationMiddleware.js');
const isOwner = require('../middleware/checkIfOwnerMiddleware.js');

//Return profile data of the owner
router.get('/', auth, isOwner, async (req, res) => {

});

//Edit profile data of the owner
router.put('/', auth, isOwner, async (req, res) => {

});

//Delete profile of the owner
router.delete('/', auth, isOwner, async (req, res) => {

});

//Change password of the owner
router.put('/password', auth, isOwner, async (req, res) => {

});


module.exports = router;