const request = require('supertest');

let server;
let app;

const http = require('http');
const db = require('../../../sequelizeSettings.js');

const Owner = require('../../../models/owner.js');

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

        const owner= {
            username: "johndoeRegistrationOwner",
            email: "john.doeregistrationOwner@gmail.com",
            name: "John",
            surname: "Doe",
            password: "123456"
        }


        //it should return a 201 because the data sent are related to a valid owner
        it('should return a 201', async () => {

            const exec = async () => {
                return await request(app)
                    .post('/api/user/owner/register')
                    .send(owner)
            };

            const res = await exec();

            //remove the previously created user from the database
            await Owner.destroy({
                where: {
                    Username: owner.username
                }
            });

            expect(res.status).toBe(201);
        })

        //it should return a 400 because the username is already taken
        it('should return a 400', async () => {

            const exec = async () => {
                return await request(app)
                    .post('/api/user/owner/register')
                    .send(owner)
            };

            await exec();
            const res = await exec();

            //remove the previously created user from the database
            await Owner.destroy({
                where: {
                    Username: owner.username
                }
            });
            expect(res.status).toBe(400);
        })
    })
});