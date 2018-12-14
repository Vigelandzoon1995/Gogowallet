var Request = require("request");

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../app");
    });
    describe("GET Users/", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3333/users", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 403: Unauthorized", () => {
            expect(data.status).toBe(403);
        });
    });
});
