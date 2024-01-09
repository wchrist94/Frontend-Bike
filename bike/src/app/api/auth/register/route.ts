import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../@types/user";
import bcrypt from "bcryptjs";
import Company from "../../../../../@types/company";

export async function POST (req : any) {
    try {
        //Get the user data from the request body role can be in the body or not
        const { name, email, password, company, role} = await req.json();

        const hashedPassword = await bcrypt.hash(password, 12);

        await connectMongoDB();
        await Company.create({name:company});

        //Create a new iuser with a reference to the company
        await User.create({name, email, password:hashedPassword, company, role});

        return NextResponse.json({message : "User created successfully"}, {status : 201});

    } catch (error) {
        return NextResponse.json({message : "An error occured"}, {status : 500});
    }
}

