import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.action";

// Copy paste most of the code as it is from the /onboarding

export const metadata = {
    title: "Vibenet - Edit Profile",
    description: "A Next.js 13 Meta Thread Application"
}

async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const userData = {
        id: user.id,
        objectId: userInfo?._id,
        username: userInfo ? userInfo?.username : user.username,
        name: userInfo ? userInfo?.name : user.firstName ?? "",
        bio: userInfo ? userInfo?.bio : "",
        image: userInfo ? userInfo?.image : user.imageUrl,
    };

    return (
        <>
            <h1 className='head-text'>Edit Profile</h1>
            <p className='mt-3 text-base-regular text-light-2'>Make any changes</p>

            <section className='mt-12'>
                <AccountProfile user={userData} btnTitle='Continue' />
            </section>
        </>
    );
}

export default Page;