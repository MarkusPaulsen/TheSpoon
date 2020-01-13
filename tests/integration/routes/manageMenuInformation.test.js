const request = require('supertest');

let server;
let app;
let token;
let body;

const http = require('http');
const db = require('../../../sequelizeSettings.js');

const bcrypt = require('bcrypt');
const Owner = require('../../../models/owner.js');
const Restaurant = require('../../../models/restaurant.js');
const TaggedMenu = require('../../../models/taggedMenu.js');

describe('/api/user/owner/restaurant/menu', () => {

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

    describe('POST /', () => {

        const exec = async () => {
            return await request(app)
                .post('/api/user/owner/restaurant/menu')
                .set('x-auth-token', token)
                .send(body);
        };

        it('should not accept invalid tags', async (done) => {
            await setDatabase();
            body = {
                name: "menu's name",
                description: "menu's description",
                tags: ["InvalidTag", "Italian"]
            };
            const res = await exec();
            await destroyEverything();
            expect(res.status).toBe(400);
            done();
        });
        it('should create the menu if the tags are valid', async (done) => {
            await setDatabase();
            body = {
                name: "menu's name",
                description: "menu's description",
                tags: ["Italian", "Mediterranean"]
            };
            const res = await exec();
            await destroyEverything();
            expect(res.status).toBe(201);
            done();
        })
    });
    describe('PUT /:menuID', () => {

        const exec = async (menuID) => {
            return await request(app)
                .put('/api/user/owner/restaurant/menu/' + menuID)
                .set('x-auth-token', token)
                .send(body);
        };

        it('should send 404 if the menu with given menuID is not found', async (done) => {
            await setDatabase();
            //try to edit a menu that doesn't exist
            const res = await exec(568);
            await destroyEverything();
            expect(res.status).toEqual(404);
            done();
        });
        it('should not accept invalid tags', async (done) => {
            await setDatabase();
            //create a menu associated to the restaurant
            const responseAfterCreatingMenu = await request(app)
                .post('/api/user/owner/restaurant/menu/')
                .set('x-auth-token', token)
                .send({
                    name: "menu's name",
                    description: "menu's description",
                    tags: ["Italian", "Mediterranean"]
                });
            //create the body with invalid tags
            body = {
                name: "menu's name",
                description: "menu's description",
                tags: ["InvalidTag", "Italian"]
            };
            //try to edit the previously created menu
            const res = await exec(responseAfterCreatingMenu.body.menuID);
            await destroyEverything();
            expect(res.status).toBe(400);
            done();
        });
        it('should associate to the menu all and only the new tags sent while editing', async (done) => {
            await setDatabase();
            //create a menu associated to the restaurant
            const responseAfterCreatingMenu = await request(app)
                .post('/api/user/owner/restaurant/menu/')
                .set('x-auth-token', token)
                .send({
                    name: "menu's name",
                    description: "menu's description",
                    tags: ["Italian", "Mediterranean"]
                });
            //create the body with some tags in common with the old menu and some new tags, with some old tags missing
            body = {
                name: "menu's name",
                description: "menu's description",
                tags: ["Italian", "Pasta"]
            };
            //edit the menu
            await exec(responseAfterCreatingMenu.body.menuID);
            //get the tags associated to the menu
            const tagsRetrieved = await TaggedMenu.findAll({
                attributes: ['Tag'],
                where: {
                    Menu_ID: responseAfterCreatingMenu.body.menuID
                }
            });

            const numberOfTagsRetrieved = tagsRetrieved.length;
            let tagsRetrievedInArray = [];
            for (let i=0; i < numberOfTagsRetrieved; i++){
                tagsRetrievedInArray[i] = tagsRetrieved[i].dataValues.Tag;
            }
            await destroyEverything();
            expect(tagsRetrievedInArray).toEqual(['Italian', 'Pasta']);
            done();
        })
    });
    describe('DELETE /:menuID', () => {

        const exec = async (menuID) => {
            return await request(app)
                .delete('/api/user/owner/restaurant/menu/' + menuID)
                .set('x-auth-token', token)
        };

        it('should send 404 if the menu with given menuID is not found', async (done) => {
            await setDatabase();
            //try to delete a menu that doesn't exist
            const res = await exec(568);
            await destroyEverything();
            expect(res.status).toEqual(404);
            done();
        });
        it('should delete exactly the given menu, not another', async (done) => {
            await setDatabase();
            //create a menu associated to the restaurant
            const responseAfterCreatingMenu = await request(app)
                .post('/api/user/owner/restaurant/menu/')
                .set('x-auth-token', token)
                .send({
                    name: "menu's name",
                    description: "menu's description",
                    tags: ["Italian", "Mediterranean"]
                });
            const res = await exec(responseAfterCreatingMenu.body.menuID);
            await destroyEverything();
            expect(res.body).toEqual({menuID: responseAfterCreatingMenu.body.menuID.toString()});
            done();
        })
    })
});

async function setDatabase() {
    //create the owner in the database
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash("123456", salt);

    await Owner.create({
        Username: "emilioImperiali_manageMenuInformation",
        Name: "Emilio",
        Surname: "Imperiali",
        Email: "emilioimperiali@mail.com",
        Password: hashed
    });

    //create the restaurant in the database
    await Restaurant.create({
        Owner: "emilioImperiali_manageMenuInformation",
        Name: "name",
        Address: "address",
        City: "city",
        Country: "country",
        Latitude: 1,
        Longitude: 1,
        ImageLink: "link"
    });

    //then login to get the token
    const tokenObject = await request(app)
        .post('/api/user/login')
        .send({username: "emilioImperiali_manageMenuInformation", password: "123456", isRestaurantOwner: true});
    token = tokenObject.body.token;
}

async function destroyEverything() {
    await Owner.destroy({
        where: {
            Username: "emilioImperiali_manageMenuInformation"
        }
    });
}