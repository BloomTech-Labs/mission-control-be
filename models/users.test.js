const request = require('supertest');
const db = require('../data/dbConfig');
const admin_user = require('./admin_user');

// Tests set up to test seeded data
// Run npx knex migrate:latest --env=testing && npx knex seed:run --env=testing
describe('admin_user model', () => {
    

    let userInfo = {
        id: "1",
        firstName: "jane",
        lastName: "doe",
        email: "user8@gmail.com",
        password: "password",
        roleId: "01"
      }

    beforeEach(async () => {
        await db("roles").truncate();
        await db("users").truncate();
    });

    it('should set enviroment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    describe('add()', () => {
        it('should add user to db', async () => {
            let database = await db('users')
            expect(database).toHaveLength(0)
            await admin_user.add(userInfo);
            database = await db('users')
            expect(database).toHaveLength(1)
        });
    });

    describe('findByEmail', () => {
        it('should find user by email', async () => {
            await admin_user.add(userInfo);
            user = await admin_user.findByEmail(userInfo.email)
            // expect(user.email).toBe(userInfo.email)
        });
    })

});
