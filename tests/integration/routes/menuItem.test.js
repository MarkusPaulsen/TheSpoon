const request = require('supertest');

let server;
let app;
let token;
let menuIDToGet;
let menuItemID1;
let menuItemID2;

const http = require('http');
const db = require('../../../sequelizeSettings.js');
const bcrypt = require('bcrypt');

const Owner = require('../../../models/owner.js');
const Restaurant = require('../../../models/restaurant.js');
const Menu = require('../../../models/menu.js');
const MenuItem = require('../../../models/menuItem.js');
const TaggedMenu = require('../../../models/taggedMenu.js');

describe('/api/user/owner/restaurant/menu/{menuID}/menuItem', () => {

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
    afterAll (async done => {
        await db.close();
        done();
    });

    //test "create menu item"
    describe('POST /:menuID/menuItem', () => {

        const menuItemInvalid={
            "name": "Spaghetti Milanese",
            "description": "Fantastic italian dish made of spaghetti with tomato sauce",
            "type": "dish",
            "priceEuros": 15,
            "tags": [
                "Invalid",
                "Something"
            ],
            "imageID": 1573670733122
        };

        const menuItemValid= {
            "name": "Spaghetti Milanese",
            "description": "Fantastic italian dish made of spaghetti with tomato sauce",
            "type": "dish",
            "priceEuros": 15,
            "tags": [
                "Mediterranean",
                "Pasta",
                "Italian"
            ],
            "imageID": 1573670733122
        };

        const exec = async (menuID, menuItem) => {
            return await request(app)
                .post('/api/user/owner/restaurant/menu/' + menuID + '/menuItem')
                .set('x-auth-token', token)
                .send(menuItem)

        };

        it('should send 400 because tags are invalid', async (done) => {
            await setDatabase();


            const res = await exec(568, menuItemInvalid);
            await destroyEverything();
            expect(res.status).toEqual(400);
            done();
        });

        it('should return 200', async (done) => {
            await setDatabase();

            const res = await exec(menuIDToGet, menuItemValid);
            await destroyEverything();
            expect(res.status).toBe(200);
            done();
        })
    });

    //test "update menu item"
    describe('PUT /:menuID/menuItem/:menuItemID', () => {

        const menuItem= {
            "name": "Spaghetti Milanese",
            "description": "Fantastic italian dish made of spaghetti with tomato sauce",
            "type": "dish",
            "priceEuros": 145,
            "tags": [
                "Mediterranean",
                "Pasta",
                "Italian"
            ],
            "imageID": 1573670733122
        };

        const exec = async (menuID, menuItem, menuItemID) => {
            return await request(app)
                .put('/api/user/owner/restaurant/menu/' + menuID + '/menuItem/' + menuItemID)
                .set('x-auth-token', token)
                .send(menuItem)

        };

        it('should return 200', async (done) => {
            await setDatabase();

            const res = await exec(menuIDToGet, menuItem, menuItemID1);
            await destroyEverything();
            expect(res.status).toBe(200);
            done();
        })
    });

    //test "delete menu item"
    describe('DELETE /:menuID/menuItem/:menuItemID', () => {

        const exec = async (menuID, menuItemID) => {
            return await request(app)
                .delete('/api/user/owner/restaurant/menu/' + menuID + '/menuItem/' + menuItemID)
                .set('x-auth-token', token)

        };

        it('should return 200', async (done) => {
            await setDatabase();

            const res = await exec(menuIDToGet, menuItemID1);
            await destroyEverything();
            expect(res.status).toBe(200);
            done();
        })
    });
});

async function setDatabase() {
    //first of all, create the owner in the database
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash("123456", salt);

    await Owner.create({
        Username: "random1_menuItem",
        Password: hashed,
        Name: "name",
        Surname: "surname",
        Email: "email1_menuItem@mail.com"
    });

    await Owner.create({
        Username: "random2_menuItem",
        Password: hashed,
        Name: "name",
        Surname: "surname",
        Email: "email2_menuItem@mail.com"
    });

    const restaurantCreated1 = await Restaurant.create({
        Owner: "random1_menuItem",
        Name: "restaurant name menuItem 1",
        Address: "address",
        City: "city",
        Country: "country",
        Latitude: 4,
        Longitude: 2,
        ImageLink: "link"
    });

    const restaurantCreated2 = await Restaurant.create({
        Owner: "random2_menuItem",
        Name: "restaurant name menuItem 2",
        Address: "address",
        City: "city",
        Country: "country",
        Latitude: 4,
        Longitude: 2,
        ImageLink: "link"
    });

    const menuCreated1 = await Menu.create({
        Restaurant_ID: restaurantCreated1.dataValues.Restaurant_ID,
        Name: "menu name menuItem 1-1",
        Description: "description",
        Rating: 4,
        Quality: 4,
        Service: 4,
        AveragePrice: 4
    });

    await Menu.create({
        Restaurant_ID: restaurantCreated1.dataValues.Restaurant_ID,
        Name: "menu name menuItem 1-2",
        Description: "description",
        Rating: 4,
        Quality: 4,
        Service: 4,
        AveragePrice: 4
    });

    await Menu.create({
        Restaurant_ID: restaurantCreated2.dataValues.Restaurant_ID,
        Name: "menu name menuItem 2-1",
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
        Name: "menu item name menuItem 1",
        Description: "description",
        Price: 5,
        ImageLink: "link",
        Type: "type",
        Rating: 3
    });


    const menuItemCreated2 = await MenuItem.create({
        Menu_ID: menuCreated1.dataValues.Menu_ID,
        Name: "menu item name menuItem 2",
        Description: "description",
        Price: 5,
        ImageLink: "link",
        Type: "type",
        Rating: 3
    });

    //then login to get the token
    const tokenObject = await request(app)
        .post('/api/user/login')
        .send({username: "random1_menuItem", password: "123456", isRestaurantOwner: true});

    //then try to access the endpoint as a owner
    token = tokenObject.body.token;

    menuIDToGet = menuCreated1.dataValues.Menu_ID;
    menuItemID1 = menuItemCreated1.dataValues.MI_ID;
    menuItemID2 = menuItemCreated2.dataValues.MI_ID;
}

async function destroyEverything() {
    await Owner.destroy({
        where: {
            Username: "random1_menuItem",
        }
    });
    await Owner.destroy({
        where: {
            Username: "random2_menuItem",
        }
    });
}