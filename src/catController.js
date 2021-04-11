const CatsDAO = require("./catDao");

const catsController = {
    getTopCats(req,res) {
        CatsDAO.getTopCats().then(data => {
            res.send(data);
        }).catch(err => {
            console.error("Get top cats: " + err);
            res.statusMessage = "Error fetching top cats";
            res.status(500).end();
        });
    },
    incrementCatHits(id){
      return CatsDAO.incrementCatHits(id);
    },
    async insertCat(id, name, image, description) {
      try {
        await CatsDAO.insertCat(id, name, image, description);
      } catch(err) {
        console.error(err);
      }
    },
};

module.exports = catsController;