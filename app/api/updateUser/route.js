import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function PUT(req) {
    try {
        const {
            email,
            level,
            xp,
            maxXp,
            vorname,
            nachname,
            zweitname,
            geburtsjahr,
            alter,
            größe,
            gewicht,
            geschlecht,
            lastUpdate,
            zähneGeputztMorgens,
            zähneGeputztMittags,
            zähneGeputztAbends,
            geduscht,
            fingernägelGeschnitten,
            fußnägelGeschnitten
        } = await req.json();

        await connectMongoDB();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "Benutzer nicht gefunden." }, { status: 404 });
        }

        user.level = level
        user.xp = xp
        user.maxXp = maxXp
        user.vorname = vorname
        user.nachname = nachname
        user.zweitname = zweitname
        user.geburtsjahr = geburtsjahr
        user.alter = alter
        user.größe = größe
        user.gewicht = gewicht
        user.geschlecht = geschlecht
        user.lastUpdate = lastUpdate,
        user.zähneGeputztMorgens = zähneGeputztMorgens,
        user.zähneGeputztMittags = zähneGeputztMittags,
        user.zähneGeputztAbends = zähneGeputztAbends,
        user.geduscht = geduscht,
        user.fingernägelGeschnitten = fingernägelGeschnitten,
        user.fußnägelGeschnitten = fußnägelGeschnitten

        await user.save();

        return NextResponse.json({ message: "Benutzername erfolgreich aktualisiert." }, { status: 200 });
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Benutzernamens:", error);
        return NextResponse.json({ message: "Ein Fehler ist aufgetreten." }, { status: 500 });
    }
}
