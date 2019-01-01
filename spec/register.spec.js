describe("registration", () => {
    var register;
    beforeAll(() => {
        register = require("../routes/register");
        //make a mock db object instead of a real database connection to test the isolated express unit
        //this will always return affectedRows: 1
        global.db = {
            query: function (query, variables, succeed) {
                succeed("", { affectedRows: 1 })
            }
        };
        register.saltRounds = "";
    });
    describe("Test regex", () => {
        it("To succeed", async () => {
            await register.stack[0].route.stack[0].handle({ body: { email: "test@test.nl", password: "sdjalfkjdfsdfslkfjlksf##dDD33" } }, { json: function (response) { expect(response.success).toBe(true) } })
        });
        it("To fail", async () => {
            await register.stack[0].route.stack[0].handle({ body: { email: "test@test.nl", password: "" } }, { json: function (response) { expect(response.success).toBe(false) } })
        });
        it("To fail", async () => {
            await register.stack[0].route.stack[0].handle({ body: { email: "", password: "" } }, { json: function (response) { expect(response.success).toBe(false) } })
        });
        it("To fail", async () => {
            await register.stack[0].route.stack[0].handle({ body: { email: "test@test.nl", password: "" } }, { json: function (response) { expect(response.success).toBe(false) } })
        });
        it("To fail", async () => {
            await register.stack[0].route.stack[0].handle({ body: { email: "test@test.nl", password: "sdjalfkjdfsdfslkfjlksf##dDD" } }, { json: function (response) { expect(response.success).toBe(false) } })
        });
    });
});
