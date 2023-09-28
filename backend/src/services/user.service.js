import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export default class UserService {
    static async createUser(userData) {
        try {
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                throw createHttpError(409, "Email already in use");
            }

            const newUser = new User(userData);
            await newUser.save();

            return newUser;
        } catch (error) {
            if (error.name == "ValidationError") {
                throw createHttpError(400, error.message);
            } else {
                throw error;
            }
        }
    }

    static async signInUser(email, password) {
        try {
            if (!email || !password) {
                throw createHttpError(400, "Missing email or password.");
            }

            const user = await User.findOne({ email });
            if (!user) {
                throw createHttpError(401, "User does not exist.");
            }

            if (user.password !== password) {
                throw createHttpError(401, "Incorrect password.");
            }

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
        } catch (error) {
            throw error;
        }
    }
}
