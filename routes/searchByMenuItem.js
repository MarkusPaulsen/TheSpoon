const express = require('express');
const router = express();
router.use(express.json());


const Menu = require('../models/menu');
const MenuItems = require('../models/menuItems');

//const Sequelize = require('sequelize');
//const Op = Sequelize.Op;


/*
router.get('/', async (req, res) => {
    const menuItems = await MenuItems.findAll({
        where: {
            [Op.substring]: req.body.menuItemName
        }
    });
    menuItems.map(mi => console.log(mi))
    const menus = await menuItems.map((mi) => Menu.findAll({
            where: {
                //[Op.and]: [{MenuID: {[Op.eq]: mi.MenuID}}]
                MenuID: mi.MenuID
                // [Op.and: [{MenuID: mi.MenuID}]]
            }
        }
    ));
    // menus should be a set of unique menus. Yoy have to prune the array.
    res.status(200).send(menus).catch(err => {
            console.log(err);
        });
});
*/

router.get('/', (req, res) => {
    console.log('hello world');
    res.status(200).send('almost there');
})
module.exports = router;



/*
SELECT Name, description, tags
FROM Menu
WHERE MenuID ==(SELECT MenuID
                FROM MenuItem)
/*
const _s0 = sequelize.dialect.QueryGenerator.selectQuery('MenuItem', {
attributes: [['MenuID', 'MenuID']],
where: {[Op.and]: [{Name: {[Op.eq]: req.body}}]},
}).slice(0,-1);
var _q = Menu;
_q.findAll({
attributes: [['Name', 'Name'],['description', 'description'],['tags', 'tags']],
where: {[Op.and]: [{MenuID: {[Op.eq]: Sequelize.literal('(' + _s0 + ')')}}]},
});
*/


/*
Sequalize.query('SELECT Name, Description, Tags FROM Menu WHERE MenuID = (SELECT MenuID FROM MenuItem)',
                {model: Menu, MenuItems});
*/
