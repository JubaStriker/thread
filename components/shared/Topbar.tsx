import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Topbar = () => {
    return (
        <nav className='topbar'>
            <Link href='/' className='flex item-center gap-4'>
                <Image src='/assets/logo.svg' alt='logo' height={28} width={28} />
                <p className='text-heading-3-bold text-light-1 max-xs:hidden'>Threads</p>
            </Link>

            <div className='flex items-center gap-1'>
                <div className='block md:hidden '>
                    {/* <SignedIn>

                    </SignedIn> */}
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
                </div>

                <OrganizationSwitcher
                    appearance={{
                        elements: {
                            organizationSwitcherTrigger: 'py-2 px-4'
                        }
                    }} />

            </div>
        </nav >
    );
};

export default Topbar;