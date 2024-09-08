
import {MdEmail, MdLocationPin} from "react-icons/md";
import {BsFillTelephoneFill} from "react-icons/bs";
import {FaFacebook, FaInstagram, FaYoutube} from "react-icons/fa";
import {FaSquareXTwitter} from "react-icons/fa6";

function Footer() {
    return (
        <div className="w-full grid grid-cols-2 grid-cols-12 py-2 bg-customGreen text-black">
            <div
                className="col-start-2 mx-8 lg:m-0 col-span-1 md:m-0 md:col-start-6 md:col-span-2 col-start-3 col-span-2 font-nonito">
                <h4 className="text-lg xl:text-xl 3xl:text-2xl font-medium font-kalam">QUICK LINKS</h4>
                <span className="block w-full border-t border-black mb-3"></span>

                <a href="/"><p
                    className="text-sm xl:text-base 3xl:text-xl mb-1 w-1 transform hover:translate-x-2 transition duration-300 ease-in-out hover:text-customPurple cursor-pointer">Home</p>
                </a>
                <a href="/#about"><p
                    className="text-sm xl:text-base 3xl:text-xl mb-1 w-1 transform hover:translate-x-2 transition duration-300 ease-in-out hover:text-customPurple cursor-pointer">About</p>
                </a>
                <a href="/maintenance"><p
                    className="text-sm xl:text-base 3xl:text-xl mb-1 w-1 transform hover:translate-x-2 transition duration-300 ease-in-out hover:text-customPurple cursor-pointer">News</p>
                </a>
            </div>
            <div
                className="col-start-1 ml-8 md:col-start-9 md:col-span-3 md:m-0 lg:m-0 col-start-6 font-nonito col-span-2 ">
                <h4 className="text-lg xl:text-xl 3xl:text-2xl font-kalam font-medium">CONTACT</h4>
                <span className="block w-full border-t border-black mb-3"></span>
                <div className="flex items-center gap-1 mb-3 hover:text-customPurple cursor-pointer">
                    <MdLocationPin className="size-4 xl:size-5 2xl:size-6 3xl:size-7"></MdLocationPin>
                    <p className="text-sm xl:text-base 3xl:text-xl">Berlin, Germany</p>
                </div>
                <div className="flex items-end gap-1 mb-3 hover:text-customPurple cursor-pointer">
                    <BsFillTelephoneFill className="size-4 xl:size-5 2xl:size-6 3xl:size-7"></BsFillTelephoneFill>
                    <p className="text-sm xl:text-base 3xl:text-xl">(+49) 0500 3335</p>
                </div>
                <div className="flex items-end gap-1 mb-3 hover:text-customPurple cursor-pointer">
                    <MdEmail className="size-4 xl:size-5 2xl:size-6 3xl:size-7"></MdEmail>
                    <p className="text-sm xl:text-base 3xl:text-xl">info@bucket-list.com</p>
                </div>
            </div>
            <div
                className="lg:col-start-9 mx-8 mt-8 lg:m-0 md:col-start-6 md:m-0 md:mt-8 md:col-span-2 col-span-1 font-karla">
                <h4 className="text-lg xl:text-xl 3xl:text-2xl font-kalam font-medium ">SOCIALS</h4>
                <span className="block w-full border-t border-black mb-3"></span>
                <div className="flex">
                    <FaFacebook
                        className=" transform hover:-translate-y-1 transition duration-300 ease-in-out hover:text-customPurple cursor-pointer size-4 xl:size-5 2xl:size-6 3xl:size-7"
                    ></FaFacebook>
                    <FaSquareXTwitter
                        className=" ml-2 transform hover:-translate-y-1 transition duration-300 ease-in-out hover:text-customPurple cursor-pointer size-4 xl:size-5 2xl:size-6  3xl:size-7"
                    ></FaSquareXTwitter>
                    <FaInstagram
                        className=" ml-2 transform hover:-translate-y-1 transition duration-300 ease-in-out hover:text-customPurple cursor-pointer size-4 xl:size-5 2xl:size-6  3xl:size-7"
                        size="1rem"></FaInstagram>
                    <FaYoutube
                        className=" ml-2 transform hover:-translate-y-1 transition duration-300 ease-in-out hover:text-customPurple cursor-pointer size-4 xl:size-5 2xl:size-6  3xl:size-7"
                    ></FaYoutube>
                </div>
            </div>
        </div>
    );
}

export default Footer;