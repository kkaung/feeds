import React from 'react';
import { RiHeart3Line } from 'react-icons/ri';

export default function Feed() {
    return (
        <div className="py-5 border-b border-gray-500/20">
            <div className="flex justify-between items-start">
                <div className="flex">
                    <div className="w-[40px] h-[40px] rounded-full bg-red-200"></div>
                    <div className="ml-3">
                        <div className="cursor-pointer text-blue-600 text-lg hover:underline hover:text-blue-400">
                            Anonymous
                        </div>
                        <div className="text-sm text-gray-500/80 font-light">
                            October 9, 2022
                        </div>
                    </div>
                </div>
                <div className="flex items-center border-[1px] py-1 px-3 text-sm border-blue-600 rounded cursor-pointer text-blue-600 hover:bg-blue-500 hover:text-white">
                    <RiHeart3Line className="mr-1 " />
                    145
                </div>
            </div>
            <div className="my-2">
                <h1 className="text-xl font-semibold">Hello World</h1>
                <p className="text-gray-500/80">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quos non consequatur doloribus, veniam omnis, quibusdam,
                    alias quod illum voluptates odit sint tempora soluta. Optio
                    saepe et non sint molestias minus.
                </p>
            </div>
            <div className="flex justify-between items-center">
                <div className="cursor-pointer text-gray-500/80 hover:text-blue-600">
                    Read more...
                </div>
                <div className="flex text-sm text-gray-500/60">
                    <div className="border rounded-full px-2 py-1">
                        software
                    </div>
                    <div className="border rounded-full px-2 py-1 ml-1">
                        trending
                    </div>
                </div>
            </div>
        </div>
    );
}
