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
        </nav>
    );
};

export default Topbar;