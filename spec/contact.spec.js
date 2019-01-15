const proxyquire = require('proxyquire');
const fs = require('fs');
var mockdata = JSON.parse(fs.readFileSync('../contacts.json', 'utf8'));
var otherdata = JSON.parse(fs.readFileSync('../contacts2.json', 'utf8'));
var contact;
var Request = require("request");
require('../modules/compareObjects')
describe("user HTTP test", () => {
    var server;
    beforeAll(() => {
        server = require("../app");
        const stubs = {
            '../modules/auth': module.exports = {
                verifyToken: (req, res, next) => {
                    next()
                }
            },
        };
        contact = proxyquire('../routes/contact', stubs);
    });
    describe("GET Contact/GetById", () => {
        it("Status 403: Forbidden", () => {
            Request.get("http://localhost:4444/contact/GetById?id=1", (error, response, body) => {
                expect(response.statusCode).toBe(403);
            });

        });
    });
    describe("GET Contact/GetAll", () => {
        it("Status 403: Forbidden", () => {
            Request.get("http://localhost:4444/contact/GetAll", (error, response, body) => {
                expect(response.statusCode).toBe(403);
            });

        });
    });
    describe("POST Contact/Create", () => {
        it("Status 403: Forbidden", () => {
            Request.post({
                url: 'http://localhost:4444/contact/Create',
                form: { key: 'value' }
            },
                function (err, response, body) {
                    expect(response.statusCode).toBe(403);
                })
        });
    });
    describe("POST Contact/Update", () => {
        it("Status 403: Forbidden", () => {
            Request.post({
                url: 'http://localhost:4444/contact/Update',
                form: { key: 'value' }
            },
                function (err, response, body) {
                    expect(response.statusCode).toBe(403);
                })
        });
    });
    describe("GetById", () => {
        beforeAll(() => {
            global.db = {
                query: function (query, variables, succeed) {
                    succeed("", mockdata.filter(
                        function (data) { return data.id == variables[0] && data.user_id == variables[1] }
                    ))
                }
            };
        });

        it("To succeed", () => {
            contact.stack[0].route.stack[1]
                .handle({ query: { id: 4 } }
                    , {
                        send: function (response) {
                            expect(response).toEqual(mockdata.filter(
                                function (data) { return data.id == 4 }
                            ))
                        },
                        locals: { user_id: 10 }
                    })
        });
        it("To fail", () => {
            contact.stack[0].route.stack[1]
                .handle({ query: { id: 5 } }
                    , {
                        send: function (response) {
                            expect(response[0]).toBe(undefined)
                        },
                        locals: { user_id: 10 }
                    })
        });
    });
    describe("getAll", () => {
        beforeAll(() => {
            global.db = {
                query: function (query, variables, succeed) {
                    succeed("", mockdata)
                }
            };
        });
        it("To succeed", () => {
            contact.stack[1].route.stack[1]
                .handle({}
                    , {
                        send: function (response) {
                            expect(response).toEqual(mockdata)
                        },
                        locals: { user_id: 10 }
                    })
        });
        it("To fail", () => {
            contact.stack[1].route.stack[1]
                .handle({}
                    , {
                        send: function (response) {
                            expect(Object.equals(mockdata, otherdata)).toBe(false)
                        },
                        locals: { user_id: 10 }
                    })
        });;
    });
});

describe("contact", () => {

});