"use client"


import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/lib/actions/mongoose";
import User from "@/lib/models/user";

connectToDB();

function compare(loginPassword: string, userPassword: string) {
    return loginPassword === userPassword;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        const isPasswordValid = compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', userId: user._id });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}