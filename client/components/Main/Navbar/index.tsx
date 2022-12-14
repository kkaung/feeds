import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../../../store/hooks';
import AuthNav from './AuthNav';

interface Props {
    navRef: any;
}

export default function Navbar({ navRef }: Props) {
    const links = [
        { id: 1, title: 'Home', target: '/' },
        { id: 2, title: 'Sign in', target: '/signin' },
        { id: 3, title: 'Sign up', target: '/signup' },
    ];

    const { pathname } = useRouter();

    const { isAuthenticated } = useAuth();

    return (
        <nav className=" bg-gray-50" ref={navRef}>
            <div className="container mx-auto flex justify-between py-3 md:py-4">
                <Link href="/" className="text-2xl font-bold text-blue-500">
                    Feeds
                </Link>
                {isAuthenticated ? (
                    <AuthNav pathname={pathname} />
                ) : (
                    <div className="flex items-center ">
                        {links.map(({ id, title, target }) => (
                            <Link
                                href={`${target}`}
                                key={id}
                                className={`text-sm  text-gray-600/50 mx-4 ${
                                    target === pathname
                                        ? 'text-black hover:text-black'
                                        : 'hover:text-gray-500'
                                } md:text-base`}
                            >
                                {title}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
