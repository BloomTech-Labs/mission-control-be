const request = require('supertest');
const db = require('./data/dbConfig')
const server = require('./main');

describe('server.js', () => {
    describe('index route', () => {
        it('should return an OK status code from index route', async () => {
            const expectedStatusCode = 200;
            const response = await request(server).get('/');
            expect(response.status).toEqual(expectedStatusCode);
        });
        it('should be return hello message', async () => {
            const response = await request(server).get('/');
            expect(response.body).toEqual({ message: "hello" });
        });
    });
});
