
const express = require('express');
const router = express();
router.use(express.json());


const Menu = require('../models/menu.js');
const MenuItem = require('../models/menuItem.js');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async (req, res) => {
    try{
        let matchingItems = await MenuItem.findAll({
            attributes: ['Name', 'MenuID'],
            where: {
                Name: {[Op.substring]: req.query.menuItemName}
            }
        })
        let menus = await matchingItems.map((mi) => Menu.findAll({
                where: {
                    MenuID: mi.MenuID
                }

            }));
        res.status(200).send(menus)
    } catch (error){
        res.status(400).send(error);
    }
/*
    try {
         let menus = await Menu.findAll ({
            include: [{
                model: MenuItems,
                //required: true,
                where: {
                    [Op.and]: [{Name: {[Op.substring]: req.query.menuItemName}}, {MenuID: Menu.MenuID}]
                }
            }]
        });
        // menus should be a set of unique menus. Yoy have to prune the array.
        res.status(200).send(menus)
    } catch (error) {
        res.status(400).send(error);
    }

 */
});


module.exports = router;



/*
SELECT Name, description, tags
FROM Menu
WHERE MenuID ==(SELECT MenuID
                FROM MenuItem
                WHERE Name = req.query.menuItemName)
 */
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


/*
        const menus = Sequelize.query('SELECT WHERE "Menu"."MenuID" = (SELECT "MenuID" FROM "MenuItem" WHERE "MenuItem"."Name" = (:menuItemName))',
            {
                replacements: {menuItemName: req.query.menuItemName}
            },
            {
                model: [Menu, MenuItems]
            },
            { type:
                Sequelize.QueryTypes.SELECT
            });
          /*
        const matchingItems = await MenuItems.findAll({
            where: {
                [Op.substring]: req.query.menuItemName
            }
        });
        menus = await matchingItems.map((mi) => Menu.findAll({
            where: {
                //[Op.and]: [{MenuID: {[Op.eq]: mi.MenuID}}]
                MenuID: mi.MenuID
                // [Op.and: [{MenuID: mi.MenuID}]]
            }
        }));
         */