

const request = require('supertest');

let server;
let app;

const http = require('http');
const db = require('../../../sequelizeSettings.js');

describe('/api/user/login', () => {

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

    describe('POST /', () => {

        //it should return a 201 because the data sent are related to a valid user
        it('should return a 201', async () => {

            const exec = () => {
                return request(app)
                    .post('/api/user/login')
                    .send({username: "xXEmilioXx", password: "123456", isRestaurantOwner: true})
            };

            const res = await exec();
            expect(res.status).toBe(201);
        })


    })

});