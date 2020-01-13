const request = require('supertest');

let server;
let app;
let token;
let menuIDToGet;
let menuItemID1;
let menuReviewID;

const http = require('http');
const db = require('../../../sequelizeSettings.js');
const bcrypt = require('bcrypt');

const Owner = require('../../../models/owner.js');
const Customer = require('../../../models/customer.js');
const Restaurant = require('../../../models/restaurant.js');
const Menu = require('../../../models/menu.js');
const MenuItem = require('../../../models/menuItem.js');
const MenuReview = require('../../../models/menuReview.js');
const ItemReview = require('../../../models/itemReview.js');

describe('/api/user/customer/review', () => {

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

    //test "get all reviews of the customer"
    describe('GET /', () => {

        const exec = async () => {
            return await request(app)
                .get('/api/user/customer/review/')
                .set('x-auth-token', token)
        };

        it('should return 200', async (done) => {
            await setDatabase();

            const res = await exec();
            await destroyEverything();
            expect(res.status).toBe(200);
            done();
        })
    });

    //test "get all reviews of the customer"
    describe('DELETE /:reviewID', () => {

        const exec = async (reviewID) => {
            return await request(app)
                .delete('/api/user/customer/review/'+reviewID)
                .set('x-auth-token', token)
        };

        it('should return 200', async (done) => {
            await setDatabase();

            const res = await exec(menuReviewID);
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

    await Customer.create({
        Username: "eImperiali_manageCustomerReviews",
        Email: "emilioimperiali_manageCustomerReviews@mail.com",
        Password: hashed
    });

    await Owner.create({
        Username: "random1_manageCustomerReviews",
        Password: hashed,
        Name: "name",
        Surname: "surname",
        Email: "email1_manageCustomerReviews@mail.com"
    });

    const restaurantCreated1 = await Restaurant.create({
        Owner: "random1_manageCustomerReviews",
        Name: "restaurant name manageCustomerReviews 1",
        Address: "address",
        City: "city",
        Country: "country",
        Latitude: 4,
        Longitude: 2,
        ImageLink: "link"
    });


    const menuCreated1 = await Menu.create({
        Restaurant_ID: restaurantCreated1.dataValues.Restaurant_ID,
        Name: "menu name manageCustomerReviews 1-1",
        Description: "description",
        Rating: 4,
        Quality: 4,
        Service: 4,
        AveragePrice: 4
    });

    const menuItemCreated1 = await MenuItem.create({
        Menu_ID: menuCreated1.dataValues.Menu_ID,
        Name: "menu item name manageCustomerReviews 1",
        Description: "description",
        Price: 5,
        ImageLink: "link",
        Type: "type",
        Rating: 3
    });

    //then login to get the token
    const tokenObject = await request(app)
        .post('/api/user/login')
        .send({username: "eImperiali_manageCustomerReviews", password: "123456", isRestaurantOwner: false});

    //then try to access the endpoint as a owner
    token = tokenObject.body.token;

    menuIDToGet = menuCreated1.dataValues.Menu_ID;
    menuItemID1 = menuItemCreated1.dataValues.MI_ID;

    const menuReview = await MenuReview.create({
        Username: "eImperiali_manageCustomerReviews",
        Menu_ID: menuIDToGet,
        Date: "2019-12-01",
        ServiceRating: 4,
        QualityRating: 4,
        Status: "PENDING",
        Image_ID: 123
    });

    menuReviewID=menuReview.dataValues.Review_ID;

    await ItemReview.create({
        Username: "eImperiali_manageCustomerReviews",
        MI_ID: menuItemID1,
        Content: "really good",
        ItemRating: 5,
        Date: "2019-12-01",
        Status: "PENDING",
        MenuReview_ID: menuReviewID
    })
}

async function destroyEverything() {
    await Owner.destroy({
        where: {
            Username: "random1_manageCustomerReviews",
        }
    });
    await Owner.destroy({
        where: {
            Username: "random2_manageCustomerReviews",
        }
    });
    await Customer.destroy({
        where: {
            Username: "eImperiali_manageCustomerReviews",
        }
    });
}