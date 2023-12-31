import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Vibenet - Create Thread",
    description: "A Next.js 13 Meta Thread Application"
}

const Page = async () => {

    const user = await currentUser()
    if (!user) {
        return null;
    }

    const userInfo = await fetchUser(user.id)

    if (!userInfo?.onboarded) redirect('/onboarding')

    return (
        <>
            <h1 className="head-text">Create Thread</h1>
            <PostThread userId={userInfo._id} />
        </>

    );
};

export default Page;