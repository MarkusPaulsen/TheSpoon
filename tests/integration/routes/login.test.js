const request = require('supertest');

let server;
let app;

const http = require('http');
const db = require('../../../sequelizeSettings.js');

const bcrypt = require('bcrypt');
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

        //it should return a 201 because the data sent are related to a valid user
        it('should return a 201', async () => {

            //first of all, create the user in the database
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash("123456", salt);

            await Owner.create({
                Username: "xXEmilioXx",
                Name: "Emilio",
                Surname: "Imperiali",
                Email: "emilio@mail.com",
                Password: hashed
            });

            //then check if the login works by checking if the response has code 201
            const exec = () => {
                return request(app)
                    .post('/api/user/login')
                    .send({username: "xXEmilioXx", password: "123456", isRestaurantOwner: true})
            };

            const res = await exec();
            expect(res.status).toBe(201);

            //remove the previously created user from the database
            await Owner.destroy({
                where: {
                    Username: "xXEmilioXx"
                }
            })
        })


    })

});