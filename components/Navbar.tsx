"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LoginModel from './LoginModel';

// below are icons in array for the navbar
const navIcons = [
    { src: '/assets/icons/search.svg', alt: 'search' },
    { src: '/assets/icons/black-heart.svg', alt: 'heart' },
    { src: '/assets/icons/user.svg', alt: 'user', onclick: 'handleUserClick' }

]

const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleUserClick = () => {
        setShowLoginModal(true);
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
    };


    return (
        <header className="w-full">
            <nav className="nav items-center justify-between p-4">
                <Link href="/" className="flex flex-col items-center">
                    <Image
                        src="/assets/icons/logo.svg"
                        alt="logo"
                        width={60}
                        height={60}
                    />
                    <p className="nav-logo">
                        Price<span className="text-sky-700">Pal</span>
                    </p>
                </Link>

                {/* here we loop over the var array defined above to get the icons */}
                <div className="flex items-center gap-5">
                    {/* using {} to write dynamic code Called dynamic block of code */}
                    {navIcons.map((icon) => (
                        <Image
                            key={icon.alt}
                            src={icon.src}
                            alt={icon.alt}
                            width={28}
                            height={28}
                            className="object-contain cursor-pointer"
                            onClick={icon.alt === 'user' ? handleUserClick : undefined}
                        />
                    ))}
                </div>
            </nav>
            <hr className="animated-hr" />
            {showLoginModal && <LoginModel onClose={handleCloseModal} />}
        </header>
    );
};

export default Navbar;
