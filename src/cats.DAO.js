import { ObjectId } from "bson"

let cats;

/**
 * Data Access Object for top cats
 */
export default class CatsDAO{
    
    // catId: { type: String, unique: true, required: true },
    // name: String,
    // imageUrl: String,
    // hits: { type: Number, default: 1 },

    static async injectDB(conn) {
        if(cats){
            return;
        }
        try {
            cats = await conn.db(process.env.DB_NAME).collection("cats");
        } catch(error){
            console.error(`Connection failed: ${error}`);
        }
    }

    /**
     * Get most searched cats
     * @returns {Promise<CatResults>} A promise that will resolve to a list of most visited Cats.
     */
    static async getTopCats() {
        let cursor
        try {
            cursor = await cats.find().sort({"hits": -1}).limit(10);
        } catch (e) {
            console.error('Failed to get top cats: ' + e);
        }
        return cursor.toArray();
    }

    static async incrementCatHits(id) {
        try {
            const updateResponse = await cats.updateOne({_id:id}, {$inc: {hits: 1}});
            return updateResponse;
          } catch (e) {
            console.error(`Increment Hits failed: ${e}`);
            return { error: e };
          }
    }

    static async insertCat(id, name, image, description) {
        try {
            const insertResponse = await cats.insertOne({_id: id, name, image, description});
            return insertResponse();
        } catch (e) {
            console.error(`Insert failed: ${e}`);
        }
    }
}