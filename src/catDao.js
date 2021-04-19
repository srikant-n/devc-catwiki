// import { ObjectId } from "bson"

let cats;

/**
 * Data Access Object for top cats
 */
module.exports = {
    
    // catId: { type: String, unique: true, required: true },
    // name: String,
    // imageUrl: String,
    // hits: { type: Number, default: 1 },

    async injectDB(conn) {
        if(cats){
            return;
        }
        try {
            cats = await conn.db(process.env.DB_NAME).collection("cats");
            this.cats = cats;
        } catch(error){
            console.error(`Connection failed: ${error}`);
        }
    },

    /**
     * Get most searched cats
     * @returns {Promise<CatResults>} A promise that will resolve to a list of most visited Cats.
     */
    async getTopCats() {
        let cursor
        try {
            cursor = await cats.find().sort({"hits": -1}).limit(10);
        } catch (e) {
            console.error('Failed to get top cats: ' + e);
        }
        return cursor.toArray();
    },

    /**
     * 
     * @param {string} id Cat's id
     * @returns Promise<Boolean> was increment successful
     */
    async incrementCatHits(id) {
        try {
            const updateResponse = await cats.updateOne({_id:id}, {$inc: {hits: 1}});
            return updateResponse.modifiedCount > 0;
          } catch (e) {
            console.error(`Increment Hits failed: ${e}`);
            return false;
          }
    },

    /**
     * 
     * @param {string} id Cat's id.
     * @param {string} name Cat's name/breed.
     * @param {string} image URL for cat's photo.
     * @param {string} description Description for the cat
     * @returns Promise
     */
    async insertCat(id, name, image, description) {
        try {
            const insertResponse = await cats.insertOne({_id: id, name, image, description});
            return insertResponse;
        } catch (e) {
            console.error(`Insert failed: ${e}`);
            return e;
        }
    }
}