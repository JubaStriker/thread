"use client"

import { useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from 'react';

const SignOutBtn = () => {
    const { signOut } = useClerk();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = async () => {
        setIsSigningOut(true);
        await signOut({ redirectUrl: '/sign-in' });
    };

    return (
        <div
            className={`flex cursor-pointer ${isSigningOut ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={handleSignOut}
        >
            {isSigningOut ? (
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
            ) : (
                <Image
                    src='/assets/logout.svg'
                    alt='logout'
                    width={24}
                    height={24}
                />
            )}
        </div>
    );
};

export default SignOutBtn;
