import UserModel from "../model/user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
    static async signUp(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.getUser(email);
            if (user) {
                res.status(409).json({ error: "user already exists" });
            } else {
                const postResponse = await UserModel.addUser(email, password); // TODO: hash password
                res.json(postResponse);
            }
        } catch (e) {
            console.error(`error signing up: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.getUser(email);
            if (!user) {
                res.status(404).json({ error: "user does not exist" });
            } else if (user.password === password) { // sign in successful

                const payload = {
                    userId: user._id,
                };

                const token = jwt.sign(
                    payload, 
                    process.env.JWT_SECRET, 
                    { expiresIn: "2h" }
                );

                res.status(200).json({ token: token });
            } else {
                res.status(401).json({ error: "incorrect password" });
            }
        } catch (e) {
            console.error(`error signing in: ${e}`);
            res.status(500).json({ error: e });
        }
    }
}
