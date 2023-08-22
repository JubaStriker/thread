"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDb } from "../mongoose"
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path
}: Params): Promise<void> {

    connectToDb();

    try {
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true
            },
            { upsert: true }
        );

        if (path === '/profile/edit') {
            revalidatePath(path);
        }
    }
    catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`)
    }
}

export async function fetchUser(userId: string) {
    try {
        connectToDb();
        return await User
            .findOne({ id: userId })
        // .populate(({
        //     path: 'communities',
        //     model: Community
        // }))
    }
    catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}


export async function fetchUserPosts(userId: string) {
    try {
        connectToDb()

        // TODO: Populate community
        const threads = await User.findOne({ id: userId })
            .populate({
                path: 'threads',
                model: Thread,
                populate: {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name image id'
                    }
                }
            })

        return threads;
    }
    catch (error: any) {
        throw new Error(`Failed to fetch post: ${error.message}`)
    }
}


export async function fetchUsers({
    userId,
    searchString = '',
    pageNumber = 1,
    pageSize = 20,
    sortby = 'desc'
}: {
    userId: string,
    searchString?: string,
    pageNumber?: number,
    pageSize?: number,
    sortby?: SortOrder;
}) {
    connectToDb()
    try {
        const skipAmount = (pageNumber - 1) * pageSize;

        const regex = new RegExp(searchString, 'i');

        const query: FilterQuery<typeof User> = {
            id: { $ne: userId }
        }

        if (searchString.trim() !== '') {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } },
            ]
        }

        const sortOptions = { createdAt: sortby };

        const userQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize)

        const totalUserCount = await User.countDocuments(query)

        const users = await userQuery.exec();
        const isNext = totalUserCount > skipAmount + users.length;

        return { users, isNext };
    }
    catch (error: any) {
        throw new Error(`Failed to fetch users: ${error.message}`)
    }
}