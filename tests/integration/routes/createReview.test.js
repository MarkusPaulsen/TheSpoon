const request = require('supertest');

let server;
let app;
let token;

const http = require('http');
const db = require('../../../sequelizeSettings.js');

const bcrypt = require('bcrypt');
const Customer = require('../../../models/customer.js');
const Owner = require('../../../models/owner.js');
const Restaurant = require('../../../models/restaurant.js');
const Menu = require('../../../models/menu.js');
const MenuItem = require('../../../models/menuItem.js');

describe('/api/user/customer/review/restaurant', () => {

    //start the server before each test suite
    beforeEach(done => {
        app = require('../../../router.js');
        server = http.createServer(app);
        server.listen(done);
    });

    //close the server after each test suite, otherwise the port is still running
    afterEach(done => {
        server.close(done);
    });

    //close the db connection after all the tests
    afterAll(() => {
        db.close();
    });

    //test "Return all the restaurants"
    describe('GET /', () => {

        const exec = async () => {
            return await request(app)
                .get('/api/user/customer/review/restaurant')
                .set('x-auth-token', token)
        };

        it('should return no restaurant if all the restaurant have no menus', async () => {
            await setDatabase();
            const res = await exec();
            await destroyEverything();
            expect(res.body).toEqual([]);
        });

        it('should return no restaurant if all the menus have no menu items', async () => {
            await setDatabase();
            const restaurantFound1 = await Restaurant.findAll({
               where: {
                   Name: "restaurant name 2"
               }
            });
            await Menu.create({
                Restaurant_ID: restaurantFound1[0].dataValues.Restaurant_ID,
                Name: "menu name 1",
                Description: "description",
                Rating: 4,
                Quality: 4,
                Service: 4,
                AveragePrice: 4
            });
            await Menu.create({
                Restaurant_ID: restaurantFound1[0].dataValues.Restaurant_ID,
                Name: "menu name 2",
                Description: "description",
                Rating: 4,
                Quality: 4,
                Service: 4,
                AveragePrice: 4
            });
            const restaurantFound2 = await Restaurant.findAll({
                where: {
                    Name: "restaurant name 3"
                }
            });
            await Menu.create({
                Restaurant_ID: restaurantFound2[0].dataValues.Restaurant_ID,
                Name: "menu name 3",
                Description: "description",
                Rating: 4,
                Quality: 4,
                Service: 4,
                AveragePrice: 4
            });

            const res = await exec();
            await destroyEverything();
            expect(res.body).toEqual([]);
        });

        it('should return only restaurant with at least one menu with at least one menu item', async () => {
            await setDatabase();
            const restaurantFound1 = await Restaurant.findAll({
                where: {
                    Name: "restaurant name 2"
                }
            });
            await Menu.create({
                Restaurant_ID: restaurantFound1[0].dataValues.Restaurant_ID,
                Name: "menu name 1",
                Description: "description",
                Rating: 4,
                Quality: 4,
                Service: 4,
                AveragePrice: 4
            });
            const menuCreated = await Menu.create({
                Restaurant_ID: restaurantFound1[0].dataValues.Restaurant_ID,
                Name: "menu name 2",
                Description: "description",
                Rating: 4,
                Quality: 4,
                Service: 4,
                AveragePrice: 4
            });
            const restaurantFound2 = await Restaurant.findAll({
                where: {
                    Name: "restaurant name 3"
                }
            });
            await Menu.create({
                Restaurant_ID: restaurantFound2[0].dataValues.Restaurant_ID,
                Name: "menu name 3",
                Description: "description",
                Rating: 4,
                Quality: 4,
                Service: 4,
                AveragePrice: 4
            });

            await MenuItem.create({
                Menu_ID: menuCreated.dataValues.Menu_ID,
                Name: "menu item name",
                Description: "description",
                Price: 5,
                ImageLink: "link",
                Type: "type",
                Rating: 3
            });

            const res = await exec();
            await destroyEverything();
            expect(res.body).toEqual([{name: "restaurant name 2", restaurantID: restaurantFound1[0].dataValues.Restaurant_ID}]);
        })
    });

    //test "Return all the menus of given restaurant"
    describe('GET /:restaurantID/menu', () => {

        const exec = async (restaurantID) => {
            return await request(app)
                .get('/api/user/customer/review/restaurant/' + restaurantID + '/menu')
                .set('x-auth-token', token)
        };

        it('should return all the menus of given restaurant, only those that have at lest a menu item', async () => {
            await setDatabase();
            const restaurantFound1 = await Restaurant.findAll({
                where: {
                    Name: "restaurant name 2"
                }
            });
            await Menu.create({
                Restaurant_ID: restaurantFound1[0].dataValues.Restaurant_ID,
                Name: "menu name 1",
                Description: "description",
                Rating: 4,
                Quality: 4,
                Service: 4,
                AveragePrice: 4
            });
            const menuCreated = await Menu.create({
                Restaurant_ID: restaurantFound1[0].dataValues.Restaurant_ID,
                Name: "menu name 2",
                Description: "description",
                Rating: 4,
                Quality: 4,
                Service: 4,
                AveragePrice: 4
            });
            const restaurantFound2 = await Restaurant.findAll({
                where: {
                    Name: "restaurant name 3"
                }
            });
            await Menu.create({
                Restaurant_ID: restaurantFound2[0].dataValues.Restaurant_ID,
                Name: "menu name 3",
                Description: "description",
                Rating: 4,
                Quality: 4,
                Service: 4,
                AveragePrice: 4
            });

            await MenuItem.create({
                Menu_ID: menuCreated.dataValues.Menu_ID,
                Name: "menu item name",
                Description: "description",
                Price: 5,
                ImageLink: "link",
                Type: "type",
                Rating: 3
            });

            const res = await exec(restaurantFound1[0].dataValues.Restaurant_ID);
            await destroyEverything();
            expect(res.body).toEqual([{name: "menu name 2", menuID: menuCreated.dataValues.Menu_ID}]);
        })
    });

    //test "Return all the menu items of given menu"
    describe('GET /:restaurantID/menu/:menuID/menuItem', () => {

        const exec = async (menuID) => {
            return await request(app)
                .get('/api/user/customer/review/restaurant/menu/' + menuID + '/menuItem')
                .set('x-auth-token', token)
        };

        it('should return 404 if the menu with given menuID does not exist', async () => {
            await setDatabase();
            //there are no menus in the database, so it should return 404
            const res = await exec(1);
            await destroyEverything();
            expect(res.status).toEqual(404);
        });
        it('should return all and only the menu items of the menu with given menuID', async () => {
            await setDatabase();
            const restaurantFound1 = await Restaurant.findAll({
                where: {
                    Name: "restaurant name 2"
                }
            });
            await Menu.create({
                Restaurant_ID: restaurantFound1[0].dataValues.Restaurant_ID,
                Name: "menu name 1",
                Description: "description",
                Rating: 4,
                Quality: 4,
                Service: 4,
                AveragePrice: 4
            });
            const menuCreated = await Menu.create({
                Restaurant_ID: restaurantFound1[0].dataValues.Restaurant_ID,
                Name: "menu name 2",
                Description: "description",
                Rating: 4,
                Quality: 4,
                Service: 4,
                AveragePrice: 4
            });
            const restaurantFound2 = await Restaurant.findAll({
                where: {
                    Name: "restaurant name 3"
                }
            });
            await Menu.create({
                Restaurant_ID: restaurantFound2[0].dataValues.Restaurant_ID,
                Name: "menu name 3",
                Description: "description",
                Rating: 4,
                Quality: 4,
                Service: 4,
                AveragePrice: 4
            });

            const menuItemCreated1 = await MenuItem.create({
                Menu_ID: menuCreated.dataValues.Menu_ID,
                Name: "menu item name 1",
                Description: "description",
                Price: 5,
                ImageLink: "link",
                Type: "type",
                Rating: 3
            });

            const menuItemCreated2 = await MenuItem.create({
                Menu_ID: menuCreated.dataValues.Menu_ID,
                Name: "menu item name 2",
                Description: "description",
                Price: 5,
                ImageLink: "link",
                Type: "type",
                Rating: 3
            });

            const res = await exec(menuCreated.dataValues.Menu_ID);
            await destroyEverything();
            expect(res.body).toEqual([
                {"name": "menu item name 1", "menuItemID": menuItemCreated1.dataValues.MI_ID},
                {"name": "menu item name 2", "menuItemID": menuItemCreated2.dataValues.MI_ID}
                ])

        })

    })

});

async function setDatabase(){
    //first of all, create the customer in the database
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash("123456", salt);

    await Customer.create({
        Username: "eImperiali_createReview",
        Email: "emilioimperiali_createReview@mail.com",
        Password: hashed
    });

    //then login to get the token
    const tokenObject = await request(app)
        .post('/api/user/login')
        .send({username: "eImperiali_createReview", password: "123456", isRestaurantOwner: false});
    token = tokenObject.body.token;

    //create some owners
    await Owner.create({
        Username: "random 1_createReview",
        Password: "password",
        Name: "name",
        Surname: "surname",
        Email: "email1_createReview@mail.com"
    });
    await Owner.create({
        Username: "random 2_createReview",
        Password: "password",
        Name: "name",
        Surname: "surname",
        Email: "email2_createReview@mail.com"
    });

    //create some restaurants
    await Restaurant.create({
        Owner: "random 1_createReview",
        Name: "restaurant name 1",
        Address: "address 1",
        City: "city 1",
        Country: "country 1",
        Latitude: 2,
        Longitude: 3,
        ImageLink: "link 1"
    });
    await Restaurant.create({
        Owner: "random 1_createReview",
        Name: "restaurant name 2",
        Address: "address 2",
        City: "city 2",
        Country: "country 2",
        Latitude: 2,
        Longitude: 3,
        ImageLink: "link 2"
    });
    await Restaurant.create({
        Owner: "random 2_createReview",
        Name: "restaurant name 3",
        Address: "address 3",
        City: "city 3",
        Country: "country 3",
        Latitude: 4,
        Longitude: 2,
        ImageLink: "link 3"
    });
}

async function destroyEverything(){
    await Customer.destroy({
        where: {
            Username: "eImperiali_createReview"}
    });
    await Owner.destroy({
        where: {
            Username: "random 1_createReview"
        }
    });
    await Owner.destroy({
        where: {
            Username: "random 2_createReview"
        }
    })
}