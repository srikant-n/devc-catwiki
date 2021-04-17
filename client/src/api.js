import axios from "axios";

if(process.env.NODE_ENV != "production") {
  axios.defaults.baseURL="http://localhost:5000/";
}


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
