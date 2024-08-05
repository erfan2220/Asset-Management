import React from 'react';

const Navbar = () => {
    return (
        <div className="flex flex-row items-center bg-[#14141A] justify-between pl-[32px] pr-[20px] py-[20px]">

            <h2 className="text-white">Logo EAM</h2>
            <div className="flex flex-row items-center gap-[20px]">
                <img className="cursor-pointer" src="/images/Navbar/Gear.svg" alt=""/>
                <img className="cursor-pointer" src="/images/Navbar/Profile.svg" alt=""/>
            </div>

        </div>
    );
};

export default Navbar;