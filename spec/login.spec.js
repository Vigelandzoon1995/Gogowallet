const fs = require('fs');
var mockdata = JSON.parse(fs.readFileSync('../users.json', 'utf8'));
var login = require("../routes/login");

describe("GetUserById", () => {
    beforeAll(() => {
        global.db = {
            query: function (query, variables, succeed) {
                //make a mock db object instead of a real database connection to test the isolated express unit
                //this will always return affectedRows: 1
                succeed("", mockdata.filter(
                    function (data) { return data.user_id == variables[0] }
                ))
            }
        };
    });
    it("To succeed", () => {
        login.stack[0].route.stack[0]
            .handle({ body: { id: 2 } }
                , { json: function (response) { console.log(response) } })
    });
});