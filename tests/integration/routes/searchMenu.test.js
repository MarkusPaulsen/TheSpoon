const request = require('supertest');

let server;
let app;
let menuIDToGet;
let menuItemID1;
let menuItemID2;

const http = require('http');
const db = require('../../../sequelizeSettings.js');

const Owner = require('../../../models/owner.js');
const Restaurant = require('../../../models/restaurant.js');
const Menu = require('../../../models/menu.js');
const MenuItem = require('../../../models/menuItem.js');
const TaggedMenu = require('../../../models/taggedMenu.js');

describe('/api/user/customer/menu', () => {

    //start the server before each test suite
    beforeEach( done => {
        app = require('../../../router.js');
        server = http.createServer(app);
        server.listen(done);
    });

    //close the server after each test suite, otherwise the port is still running
    afterEach( done => {
        server.close(done);
    });

    //close the db connection after all the tests
    afterAll (() => {
        db.close();
    });

    //test "Return data of a specific menu"
    describe('GET /:menuID', () => {

        const exec = async (menuID) => {
            return await request(app)
                .get('/api/user/customer/menu/' + menuID)
        };

        it('should send 404 if the menu with given menuID does not exist', async () => {
            const res = await exec(568);
            expect(res.status).toEqual(404);
        });
        it('should send exactly the data about the menu with given menuID, not another', async () => {
            await setDatabase();
            const res = await exec(menuIDToGet);
            await destroyEverything();
            expect(res.body).toEqual({
                restaurant: {
                    restaurantName: "restaurant name 1",
                    address: "address",
                    city: "city",
                    country: "country",
                    latitude: "4",
                    longitude: "2",
                    openingHours: [],
                },
                menuName: "menu name 1-1",
                description: "description",
                tags: [{color: "#FFBC8C", name: "Italian"}, {color: "#FFBC8C", name: "Mediterranean"}],
                menuRating: "4",
                menuItems: [{
                    menuItemID: menuItemID1,
                    name: "menu item name 1",
                    description: "description",
                    type: "type",
                    priceEuros: "5",
                    tags: null,
                    imageLink: "link",
                    rating: "3"
                },{
                    menuItemID: menuItemID2,
                    name: "menu item name 2",
                    description: "description",
                    type: "type",
                    priceEuros: "5",
                    tags: null,
                    imageLink: "link",
                    rating: "3"
                }]
            })
        })

    });

    //test "Return all the reviews of the menu item"
    describe('GET /:menuID/menuItem/:menuItemID/review', () => {

        const exec = async (menuID, menuItemID) => {
            return await request(app)
                .get('/api/user/customer/menu/' + menuID + '/menuItem/' + menuItemID + '/review')
        };

        it('should send 404 if the menu item of given menu is not found', async () => {
            await setDatabase();
            const res = await exec(menuIDToGet, menuItemID2+100);
            await destroyEverything();
            expect(res.status).toEqual(404);
        });

    })
});

async function setDatabase() {
    await Owner.create({
        Username: "random1_searchMenu",
        Password: "password",
        Name: "name",
        Surname: "surname",
        Email: "email1_searchMenu@mail.com"
    });

    await Owner.create({
        Username: "random2_searchMenu",
        Password: "password",
        Name: "name",
        Surname: "surname",
        Email: "email2_searchMenu@mail.com"
    });

    const restaurantCreated1 = await Restaurant.create({
        Owner: "random1_searchMenu",
        Name: "restaurant name 1",
        Address: "address",
        City: "city",
        Country: "country",
        Latitude: 4,
        Longitude: 2,
        ImageLink: "link"
    });

    const restaurantCreated2 = await Restaurant.create({
        Owner: "random2_searchMenu",
        Name: "restaurant name 2",
        Address: "address",
        City: "city",
        Country: "country",
        Latitude: 4,
        Longitude: 2,
        ImageLink: "link"
    });

    const menuCreated1 = await Menu.create({
        Restaurant_ID: restaurantCreated1.dataValues.Restaurant_ID,
        Name: "menu name 1-1",
        Description: "description",
        Rating: 4,
        Quality: 4,
        Service: 4,
        AveragePrice: 4
    });

    await Menu.create({
        Restaurant_ID: restaurantCreated1.dataValues.Restaurant_ID,
        Name: "menu name 1-2",
        Description: "description",
        Rating: 4,
        Quality: 4,
        Service: 4,
        AveragePrice: 4
    });

    await Menu.create({
        Restaurant_ID: restaurantCreated2.dataValues.Restaurant_ID,
        Name: "menu name 2-1",
        Description: "description",
        Rating: 4,
        Quality: 4,
        Service: 4,
        AveragePrice: 4
    });

    await TaggedMenu.create({
        Menu_ID: menuCreated1.dataValues.Menu_ID,
        Tag: "Italian"
    });

    await TaggedMenu.create({
        Menu_ID: menuCreated1.dataValues.Menu_ID,
        Tag: "Mediterranean"
    });

    const menuItemCreated1 = await MenuItem.create({
        Menu_ID: menuCreated1.dataValues.Menu_ID,
        Name: "menu item name 1",
        Description: "description",
        Price: 5,
        ImageLink: "link",
        Type: "type",
        Rating: 3
    });

    const menuItemCreated2 = await MenuItem.create({
        Menu_ID: menuCreated1.dataValues.Menu_ID,
        Name: "menu item name 2",
        Description: "description",
        Price: 5,
        ImageLink: "link",
        Type: "type",
        Rating: 3
    });

    menuIDToGet = menuCreated1.dataValues.Menu_ID;
    menuItemID1 = menuItemCreated1.dataValues.MI_ID;
    menuItemID2 = menuItemCreated2.dataValues.MI_ID;
}

async function destroyEverything() {
    await Owner.destroy({
        where: {
            Username: "random1_searchMenu",
        }
    });
    await Owner.destroy({
        where: {
            Username: "random2_searchMenu",
        }
    });
}