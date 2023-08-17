"use server"

import { connectToDb } from "../mongoose"

export async function updateUser(): Promise<void> {
    connectToDb();
}