'use server'
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDb } from "../mongoose"

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

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDb();

    // Calculate the number of of posts to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    // Only fetch the top level posts that have no parents.
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: User })
        .populate({
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: "_id name parentId image"
            }
        })

    const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext };
}

export async function fetchThreadById(id: string) {
    connectToDb();
    try {

        // TODO: Populate community
        const thread = Thread.findById(id)
            .populate({
                path: 'author',
                model: User,
                select: '_id id name image'
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: '_id id name parentId image'
                    },
                    {
                        path: 'children',
                        model: Thread,
                        populate: {
                            path: 'author',
                            model: User,
                            select: '_id id name parentId image'
                        }
                    }
                ]
            }).exec();

        return thread;
    }
    catch (error: any) {
        throw new Error(`Failed to fetch thread by Id: ${error.message}`)
    }
}

export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string
) {
    connectToDb();
    try {
        // Find original thread by Id
        const originalThread = await Thread.findById(threadId);

        if (!originalThread) {
            throw new Error(`No thread found to comment`)
        }

        // Create new thread with the comment text
        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId
        })

        // Save the new thread
        const savedCommentThread = await commentThread.save();

        // Update the original thread with the new comment thread
        originalThread.children.push(savedCommentThread._id)

        // Save the original thread
        await originalThread.save();

        revalidatePath(path)
    }
    catch (error: any) {
        throw new Error(`Failed to post comment: ${error.message}`)
    }
}