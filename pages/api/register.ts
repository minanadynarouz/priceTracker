"use client"

import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/lib/actions/mongoose";
import User from "@/lib/models/user";

connectToDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({ email, password });
        await newUser.save();
        res.status(200).json({ message: 'Registration successful' });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

