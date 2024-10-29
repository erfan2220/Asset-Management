import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [currentLang, setCurrentLang] = useState(Cookies.get('language') || 'en');

    const handleLanguageChange = (e:any) => {
        const selectedLang = e.target.value;
        setCurrentLang(selectedLang);
        Cookies.set('language', selectedLang, { expires: 7, path: '/' });
        window.location.reload();
    };

    useEffect(() => {
        const lang = Cookies.get('language');
        if (lang && lang !== currentLang) {
            setCurrentLang(lang);
        }
    }, [Cookies.get('language')]);

    return (
        <div className="flex flex-row items-center bg-[#14141A] justify-between pl-[32px] pr-[20px] py-[20px]">
            <h2 className="text-white">Logo EAM</h2>

            <div className="flex flex-row items-center gap-[20px]">
                <select
                    value={currentLang}
                    onChange={handleLanguageChange}
                    className="text-white bg-[#14141A] border-none outline-none cursor-pointer"
                >
                    <option value="en">English</option>
                    <option value="fa">فارسی</option>
                </select>
                <img className="cursor-pointer" src="/images/Navbar/Gear.svg" alt="Settings"/>
                <img className="cursor-pointer" src="/images/Navbar/Profile.svg" alt="Profile"/>
            </div>
        </div>
    );
};

export default Navbar;
