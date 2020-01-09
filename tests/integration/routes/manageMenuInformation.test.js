const request = require('supertest');

let server;
let app;
let token;
let body;
const sleep = ms => new Promise(res => setTimeout(res, ms));
const sleepTime = 5000;

const http = require('http');
const db = require('../../../sequelizeSettings.js');

const bcrypt = require('bcrypt');
const Customer = require('../../../models/customer.js');
const Owner = require('../../../models/owner.js');
const Restaurant = require('../../../models/restaurant.js');
const Menu = require('../../../models/menu.js');
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
    afterAll(() => {
        db.close();
    });

    describe('POST /', () => {

        const exec = async () => {
            return await request(app)
                .post('/api/user/owner/restaurant/menu')
                .set('x-auth-token', token)
                .send(body);
        };

        it('should not accept invalid tags', async () => {
            await sleep(sleepTime);
            await setDatabase();
            body = {
                name: "menu's name",
                description: "menu's description",
                tags: ["InvalidTag", "Italian"]
            };
            const res = await exec();
            expect(res.status).toBe(400);
            await destroyEverything();
        });
        it('should create the menu if the tags are valid', async () => {
            await sleep(sleepTime);
            await setDatabase();
            body = {
                name: "menu's name",
                description: "menu's description",
                tags: ["Italian", "Mediterranean"]
            };
            const res = await exec();
            expect(res.status).toBe(201);
            await destroyEverything();
        })
    });
    describe('PUT /:menuID', () => {

        const exec = async (menuID) => {
            return await request(app)
                .put('/api/user/owner/restaurant/menu/' + menuID)
                .set('x-auth-token', token)
                .send(body);
        };

        it('should send 404 if the menu with given menuID is not found', async () => {
            await sleep(sleepTime);
            await setDatabase();
            //be sure that there are no menus in the database
            await Menu.destroy({
                where: {}
            });
            //try to edit a menu that doesn't exist
            const res = await exec(1);
            expect(res.status).toEqual(404);
            await destroyEverything();
        });
        it('should not accept invalid tags', async () => {
            await sleep(sleepTime);
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
            await destroyEverything();
        });
        it('should associate to the menu all and only the new tags sent while editing', async () => {
            await sleep(sleepTime);
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
            expect(tagsRetrievedInArray).toEqual(['Italian', 'Pasta']);
            await destroyEverything();
        })
    });
    describe('DELETE /:menuID', () => {

        const exec = async (menuID) => {
            return await request(app)
                .delete('/api/user/owner/restaurant/menu/' + menuID)
                .set('x-auth-token', token)
        };

        it('should send 404 if the menu with given menuID is not found', async () => {
            await sleep(sleepTime);
            await setDatabase();
            //be sure that there are no menus in the database
            await Menu.destroy({
                where: {}
            });
            //try to delete a menu that doesn't exist
            const res = await exec(1);
            expect(res.status).toEqual(404);
            await destroyEverything();
        });
        it('should delete exactly the given menu, not another', async () => {
            await sleep(sleepTime);
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
            expect(res.body).toEqual({menuID: responseAfterCreatingMenu.body.menuID.toString()});
            await destroyEverything();
        })
    })
});

async function setDatabase() {
    //create the owner in the database
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash("123456", salt);

    await Owner.create({
        Username: "emilioImperiali",
        Name: "Emilio",
        Surname: "Imperiali",
        Email: "emilioimperiali@mail.com",
        Password: hashed
    });

    await sleep(5000);

    //create the restaurant in the database
    await Restaurant.create({
        Owner: "emilioImperiali",
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
        .send({username: "emilioImperiali", password: "123456", isRestaurantOwner: true});
    token = tokenObject.body.token;
}

async function destroyEverything() {
    await Customer.destroy({
        where: {}
    });
    await Owner.destroy({
        where: {}
    });
    await Restaurant.destroy({
        where: {}
    })
}