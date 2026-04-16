import { OrganizationSwitcher, SignOutButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { dark } from '@clerk/themes'

const Topbar = async () => {
    const { userId } = await auth();

    return (
        <nav className='topbar'>
            <Link href='/' className='flex item-center gap-4'>
                <Image src='/assets/logo.png' alt='logo' height={60} width={100} />
            </Link>

            <div className='flex items-center gap-1'>
                <div className='block md:hidden '>
                    {userId && (
                        <SignOutButton>
                            <div className='flex cursor-pointer'>
                                <Image
                                    src='/assets/logout.svg'
                                    alt='logout'
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </SignOutButton>
                    )}
                </div>

                <OrganizationSwitcher
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            organizationSwitcherTrigger: 'py-2 px-4'
                        }
                    }} />

            </div>
        </nav >
    );
};

export default Topbar;
