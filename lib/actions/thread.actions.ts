'use server'
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDb } from "../mongoose"
import { redirect } from "next/navigation";

interface Params {
    text: string,
    author: string | any,
    communityId: string | null,
    path: string
}

export async function createThread({ text, author, communityId, path }: Params) {

    try {
        connectToDb();

        const createdThread = await Thread.create({
            text,
            author,
            community: null,
        });

        // Update user

        const response = await User.findOneAndUpdate({ _id: author }, {
            $push: { threads: createdThread._id }

        }, { upsert: true })

        revalidatePath(path)
        return response;
    }
    catch (error: any) {
        throw new Error(`Error creating thread: ${error.message}`)
    }
}