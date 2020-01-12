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
const Search = require('../../../models/search.js');

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

        const exec = async (menuItemName) => {
            return await request(app)
                .get('/api/user/customer/menu/searchByMenuItem?menuItemName='+menuItemName)
                .set('x-auth-token', token)
        };

        it('should return 404 no matching items because there is no menu item matching', async () => {
            await setDatabase();
            const menuItemName='something that does not exist';
            const res = await exec(menuItemName);
            await destroyEverything();
            expect(res.status).toBe(404);
        });

        it('should return a valid json with search data', async () => {
            await setDatabase();
            const restaurantFound1 = await Restaurant.findAll({
                where: {
                    Name: "restaurant_searchByMenuItem"
                }
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

            await MenuItem.create({
                Menu_ID: menuCreated.dataValues.Menu_ID,
                Name: "Pasta",
                Description: "description",
                Price: 5,
                ImageLink: "link",
                Type: "type",
                Rating: 3
            });

            //then login to get the token
            const tokenObject = await request(app)
                .post('/api/user/login')
                .send({username: "eImperiali_searchByMenuItem", password: "123456", isRestaurantOwner: false});

            //then try to access the endpoint as a customer
            token = tokenObject.body.token;

            const menuItemName='Pasta';
            const res = await exec(menuItemName);
            await destroyEverything();
            expect(res.status).toBe(200);
        })
    });


});

async function setDatabase(){
    //first of all, create the customer in the database
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash("123456", salt);

    await Customer.create({
        Username: "eImperiali_searchByMenuItem",
        Email: "emilioimperiali_searchByMenuItem@mail.com",
        Password: hashed
    });

    //then login to get the token
    const tokenObject = await request(app)
        .post('/api/user/login')
        .send({username: "eImperiali_searchByMenuItem", password: "123456", isRestaurantOwner: false});
    token = tokenObject.body.token;

    //create some owners
    await Owner.create({
        Username: "random 1_searchByMenuItem",
        Password: "password",
        Name: "name",
        Surname: "surname",
        Email: "email1_searchByMenuItem@mail.com"
    });


    //create some restaurants
    await Restaurant.create({
        Owner: "random 1_searchByMenuItem",
        Name: "restaurant_searchByMenuItem",
        Address: "address 1",
        City: "city 1",
        Country: "country 1",
        Latitude: 2,
        Longitude: 3,
        ImageLink: "link 1"
    });

}

async function destroyEverything(){
    await Customer.destroy({
        where: {
            Username: "eImperiali_searchByMenuItem"}
    });
    await Owner.destroy({
        where: {
            Username: "random 1_searchByMenuItem"
        }
    });
    await Search.destroy({
        where: {
            Username: "eImperiali_searchByMenuItem"}
    });
}