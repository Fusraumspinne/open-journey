import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user"
import bcrypt from "bcryptjs"

export async function POST(req) {
    try {
        const {
            name,
            email,
            password,
            level,
            xp,
            maxXp,
            vorname,
            nachname,
            zweitname,
            geburtsjahr,
            alter,
            größe,
            gewicht
        } = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongoDB()
        await User.create({
            name,
            email,
            password: hashedPassword,
            level,
            xp,
            maxXp,
            vorname,
            nachname,
            zweitname,
            geburtsjahr,
            alter,
            größe,
            gewicht
        })

        return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
    }
}