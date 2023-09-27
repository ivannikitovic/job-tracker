import UserService from "../services/user.service.js";

export default class UserController {
    static async signUp(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await UserService.createUser(email, password);

            if (user.error) {
                res.status(409).json({ error: user.error }); // email in use
            } else {
                res.status(201).json(user); // user created
            }
        } catch (error) { //TODO: ValidationError handling
            console.error(`Error signing up: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            const signInResult = await UserService.signInUser(email, password);

            if (signInResult.error) {
                res.status(401).json({ error: signInResult.error }); // bad credentials
            } else {
                res.status(200).json(signInResult); // return token
            }
        } catch (error) {
            console.error(`Error signing in: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
