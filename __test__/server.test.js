const axios = require("axios");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");
const MongoClient = require("mongodb").MongoClient;

chai.use(chaiHttp);

let db;

const topCats = [
  {
    _id: "abys",
    name: "Abyssinian",
    description: "Description 1",
    image: "https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg",
    hits: 1,
  },
  {
    _id: "aege",
    name: "Aegean",
    description: "Description 2",
    image: "https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg",
    hits: 9,
  },
  {
    _id: "bamb",
    name: "Bambino",
    description: "Description 3",
    image: "https://cdn2.thecatapi.com/images/5AdhMjeEu.jpg",
    hits: 10,
  },
];

describe("Server API tests", () => {
  before(async () => {
     await MongoClient.connect(process.env.DB_PATH_TEST, {
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
        await db.deleteMany({ _id: { $exists: true } });
        await db.insertMany(topCats);
      });
  });

  it("get top 3 breed names and image", () => {
    return chai
      .request(app)
      .get("/cats/top")
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        data = res.body;
        expect(data).to.have.lengthOf(3);
        expect(data[0]._id).to.equal(topCats[2]._id);
        expect(data[1]._id).to.equal(topCats[1]._id);
        expect(data[2]._id).to.equal(topCats[0]._id);
      })
      .catch((err) => {
        throw err;
      });
  });

  it("gets breeds based on search query", () => {
    return chai
      .request(app)
      .get("/api/breeds/search/ba")
      .then((res) => {
        expect(res).to.have.status(200);
        data = res.body;
        expect(data).to.have.lengthOf(4);
        expect(data[0]).to.have.property("id");
        expect(data[0]).to.have.property("name");
        expect(data[0]).to.not.have.property("weight");
      })
      .catch((err) => {
        throw err;
      });
  });

  it("gets empty array on empty breed search", () => {
    const q = "";
    return chai
      .request(app)
      .get("/api/breeds/search/" + q)
      .then((res) => {
        expect(res).to.have.status(200);
        data = res.body;
        expect(data).to.have.lengthOf(0);
      })
      .catch((err) => {
        throw err;
      });
  });

  it("gets data for Bengal cats on selecting Bengal breed", () => {
    return chai
      .request(app)
      .get("/api/breeds/beng")
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        data = res.body;
        expect(data.id).to.equal("beng");
        expect(data.name).to.deep.equal("Bengal");
        expect(data.images).to.be.an("array");
      })
      .catch((err) => {
        throw err;
      });
  });

  it("get top 4 breed names and info including bengal cat with 1 hits", () => {
    return chai
      .request(app)
      .get("/cats/top")
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        data = res.body;
        expect(data).to.have.lengthOf(4);
        expect(data[0]._id).to.equal(topCats[2]._id);
        expect(data[1]._id).to.equal(topCats[1]._id);
      })
      .catch((err) => {
        throw err;
      });
  });
});
