describe("registration", () => {
    var register;
    beforeAll(() => {
        register = require("../routes/register");
    });
    describe("Test regex", () => {
        var data = {};
        beforeAll((done) => {
            done();
        });
        it("To fail", () => {
            register.stack[0].route.stack[0].handle({ body: {email:"", password: "sdjalfkjdfsdfslkfjlksf"} }, { json: function (response) { expect(response.success).toBe(false)} })
        });
    });
});
