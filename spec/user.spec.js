const proxyquire = require('proxyquire');
const fs = require('fs');
var mockdata = JSON.parse(fs.readFileSync('../users.json', 'utf8'));
var otherdata = JSON.parse(fs.readFileSync('../users2.json', 'utf8'));
var user;
var Request = require("request");
require('../modules/compareObjects')


describe("user HTTP test", () => {
    var server;
    beforeAll(() => {
        server = require("../app");
    });
    describe("GET User/GetById", () => {
        it("Status 403: Forbidden", () => {
            Request.get("http://localhost:4444/user/GetById?id=1", (error, response, body) => {
                expect(response.statusCode).toBe(403);
            });

        });
    });
    describe("GET User/GetByEmail", () => {
        it("Status 403: Forbidden", () => {
            Request.get("http://localhost:4444/user/GetByEmail?id=verhagen.frank@gmail.com", (error, response, body) => {
                expect(response.statusCode).toBe(403);
            });

        });
    });
    describe("GET User/GetAll", () => {
        it("Status 403: Forbidden", () => {
            Request.get("http://localhost:4444/user/GetAll", (error, response, body) => {
                expect(response.statusCode).toBe(403);
            });

        });
    });
    describe("POST User/Update", () => {
        it("Status 403: Forbidden", () => {
            Request.post({
                url: 'http://localhost:4444/user/Update',
                form: { key: 'value' }
            },
                function (err, response, body) {
                    expect(response.statusCode).toBe(403);
                })
        });
    });
});

describe("user", () => {
    beforeAll(() => {
        const stubs = {
            '../modules/auth': module.exports = {
                verifyToken: (req, res, next) => { next() }
            },
        };
        user = proxyquire('../routes/user', stubs);
    });
    describe("GetUserById", () => {
        beforeAll(() => {
            global.db = {
                query: function (query, variables, succeed) {
                    succeed("", mockdata.filter(
                        function (data) { return data.user_id == variables[0] }
                    ))
                }
            };
        });
        it("To succeed", () => {
            user.stack[0].route.stack[1]
                .handle({ query: { id: 2 } }
                    , {
                        send: function (response) {
                            expect(response).toEqual(mockdata.filter(
                                function (data) { return data.user_id == 2 }
                            ))
                        }
                    })
        });
        it("To fail", () => {
            user.stack[0].route.stack[1]
                .handle({ query: { id: 2 } }
                    , {
                        send: function (response) {
                            expect(response[0].user_id == 4).toBe(false)
                        }
                    })
        });
    });
    describe("GetUserByEmail", () => {
        beforeAll(() => {
            global.db = {
                query: function (query, variables, succeed) {
                    succeed("", mockdata.filter(
                        function (data) { return data.email == variables[0] }
                    ))
                }
            };
        });
        it("To succeed", () => {
            user.stack[1].route.stack[1]
                .handle({ query: { email: "Maartenf@gmail.com" } }
                    , {
                        send: function (response) {
                            expect(response).toEqual(mockdata.filter(
                                function (data) { return data.email == "Maartenf@gmail.com" }
                            ))
                        }
                    })
        });
        it("To fail", () => {
            user.stack[1].route.stack[1]
                .handle({ query: { email: "Maartenf@gmail.com" } }
                    , {
                        send: function (response) {
                            expect(response[0].email == "Johan.bos@gmail.com").toBe(false)
                        }
                    })
        });
    });
    describe("GetAll", () => {
        beforeAll(() => {
            global.db = {
                query: function (query, succeed) {
                    succeed("", mockdata)
                }
            };
        });
        it("To succeed", () => {
            user.stack[2].route.stack[1]
                .handle({}
                    , {
                        send: function (response) {
                            expect(response).toEqual(mockdata)
                        }
                    })
        });
        it("To fail", () => {
            user.stack[2].route.stack[1]
                .handle({}
                    , {
                        send: function (response) {
                            expect(Object.equals(mockdata, otherdata)).toBe(false)
                        }
                    })
        });
    });
});