import { SessionStrategy } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../@types/user";
import Company from "../../../../../@types/company";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers : [
        CredentialsProvider({
            name : "Credentials",
            credentials : {},

            async authorize(credentials : any) {
                const {email, password} = credentials;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({email});

                    if(!user) {
                        return null;
                    }

                    const passwordCheck = await bcrypt.compare(password, user.password);

                    if (!passwordCheck) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    session : {
        strategy : "jwt" as SessionStrategy,
    },
    secret : process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session ({session, user}: {session: any, user: any}) {
            
            await connectMongoDB();
            const user1 = await User.findOne({ email: session.user.email });
            session.user.company = user1.company;
            session.user.role = user1.role;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}