const request = require('supertest');
const db = require('../data/dbConfig');
const admin_user = require('./admin_user');

// Tests set up to test seeded data
// Run npx knex migrate:latest --env=testing && npx knex seed:run --env=testing
describe('admin_user model', () => {
    describe('find()', () => {
        it('should return the seeded user', async () => {
            const user = await admin_user.find();
            expect(user[0].username).toBe('user1');
        });
    });

    describe('findByUsername()', () => {
        it('should find the seeded user by username', async () => {
            const expected = 'user1';
            const user = await admin_user.findByUsername(expected);
            console.log(user);
            expect(user.username).toBe(expected);
        });
    });
});
