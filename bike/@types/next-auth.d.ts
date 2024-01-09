import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            company: string;
            role: string;
        } & DefaultSession["user"];
    }
}