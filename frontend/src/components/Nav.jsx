import {IoMenu} from "react-icons/io5";
import {FaHome} from "react-icons/fa";
import {BiSolidFoodMenu} from "react-icons/bi";
import {LuCalendarClock} from "react-icons/lu";
import {MdLogin} from "react-icons/md";
import {MdMoped} from "react-icons/md";
import {FaCircleInfo} from "react-icons/fa6";
import { GoGoal } from "react-icons/go";
import {useState} from "react";

const Nav = ({className}) => {

    return (
        <div className={`${className} flex gap-40`}>
            <div className="h-24 bg-white flex align-items-center justify-center gap-2">
                <GoGoal className="size-10"></GoGoal>
                <h1 className="w-24 font-kalam text-lg">Bucket List</h1>
            </div>
            <ul className="w-full justify-end md:flex md:gap-4 lg:gap-8 list-none m-0 p-0 text-xs md:text-sm lg:text-base 3xl:text-xl text-customGreen font-medium font-nonito items-center">
                <li className="relative group">
                    <a href="/">Home</a>
                    <span
                        className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-customPurple transition-all duration-300 group-hover:w-full"></span>

                </li>
                <li className="relative group">
                    <a href="/#about">About</a>
                    <span
                        className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-customPurple transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="relative group">
                    <a href="/maintenance">News</a>
                    <span
                        className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-customPurple transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li>
                    <a href="/maintenance">
                        <button
                            className="text-white md:w-28 lg:w-36 3xl:w-40 text-xs bg-customPurple rounded-tl-3xl rounded-bl-3xl py-2 px-3 lg:text-base 3xl:text-xl hover:bg-customPurple">
                            Login
                        </button>
                    </a>
                </li>
                <li className="md:-ml-3 lg:-ml-7">
                    <a href="/maintenance">
                        <button
                            className=" md:w-28 lg:w-36 3xl:w-40 text-xs bg-customCardBg rounded-tr-3xl rounded-br-3xl py-2 px-3 lg:text-base 3xl:text-xl hover:bg-customPurple hover:text-white">
                            Sign up
                        </button>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Nav;