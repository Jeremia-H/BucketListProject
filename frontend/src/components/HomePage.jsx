import Nav from "./Nav";
import {GoGoal} from "react-icons/go";
import Footer from "./Footer";
import {useState} from "react";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from 'react-toastify';
import { UnauthorizedError, ConflictError } from '../errors/http_errors.ts';
import { login, signUp } from '../network/listdatas_api.ts';

async function onSubmit(credentials) { //this function gets handled by handleSubmit
    try {
        const user = await login(credentials)
        console.log(user);
        return user;
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            console.log(error);
        } else {
        }
        console.error(error)
        return error;
    }
}

async function onSubmit2(credentials) {
    try {
      const newUser = await signUp(credentials);
      console.log(newUser);
        return newUser;
    } catch (error) {
      if (error instanceof ConflictError) {
        console.log(error.message);
    } else {
    }
    console.error(error)
        return error;
    }
  }
function Homepage() {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [currentWindow, setCurrentWindow] = useState(1);

    const [hovered, setHovered] = useState(false);
    const [hovered2, setHovered2] = useState(false);
    const [hovered3, setHovered3] = useState(false);
    const openModal = () => {
        setIsOpen(true);
        setCurrentWindow(1);
        setHovered(false);
    };

    const openModal2 = () => {
        setIsOpen(true);
        setCurrentWindow(2);
        setHovered2(false);
    };

    const closeModal = () => {
        setIsOpen(false);
        setCurrentWindow(1); // Zurück zu Fenster 1, wenn Modal geschlossen wird
    };

    const switchToWindow1 = () => {
        setCurrentWindow(1);
        setHovered(false);
    };

    const switchToWindow2 = () => {
        setCurrentWindow(2);
        setHovered2(false);
    };

    const validationSchema2 = Yup.object({
        username: Yup.string()
            .required('Required'),
        password: Yup.string()
            .min(8, 'Min. 8 characters')
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    });

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Required'),
        password: Yup.string()
            .min(8, 'Min. 8 characters')
            .required('Required'),
    });

    return (

        <div className="flex flex-col h-screen hide-scrollbar">
            <div className="h-24 bg-white flex align-items-center mx-2 sm:m-0 justify-center gap-56">
                <div className="flex gap-6 sm:gap-36 md:gap-40">
                    <div className="h-24 bg-white flex align-items-center justify-center gap-2">
                        <GoGoal className="size-8 sm:size-10"></GoGoal>
                        <h1 className="w-16 hidden sm:block sm:w-24 lg:w-32 font-kalam sm:text-lg lg:text-2xl">Bucket List</h1>
                    </div>
                    <ul className="w-full justify-end flex gap-2 sm:!gap-4 lg:!gap-8 list-none m-0 p-0 text-xs sm:text-sm lg:text-base 3xl:text-xl text-customGreen font-medium font-nonito items-center">
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
                                <button
                                    className={`${hovered3 ? 'bg-[#f9f8fd] text-[#000000]' : 'bg-customPurple text-white'} ml-2 w-16 sm:w-20 sm:m-0 md:w-28 lg:w-36 3xl:w-40 text-xs rounded-tl-3xl rounded-bl-3xl py-2 px-3 lg:text-base 3xl:text-xl hover:bg-customPurple`}
                                    onClick={openModal}>
                                    Login
                                </button>
                        </li>
                        <li className="md:-ml-3 lg:-ml-7">
                                <button
                                    className="w-20 -ml-1 sm:-ml-3 md:m-0 md:w-28 lg:w-36 3xl:w-40 text-xs bg-customCardBg rounded-tr-3xl rounded-br-3xl py-2 px-3 lg:text-base 3xl:text-xl hover:bg-customPurple hover:text-white"
                                    onMouseEnter={() => setHovered3(true)}
                                    onMouseLeave={() => setHovered3(false)}
                                    onClick={openModal2}>

                                    Sign up
                                </button>
                        </li>
                    </ul>
                </div>
            </div>

            <main className="relative flex-1 bg-customBg">
                <img
                    src="/hp-image/img.png"
                    alt="Hintergrundbild"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <p className="text-[#E6E6FA] font-kalam text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold w-2/3 lg:w-1/2 ">
                        Unleash Your Adventure: Create, Explore, and Conquer Your Ultimate Bucket List!
                    </p>
                    <button onClick={openModal} className="mx-auto text-[#E6E6FA] border-[#E6E6FA] mt-10 rounded-lg p-3 bg-transparent border-2 hover:scale-105 hover:text-white hover:border-white">Start today</button>
                </div>
            </main>

                <Footer></Footer>
            {/* Modal-Fenster und Overlay */}
            {isOpen && (
                <div>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={closeModal}
                    ></div>

                    {/* Dialog-Fenster */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 font-nonito">
                        <div className="bg-white pb-8 rounded-lg shadow-lg w-2/3 sm:w-1/2 lg:w-2/5 xl:w-96 mx-auto">
                            {/* Fenster 1 */}
                            {currentWindow === 1 && (
                                <div>
                                    <div className="flex justify-around">
                                        <button className={`rounded-tl-lg p-3 mb-4 w-1/2  ${hovered ? 'bg-[#f9f8fd] text-[#000000]' : 'bg-customPurple text-white'}`} >Login</button>
                                        <button className=" p-3 mb-4 w-1/2 rounded-tr-lg bg-customBg hover:bg-customPurple hover:text-white"
                                                onMouseEnter={() => setHovered(true)}
                                                onMouseLeave={() => setHovered(false)}
                                                onClick={switchToWindow2}
                                        >Sign up
                                        </button>
                                    </div>

                                    <Formik
                                        initialValues={{ username: '', password: '' }}
                                        validationSchema={validationSchema}
                                        onSubmit={(values) => {
                                            onSubmit(values);
                                            console.log(values);
                                            toast.error('Password is incorrect!', {
                                                position: "top-right",
                                                autoClose: 3000, // Auto close after 3 seconds
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                            navigate('/App/Map');
                                        }}
                                    >
                                        {({ handleSubmit }) => (
                                            <Form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
                                                <div className="flex flex-col mx-4">
                                                    <label>Username</label>
                                                     <Field
                                                        name="username"
                                                        type="input"
                                                        placeholder="user18X"
                                                        className="border-1 rounded-lg focus:outline-customPurple"
                                                    />
                                                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                                                </div>

                                                <div className="flex flex-col mx-4">
                                                    <label>Password</label>
                                                    <Field
                                                        name="password"
                                                        type="password"
                                                        placeholder="*********"
                                                        className="border-1 rounded-lg focus:outline-customPurple"
                                                    />
                                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                                </div>

                                                <button type="submit" className="mt-4 px-4 mx-4 py-2 bg-customPurple text-white rounded">
                                                    Login
                                                </button>
                                                <button className="mt-2 px-4 mx-4 py-2 bg-gray-500 text-white rounded"
                                                        onClick={closeModal}>
                                                    Close
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            )}

                            {/* Fenster 2 */}
                            {currentWindow === 2 && (
                                <div>
                                    <div className="flex justify-around">
                                        <button className="p-3 mb-4 w-1/2 rounded-tl-lg bg-customBg hover:bg-customPurple hover:text-white"
                                                onMouseEnter={() => setHovered2(true)}
                                                onMouseLeave={() => setHovered2(false)}
                                                onClick={switchToWindow1}
                                        >Login
                                        </button>
                                        <button className={`rounded-tr-lg p-3 mb-4 w-1/2 ${hovered2 ? 'bg-[#f9f8fd] text-[#000000]' : 'bg-customPurple text-white'}`}

                                        >Sign up
                                        </button>
                                    </div>

                                    <Formik
                                        initialValues={{ username: '', password: '', confirmPassword: '' }}
                                        validationSchema={validationSchema2}
                                        onSubmit={(values) => {
                                            onSubmit2(values);
                                            console.log(values);
                                            navigate('/App/Map');
                                        }}
                                    >
                                        {({ handleSubmit }) => (
                                            <Form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
                                                <div className="flex flex-col mx-4">
                                                    <label>Username</label>
                                                     <Field
                                                        name="username"
                                                        type="input"
                                                        placeholder="user18X"
                                                        className="border-1 rounded-lg focus:outline-customPurple"
                                                    />
                                                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                                                </div>

                                                <div className="flex flex-col mx-4">
                                                    <label>Password</label>
                                                    <Field
                                                        name="password"
                                                        type="password"
                                                        placeholder="*********"
                                                        className="border-1 rounded-lg focus:outline-customPurple"
                                                    />
                                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                                </div>

                                                <div className="flex flex-col mx-4">
                                                    <label>Confirm Password</label>
                                                    <Field
                                                        name="confirmPassword"
                                                        type="password"
                                                        placeholder="*********"
                                                        className="border-1 rounded-lg focus:outline-customPurple"
                                                    />
                                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                                                </div>

                                                <button type="submit" className="mt-4 px-4 mx-4 py-2 bg-customPurple text-white rounded">
                                                    Sign up
                                                </button>
                                                <button className="mt-2 px-4 mx-4 py-2 bg-gray-500 text-white rounded"
                                                        onClick={closeModal}>
                                                    Close
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Homepage;
