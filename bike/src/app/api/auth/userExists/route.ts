import User from "../../../../../types/user";
import { connectMongoDB } from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";
import Company from "../../../../../types/company";

export async function POST(req : any) {
    try {
        await connectMongoDB();
        const { email, company } = await req.json();
        const user = await User.findOne({ email }).select("_id");
        const companyID = await Company.findOne({ name: company }).select("_id");
        if (companyID) {
            return NextResponse.json({ companyID });
        }
        console.log(user);
        return NextResponse.json({ user});
    } catch (error) {
        console.log(error);
    }
}