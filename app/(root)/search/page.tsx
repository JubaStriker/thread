
import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import { profileTabs } from "@/constants";
import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Thread - Search",
    description: "A Next.js 13 Meta Thread Application"
}
const Page = async () => {

    const user = await currentUser()
    if (!user) {
        return null;
    }

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect('/onboarding');

    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25
    });
    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>

            <Searchbar routeType='search' />

            <div className="mt-14 flex flex-col gap-9">
                {result.users.length === 0 ?
                    <p className="no-result">No users</p>
                    :
                    <>
                        {result.users.map((person) =>
                            <UserCard
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                imgUrl={person.image}
                                personType="User"
                            />)}
                    </>
                }
            </div>
        </section>
    );
};

export default Page;