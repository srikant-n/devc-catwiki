const axios = require("axios");
const catController = require("../src/catController");
const catModel = require("../src/catModel");

describe("Server API tests", () =>{

    before(async () => {
        await catModel.collection.drop();
        await model.init();
        await model.syncIndexes();
          // Add user
        const newUser = new userModel({
            email: email,
            password: password,
            name: name,
          });
          const data = await newUser.save();    
          id = "" + data._id;
      });

    it("get top 10 breed names and image", () =>{

    });
    it("get top 10 breed names and info", () =>{});
    it("get breeds based on search query", () =>{});
    it("error on empty breed search", () => {});
    it("get data for Bengal cats on selecting Bengal breed", () =>{});
    it("get more pgotos for Bengal cats on selecting Bengal breed photos", () =>{});
});