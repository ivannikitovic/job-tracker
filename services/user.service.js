import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export default class UserService {
    static async createUser(userData) {
        try {
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                return { error: "Email already in use." };
            }

            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(userData.password, salt);
            const newUser = new User({
                ...userData,
                password: hashedPassword,
            });
            await newUser.save();

            return newUser;
        } catch (error) {
            if (error.name == "ValidationError") {
                return { error: error.message };
            } else {
                throw error;
            }
        }
    }

    static async signInUser(email, password) {
        try {
            if (!email || !password) {
                return { error: "Missing email or password." };
            }

            const user = await User.findOne({ email });
            if (!user) {
                return { error: "User does not exist." };
            }

            const isPasswordValid = await bcryptjs.compare(
                password,
                user.password
            );

            if (!isPasswordValid) {
                return { error: "Incorrect password." };
            }

            return user;
        } catch (error) {
            throw error;
        }
    }
}
