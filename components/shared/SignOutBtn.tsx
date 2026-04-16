"use client"

import { useClerk } from '@clerk/nextjs';
import Image from 'next/image';

const SignOutBtn = () => {
    const { signOut } = useClerk();

    return (
        <div
            className='flex cursor-pointer'
            onClick={() => signOut({ redirectUrl: '/sign-in' })}
        >
            <Image
                src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24}
            />
        </div>
    );
};

export default SignOutBtn;
