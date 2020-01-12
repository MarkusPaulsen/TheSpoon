const request = require('supertest');

let server;
let app;

const http = require('http');
const db = require('../../../sequelizeSettings.js');

const Customer = require('../../../models/customer.js');

describe('/api/user/customer/register', () => {

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
        const customer={
            username: "xXEmilioXxregistrationCustomer",
            email: "mari2n@gmail.com",
            password: "123456"
        };

        //it should return a 201 because the data sent are related to a valid customer
        it('should return a 201', async () => {

            const exec = async () => {
                return await request(app)
                    .post('/api/user/customer/register')
                    .send(customer)
            };

            const res = await exec();

            //remove the previously created user from the database
            await Customer.destroy({
                where: {
                    Username: customer.username
                }
            });

            expect(res.status).toBe(201);
        })

        //it should return a 400 because the username is already taken
        it('should return a 400', async () => {

            const exec = async () => {
                return await request(app)
                    .post('/api/user/customer/register')
                    .send(customer)
            };

            await exec();
            const res = await exec();

            //remove the previously created user from the database
            await Customer.destroy({
                where: {
                    Username: customer.username
                }
            });
            expect(res.status).toBe(400);
        })
    })
});