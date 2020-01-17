const request = require('supertest');

let server;
let app;

const http = require('http');
const db = require('../../../sequelizeSettings.js');

const Consultant = require('../../../models/consultant.js');

describe('/api/consultant/register', () => {

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

    describe('POST /', () => {

        //it should return a 201 because the data sent are related to a valid consultant
        it('should return a 201', async (done) => {

            const exec = async () => {
                return await request(app)
                    .post('/api/consultant/register')
                    .send({
                        "username": "xXEmilioXxregistrationConsultant",
                        "name": "Emilio",
                        "surname": "Imperiali",
                        "email": "registrationConsultant@mail.com",
                        "companySecret": "OurCompanyRocks",
                        "password": "123456"
                    })
            };

            const res = await exec();

            //remove the previously created user from the database
            await Consultant.destroy({
                where: {
                    Username: "xXEmilioXxregistrationConsultant"
                }
            });

            expect(res.status).toBe(201);
            done();
        });

        //it should return a 400 because the company secret is wrong
        it('should return a 400', async (done) => {

            const exec = async () => {
                return await request(app)
                    .post('/api/consultant/register')
                    .send({
                        "username": "xXEmilioXxregistrationConsultant",
                        "name": "Emilio",
                        "surname": "Imperiali",
                        "email": "registrationConsultant@mail.com",
                        "companySecret": "falseSecret",
                        "password": "123456"
                    })
            };

            const res = await exec();

            //remove the previously created user from the database
            await Consultant.destroy({
                where: {
                    Username: "xXEmilioXxregistrationConsultant"
                }
            });
            expect(res.status).toBe(400);
            done();
        })
    })
});