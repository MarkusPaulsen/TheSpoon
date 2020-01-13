const request = require('supertest');

let server;
let app;
let token;

const http = require('http');
const db = require('../../../sequelizeSettings.js');

const bcrypt = require('bcrypt');
const Owner = require('../../../models/owner.js');
const Restaurant = require('../../../models/restaurant.js');
const OpeningHours = require('../../../models/openingHours.js');

describe('/api/user/owner/restaurant', () => {

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
    afterAll (async done => {
        await db.close();
        done();
    });

    //test "Get data of own restaurant"
    describe('PUT /', () => {

        const exec = async () => {
            return await request(app)
                .get('/api/user/owner/restaurant')
                .set('x-auth-token', token)
        };

        it('should send 404 if no restaurant is associated to the logged in owner', async (done) => {
            await setDatabase();
            const res = await exec();
            await destroyEverything();
            expect(res.status).toEqual(404);
            done();
        });
        it('should send all and only the correct data about the restaurant of the logged in owner', async (done) => {
            await setDatabase();
            //create the restaurant of the owner
            const restaurantCreated = await Restaurant.create({
                Owner: "random_manageRestaurantInformation",
                Name: "restaurant name",
                Address: "address",
                City: "city",
                Country: "country",
                Latitude: 4,
                Longitude: 2,
                ImageLink: "link"
            });
            //create the opening hours of the restaurant
            await OpeningHours.create({
                Restaurant_ID: restaurantCreated.dataValues.Restaurant_ID,
                Day: "Monday",
                OpenTime: "12.00",
                CloseTime: "15.00"
            });
            await OpeningHours.create({
                Restaurant_ID: restaurantCreated.dataValues.Restaurant_ID,
                Day: "Saturday",
                OpenTime: "19.00",
                CloseTime: "23.59"
            });

            const res = await exec();
            await destroyEverything();
            expect(res.body).toEqual({
                name: "restaurant name",
                address: "address",
                city: "city",
                country: "country",
                imageLink: "link",
                openingHours: [{
                    day: "Monday",
                    openTime: "12.00",
                    closeTime: "15.00"
                },{
                    day: "Saturday",
                    openTime: "19.00",
                    closeTime: "23.59"
                }]
            });
            done();
        })
    })
});

async function setDatabase() {
    //create the owner
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash("123456", salt);

    await Owner.create({
        Username: "random_manageRestaurantInformation",
        Password: hashed,
        Name: "name",
        Surname: "surname",
        Email: "email_manageRestaurantInformation@mail.com"
    });

    //log in to get the token
    const tokenObject = await request(app)
        .post('/api/user/login')
        .send({username: "random_manageRestaurantInformation", password: "123456", isRestaurantOwner: true});
    token = tokenObject.body.token;
}

async function destroyEverything() {
    await Owner.destroy({
        where: {
            Username: "random_manageRestaurantInformation"
        }
    })
}