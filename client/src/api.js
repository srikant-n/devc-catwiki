import axios from "axios";

if (process.env.NODE_ENV !== "production") {
  axios.defaults.baseURL = "http://localhost:5000/";
}

/**
 * Get search results.
 * @param {string} search Search query.
 * @returns {Promise} Search results.
 */
export function getSearchResults(search) {
  return axios
    .get(`/breeds/search/${search}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
      return [];
    });
}

export function getBreedInfo(id) {
  return `asd${id}`;
}

/**
 * Get data on top 10 most searched cats.
 * @returns {Promise} Info on the top searched cats.
 */
export function getTopCats() {
  return axios
    .get("/cats/top")
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
      return [];
    });
}
