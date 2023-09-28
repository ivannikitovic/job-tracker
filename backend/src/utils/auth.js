import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export const extractTokenFromHeader = (header) => {
    if (!header) {
        throw createHttpError(401, "Authorization header missing");
    }

    const [bearer, token] = header.split(" ");
    if (bearer !== "Bearer" || !token) {
        throw createHttpError(401, "Invalid authorization header");
    }

    return token;
};

export const verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken;
    } catch (error) {
        throw createHttpError(401, "Invalid token");
    }
};

export const authenticateUser = (req, res, next) => {
    try {
        const token = extractTokenFromHeader(req.headers.authorization);
        const decodedToken = verifyToken(token);
        if (req.params.user_id !== decodedToken.userId) {
            throw createHttpError(401, "Unauthorized");
        }
        next();
    } catch (error) {
        next(error);
    }
};
