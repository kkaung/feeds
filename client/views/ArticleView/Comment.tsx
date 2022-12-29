import Image from 'next/image';

import { useAuth } from '@/store/hooks';
import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

export default function Comment() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="flex flex-col ">
            <div className="p-4 text-sm border-t border-l border-r rounded-tl rounded-tr text-black/90">
                Hello comment_!
            </div>
            <div className="py-2 px-4 flex items-center justify-between bg-gray-200/40 border rounded-bl rounded-br">
                <div className="flex items-center">
                    <Image
                        src="/assets/images/smiley-cyrus.jpeg"
                        width={25}
                        height={25}
                        alt="profile"
                        className="rounded-full sm:w-[30px] sm:h-[30px]"
                    />{' '}
                    <span className="text-[13px] text-blue-500 mx-2">Moon</span>
                    <span className="text-[10px] text-gray-500/80 text-light">
                        December 26, 2022
                    </span>
                </div>
                {isAuthenticated && (
                    <button>
                        <MdDeleteForever className="text-gray-600/80" />
                    </button>
                )}
            </div>
        </div>
    );
}
