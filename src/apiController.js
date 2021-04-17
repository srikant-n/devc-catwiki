const axios = require("axios");
const catController = require("./catController");

const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: { "x-api-key": process.env.CAT_API_KEY },
});

/**
 * Format data to send to client.
 * @param {Array<Object>} breedData Images and cat breed response from API.
 * @returns Formatted object for cat data.
 */
function formatCatData(breedData) {
  const data = breedData[0].breeds[0];
  // console.log(breedData[0].breeds);
  data.images = breedData.map((breed) => breed.url);
  return data;
}

const catApi = {
  getBreedNames(req, res) {
    if (!req.params.query || req.params.query.length === 0) {
      res.send([]);
      return;
    }

    let breedNames = [];
    api
      .get("/breeds/search", {
        params: {
          q: req.params.query,
        },
      })
      .then((response) => {
        breedNames = response.data.map((breed) => ({ id: breed.id, name: breed.name }));
      })
      .catch((error) => {
        console.error(error);
      })
      .then(() => res.send(breedNames));
  },
  getBreedData(req, res) {
    if (!req.params.id) {
      res.send([]);
      return;
    }
    let data;
    api
      .get("/images/search", {
        params: {
          breed_id: req.params.id,
          limit: 15,
        },
      })
      .then(async (response) => {
        if (response.length === 0) throw Error("No data found");
        data = formatCatData(response.data);
        await catController
          .incrementCatHits(data.id)
          .then((success) => {
            if (!success) throw Error("Increment failed");
          })
          .catch((e) => {
            console.error(e);
            catController
              .insertCat(data.id, data.name, data.images[0], data.description)
              .then()
              .catch((error) => console.error(error));
          });
      })
      .catch((error) => {
        console.error(error);
      })
      .then(() => res.send(data));
  },
};

module.exports = catApi;
