"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";


export const AuthProvider = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};