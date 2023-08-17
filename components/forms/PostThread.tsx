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
import { UserValidation } from '@/lib/validations/user';
import * as z from "zod"
import { updateUser } from "@/lib/actions/user.action";
import { usePathname, useRouter } from "next/navigation";


const PostThread = ({ userId }: { userId: string }) => {

    const router = useRouter()
    const pathname = usePathname()

    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            thread: '',
            accountId: userId
        }
    });
    return (
        <div>
            <h1>Post thread form</h1>
        </div>
    );
};

export default PostThread;