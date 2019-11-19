
const express = require('express');
const router = express();
router.use(express.json());

const Menu = require('../models/menu.js');
const MenuItem = require('../models/menuItem.js');

router.get('/:menuID', async (req, res) => {
    try {

        let menuInfo = await Menu.findOne({
            attributes: ['Name', 'Description', 'Menu_ID'],
            where: {
                Menu_ID: req.params.menuID
            }
        });

        let dishes = await MenuItem.findAll({
            where: {
                Menu_ID: req.params.menuID
            }
        });
        res.status(200).send({menuInfo, dishes});
    } catch (error){
        res.status(400).send(error);
    }
});

module.exports = router;