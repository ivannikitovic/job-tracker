import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export default class UserService {
    static async createUser(userData) {
        try {
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                throw createHttpError(409, "Email already in use");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            const newUser = new User({
                ...userData,
                password: hashedPassword,
            });
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

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw createHttpError(401, "Incorrect password.");
            }

            const payload = {
                userId: user._id,
            };

            const options = {
                expiresIn: "2h",
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, options);

            return { token };
        } catch (error) {
            throw error;
        }
    }
}
