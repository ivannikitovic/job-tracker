import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export default class UserService {
    static async createUser(email, password) {
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return { error: "Email already in use." };
            }

            const newUser = new User({ email, password });
            await newUser.save();

            return newUser;
        } catch (error) {
            console.error(`Error creating user: ${error}`);
            throw error;
        }
    }

    static async signInUser(email, password) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return { error: "User does not exist." };
            }

            if (user.password === password) {
                const payload = {
                    userId: user._id,
                };

                const options = {
                    expiresIn: "2h",
                };

                const secret = process.env.JWT_SECRET;

                const token = jwt.sign(
                    payload,
                    secret,
                    options
                );

                return { token };
            } else {
                return { error: "Incorrect password." };
            }
        } catch (error) {
            console.error(`Error signing in: ${error}.`);
            throw error;
        }
    }
}
