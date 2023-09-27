import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let user;

export default class UserModel {
    static async injectDB(conn) {
        if (user) {
            return;
        }
        try {
            user = await conn.db(process.env.MONGODB_DB_NAME).collection("user");
        } catch (e) {
            console.error(`Unable to establish collection handles in userModel: ${e}`);
        }
    }

    static async addUser(email, password) {
        try {
            const userDoc = { 
                email, 
                password, 
            };
            return await user.insertOne(userDoc);
        } catch (e) {
            console.error(`unable to post user: ${e}`);
            return { error: e };
        }
    }

    static async getUser(email) {
        try {
            return await user.findOne({ email: email });
        } catch (e) {
            console.error(`unable to get user: ${e}`);
            return { error: e };
        }
    }
}
