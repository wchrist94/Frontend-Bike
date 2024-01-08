import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../types/user";
import bcrypt from "bcryptjs";

export async function POST (req : any) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 12);

        await connectMongoDB();
        await User.create({name, email, password:hashedPassword});

        return NextResponse.json({message : "User created successfully"}, {status : 201});

    } catch (error) {
        return NextResponse.json({message : "An error occured"}, {status : 500});
    }
}