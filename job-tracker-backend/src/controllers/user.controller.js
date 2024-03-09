import UserService from "../services/user.service.js";

export default class UserController {
    static async signUp(req, res, next) {
        try {
            const userData = req.body;
            const user = await UserService.createUser(userData);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await UserService.signInUser(email, password);
            res.status(200).json(token);
        } catch (error) {
            next(error);
        }
    }
}
