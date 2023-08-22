import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Thread - Search",
    description: "A Next.js 13 Meta Thread Application"
}
const Page = async ({ params }: { params: { id: string } }) => {

    const user = await currentUser()
    if (!user) {
        return null;
    }

    const userInfo = await fetchUser(params.id);

    if (!userInfo?.onboarded) redirect('/onboarding');
    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>
        </section>
    );
};

export default Page;