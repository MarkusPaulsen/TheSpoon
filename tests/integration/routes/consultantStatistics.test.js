const request = require('supertest');

let server;
let app;
let token;

const http = require('http');
const db = require('../../../sequelizeSettings.js');
const config=require('config');

const bcrypt = require('bcrypt');
const Customer = require('../../../models/customer.js');
const Consultant = require('../../../models/consultant.js');
const Search = require('../../../models/search.js');


describe('/api/consultant/statistics', () => {

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

    describe('GET /', () => {

        const exec = async () => {
            return await request(app)
                .get('/api/consultant/statistics')
                .set('x-auth-token', token);
        };

        it('should return a valid json about the statistics', async (done) => {
            await setDatabase();

            //then login to get the token
            const tokenObject = await request(app)
                .post('/api/consultant/login')
                .send({username: "consultant_consultantStatistics", password: "123456"});
            token = tokenObject.body.token;

            const res = await exec();
            await destroyEverything();

            expect(res.status).toBe(200);
            done();
        });

        it('should return a 401 access denied because the user is a customer, not a consultant', async (done) => {
            await setDatabase();

            //then login to get the token
            const tokenObject = await request(app)
                .post('/api/user/login')
                .send({username: "marinMilina_consultantStatistics", password: "123456", isRestaurantOwner: false});
            token = tokenObject.body.token;

            const res = await exec();
            await destroyEverything();

            expect(res.status).toBe(401);
            done();
        });
    });

    describe('GET /:nationality', () => {

        const exec = async (nationality) => {
            return await request(app)
                .get('/api/consultant/statistics/'+nationality)
                .set('x-auth-token', token);
        };

        it('should return a valid json about the statistics', async (done) => {
            await setDatabase();

            //then login to get the token
            const tokenObject = await request(app)
                .post('/api/consultant/login')
                .send({username: "consultant_consultantStatistics", password: "123456"});
            token = tokenObject.body.token;

            const res = await exec('Italy');
            await destroyEverything();

            expect(res.status).toBe(200);
            done();
        });

        it('should return a 401 access denied because the user is a customer, not a consultant', async (done) => {
            await setDatabase();

            //then login to get the token
            const tokenObject = await request(app)
                .post('/api/user/login')
                .send({username: "marinMilina_consultantStatistics", password: "123456", isRestaurantOwner: false});
            token = tokenObject.body.token;

            const res = await exec('Italy');
            await destroyEverything();

            expect(res.status).toBe(401);
            done();
        });
    });
});

async function setDatabase() {
    //create the owner in the database
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash("123456", salt);

    await Customer.create({
        Username: "emilioImperiali_consultantStatistics",
        Name: "Emilio",
        Surname: "Imperiali",
        Email: "emilioimperiali_consultantStatistics@mail.com",
        Nationality: "Italy",
        Gender: "Male",
        AgeRange: "24-34",
        Password: hashed
    });
    await Search.create({
        Username: "emilioImperiali_consultantStatistics",
        SearchedWord: "pizza",
        NumberOfSearches: 2
    });

    await Customer.create({
        Username: "marinMilina_consultantStatistics",
        Name: "Marin",
        Surname: "Milina",
        Email: "marinMilina_consultantStatistics@mail.com",
        Nationality: "Croatia",
        Gender: "Male",
        AgeRange: "24-34",
        Password: hashed
    });
    await Search.create({
        Username: "marinMilina_consultantStatistics",
        SearchedWord: "pizza",
        NumberOfSearches: 3
    });

    await Consultant.create({
        Username: "consultant_consultantStatistics",
        Name: "Marin",
        Surname: "Milina",
        Email: "consultant_consultantStatistics@mail.com",
        Nationality: "Croatia",
        CompanySecret: config.get('companySecret'),
        Password: hashed
    });
}

async function destroyEverything() {
    await Customer.destroy({
        where: {
            Username: "emilioImperiali_consultantStatistics"
        }
    });
    await Search.destroy({
        where: {
            Username: "emilioImperiali_consultantStatistics"
        }
    });
    await Customer.destroy({
        where: {
            Username: "marinMilina_consultantStatistics"
        }
    });
    await Search.destroy({
        where: {
            Username: "marinMilina_consultantStatistics"
        }
    });
    await Consultant.destroy({
        where: {
            Username: "consultant_consultantStatistics"
        }
    });
}