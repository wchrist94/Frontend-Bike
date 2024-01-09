import { NextResponse } from "next/server";
import User from "../../../../@types/user";
import { connectMongoDB } from "../../../../lib/mongodb";

//GET request take the company name in params and return all users of this company after query in mongoDB

export async function POST (req : any) {
    try {
        await connectMongoDB();
        const { company } = await req.json();
        const users = await User.find({ company }).select("_id name role");
        return NextResponse.json({ users });
    } catch (error) {
        console.log(error);
    }
}