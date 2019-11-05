const request = require("supertest");
const server = require("../main.js");
const db = require("../data/dbConfig");

const completeRegistration = {
    firstName: "jane",
    lastName: "doe",
    email: "user8@gmail.com",
    password: "password",
    roleId: "01"
};

const missingEmail = {
    firstName: "jane",
    lastName: "doe",
    password: "password",
    roleId: "01"
};

const completeLogin = {
    email: "user8@gmail.com",
    password: "password"
};

beforeEach(async () => {
    await db("roles").truncate();
    await db("users").truncate();
});

describe("POST /register", () => {
    it("allows register with required fields", async() => {
        const emptyUserDatabase = await db("users")
        expect(emptyUserDatabase).toHaveLength(0)
        await request(server).post("/api/auth/register").send(completeRegistration)
        const userDatabase = await db("users")
        expect(userDatabase).toHaveLength(1)
    })
    it("returns a token on register", async() => {
        const response = await request(server).post("/api/auth/register").send(completeRegistration)
        expect(typeof(response.body.token)).toBe("string")
    })
    it("doesn't allow register without required fields", async() => {
        const emptyUserDatabase = await db("users")
        expect(emptyUserDatabase).toHaveLength(0)
        await request(server).post("/api/auth/register").send(missingEmail)
        const userDatabase = await db("users")
        expect(userDatabase).toHaveLength(0)
    })
    it("doesn't return a token on unsuccessful register", async() => {
        const response = await request(server).post("/api/auth/register").send(missingEmail)
        expect(response.status).toBe(400)
        expect(response.body.token).toBeFalsy()
    })
})

// describe("POST /login", () => {
//     it("allows login with correct credentials", async () => {
//         await request(server).post("/api/auth/register").send(userInfo)
//         const results = await request(server).post("/api/auth/login").send(loginInfo)
//         expect(results.status).toBe(200)
//     })
// })
