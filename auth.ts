import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import UserService from "./services/user.service";
import dbConnect from "./lib/dbConnect";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string(),
                        password: z.string(), // TODO: Add password validation
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    await dbConnect();
                    const user = await UserService.signInUser(email, password);

                    if ("error" in user) {
                        return null;
                    } else {
                        return user;
                    }
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.userId = token.id as string;
            return session;
        },
    },
});
