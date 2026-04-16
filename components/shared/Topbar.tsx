import { OrganizationSwitcher } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { dark } from '@clerk/themes'
import SignOutBtn from './SignOutBtn';

const Topbar = async () => {
    const { userId } = await auth();

    return (
        <nav className='topbar'>
            <Link href='/' className='flex item-center gap-4'>
                <Image src='/assets/logo.png' alt='logo' height={60} width={100} />
            </Link>

            <div className='flex items-center gap-1'>
                <div className='block md:hidden'>
                    {userId && <SignOutBtn />}
                </div>

                <OrganizationSwitcher
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            organizationSwitcherTrigger: 'py-2 px-4',
                            organizationSwitcherTriggerIcon: 'text-white',
                            organizationPreviewTextContainer: 'text-white',
                            organizationPreviewMainIdentifier: 'text-white',
                            organizationPreviewSecondaryIdentifier: 'text-white',
                            organizationPreviewAvatarContainer: 'text-white',
                        }
                    }} />

            </div>
        </nav>
    );
};

export default Topbar;
