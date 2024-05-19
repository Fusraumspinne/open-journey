import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        level: {
            type: Number
        },
        xp: {
            type: Number
        },
        maxXp: {
            type: Number
        },
        vorname: {
            type: String
        },
        nachname: {
            type: String
        },
        zweitname: {
            type: String
        },
        geburtsjahr: {
            type: String
        },
        alter: {
            type: String
        },
        größe: {
            type: String
        },
        gewicht: {
            type: String
        }
    },
    { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;