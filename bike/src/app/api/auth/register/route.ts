import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../types/user";
import bcrypt from "bcryptjs";
import Company from "../../../../../types/company";

export async function POST (req : any) {
    try {
        const { name, email, password, company} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 12);

        await connectMongoDB();
        await Company.create({name:company});

        const savedCompany = await Company.findOne({name:company});
        //Create a new iuser with a reference to the company
        await User.create({name, email, password:hashedPassword, company:savedCompany._id});

        return NextResponse.json({message : "User created successfully"}, {status : 201});

    } catch (error) {
        return NextResponse.json({message : "An error occured"}, {status : 500});
    }
}