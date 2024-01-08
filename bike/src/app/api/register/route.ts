import { NextResponse } from "next/server";

export async function POST (req : any) {
    try {
        const { name, email, password } = await req.json();

        console.log(name, email, password);

        return NextResponse.json({message : "User created successfully"}, {status : 201});

    } catch (error) {
        return NextResponse.json({message : "An error occured"}, {status : 500});
    }
}