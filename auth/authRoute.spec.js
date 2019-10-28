const request = require("supertest");
const server = require("../main.js");
const db = require("../data/dbConfig");

const userInfo = {
    id: "1",
    firstName: "jane",
    lastName: "doe",
    email: "user8@gmail.com",
    password: 'password',
    roleId: "01"
};

const missingEmail = {
    id: "1",
    firstName: "jane",
    lastName: "doe",
    password: "password",
    roleId: "01"
};

const loginInfo = {
    email: "user8@gmail.com",
    password: 'password'
}

beforeEach(async () => {
    await db("roles").truncate();
    await db("users").truncate();
});

describe('POST /register', () => {
    it('allows register with required fields', async() => {
        let database = await db('users')
        expect(database).toHaveLength(0)
        await request(server).post('/api/auth/register').send(userInfo)
        database = await db('users')
        expect(database).toHaveLength(1)
    })
    it('returns a token on register', async() => {
        const response = await request(server).post('/api/auth/register').send(userInfo)
        expect(typeof(response.body.token)).toBe('string')
    })
    it('doesnt allow register without required fields', async() => {
        let database = await db('users')
        expect(database).toHaveLength(0)
        await request(server).post('/api/auth/register').send(missingEmail)
        database = await db('users')
        expect(database).toHaveLength(0)
    })
    it('doesnt return a token on unsuccessful register', async() => {
        const response = await request(server).post('/api/auth/register').send(missingEmail)
        expect(response.status).toBe(400)
        expect(response.body.token).toBeFalsy()
    })
})

// describe('POST /login', () => {
//     it('allows login with correct credentials', async () => {
//         await request(server).post('/api/auth/register').send(userInfo)
//         const results = await request(server).post('/api/auth/login').send(loginInfo)
//         expect(results.status).toBe(200)
//     })
// })