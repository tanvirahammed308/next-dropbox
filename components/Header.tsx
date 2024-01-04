import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ThemeToggoler } from "./ThemeToggoler";

const Header = () => {
    return (
        <header className="flex items-center justify-between py-2 px-2">
        <Link href={'/'} className='flex items-center space-x-5'>
            <div className='bg-blue-600 w-fit'>
                <Image src={"https://www.shareicon.net/data/128x128/2015/08/31/93614_dropbox_512x512.png"} alt='logo' width={50} height={50} 
                
                // className='invert'
                >

                </Image>
            </div>
            <h1 className='font-bold text-xl'>
                Next-Dropbox
            </h1>
        </Link>
        <div className="px-5 flex space-x-5 items-center">
            <ThemeToggoler />
            {/* <UserButton afterSignOutUrl="/"/> */}
            <UserButton afterSignOutUrl="/">Login</UserButton>
            <SignedOut>
            <SignInButton afterSignInUrl="/dashboard" mode="modal"/>
           </SignedOut>
        </div>
        </header>
    );
};

export default Header;