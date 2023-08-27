"use client"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { Textarea } from "../ui/textarea";
import { createThread } from "@/lib/actions/thread.actions";
import { useOrganization } from "@clerk/nextjs";
import { addMemberToCommunity, createCommunity } from "@/lib/actions/community.action";




const PostThread = ({ userId }: { userId: string }) => {

    const router = useRouter()
    const pathname = usePathname()
    const { organization } = useOrganization();


    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            accountId: userId
        }
    });

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {


        if (organization) {
            await createCommunity(organization.id, organization.name, organization.slug, organization.imageUrl, "organization bio", userId)
            await addMemberToCommunity(organization.id, userId);
        }

        const data = await createThread({
            text: values.thread,
            author: userId,
            communityId: organization ? organization.id : null,
            path: pathname,
        })

        router.push("/");


    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-10 flex flex-col justify-start gap-10"
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-gray-200">
                                Content
                            </FormLabel>
                            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                                <Textarea
                                    rows={15}

                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary-500">
                    Post thread
                </Button>
            </form>

        </Form>
    );
};

export default PostThread;