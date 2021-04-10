const axios = require("axios");
const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require("../app");
const catController = require("../src/catController");
const catModel = require("../src/catModel");
const MongoClient = require("mongodb").MongoClient;

chai.use(chaiHttp);

let db;

const topCats = [
  { _id: "abys", name: "Abyssinian", description:"Description 1", image: "https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg", hits: 1 },
  { _id: "aege", name: "Aegean", description:"Description 2", image: "https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg", hits: 9 },
  { _id: "bamb", name: "Bambino", description:"Description 3", image: "https://cdn2.thecatapi.com/images/5AdhMjeEu.jpg", hits: 10 },
];

describe("Server API tests", () => {
  before(async () => {
    MongoClient.connect(process.env.DB_PATH_TEST, {
      poolSize: 50,
      wtimeout: 2500,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .catch((err) => {
        console.error(err.stack);
        process.exit(1);
      })
      .then(async (client) => {
        db = await client.db(process.env.DB_NAME).collection("cats");
        db.deleteMany({ _id: { $exists: true } }).then((data) => console.log(data));
        db.insertMany(topCats);
      });
  });

  it("get top 3 breed names and image", () => {});
  it("get breeds based on search query", () => {});
  it("error on empty breed search", () => {});
  it("get data for Bengal cats on selecting Bengal breed", () => {});
  it("get more photos for Bengal cats on selecting Bengal breed photos", () => {});
  it("get top 4 breed names and info including bengal cat with 1 hits", () => {});
});
