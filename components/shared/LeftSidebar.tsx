"use client"
import { sidebarLinks } from '@/constants'
import { useAuth, useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react';

const LeftSidebar = () => {

    const router = useRouter();
    const pathName = usePathname();
    const { userId, isSignedIn } = useAuth();
    const { signOut } = useClerk();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = async () => {
        setIsSigningOut(true);
        await signOut({ redirectUrl: '/sign-in' });
    };

    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex flex-1 w-full flex-col gap-6 px-6">
                {sidebarLinks.map((link) => {

                    const isActive = (pathName.includes(link.route) && link.route.length > 1 || pathName === link.route)

                    const href = link.route === '/profile' ? `${link.route}/${userId}` : link.route;
                    return (
                        <Link
                            href={href}
                            key={link.label}
                            className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                            />

                            <p className={`text-light-1 max-lg:hidden  ${isActive ? "" : 'hover:text-primary-500'}`}>{link.label}</p>
                        </Link>
                    )
                })}
            </div>

            <div className='mt-10 px-6'>
                {isSignedIn && (
                    <div
                        className={`flex cursor-pointer gap-4 p-4 ${isSigningOut ? 'opacity-50 pointer-events-none' : ''}`}
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
                        <p className='text-light-2 max-lg:hidden hover:text-primary-500'>
                            {isSigningOut ? 'Logging out...' : 'Logout'}
                        </p>
                    </div>
                )}
            </div>

        </section>
    );
};

export default LeftSidebar;