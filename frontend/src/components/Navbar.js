import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import logo from '../assets/logo.png'
import user_photo from '../assets/user_photo.png'
import {logout} from "../actions/auth";

const navigation = [
    {name: 'Problems', href: '/', current: true},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {
    const dispatch = useDispatch()

    const {isAuthenticated, user} = useSelector(state => state.auth)

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5"/>
                                    <span className="sr-only">Open main menu</span>

                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src={logo}
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5"/>
                                    <span className="sr-only">View notifications</span>
                                </button>

                                {/* Profile dropdown */}
                                {isAuthenticated && user ? (
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button
                                                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5"/>
                                                <span className="sr-only">Open user menu</span>
                                                {user.photo ? (
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={user.photo}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={user_photo}
                                                        alt=""
                                                    />
                                                )}
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-6 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    <Link to={`/profile/${user.username}`} className="flex justify-start p-2">
                                                        {user.photo ? (
                                                            <img
                                                                className="h-8 w-8 rounded-full"
                                                                src={user.photo}
                                                                alt=""
                                                            />
                                                        ) : (
                                                            <img
                                                                className="h-8 w-8 rounded-full"
                                                                src={user_photo}
                                                                alt=""
                                                            />
                                                        )}
                                                        <p className="ml-3 text-white text-lg">{user.username}</p>
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            to={'/edit-profile'}
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-base text-white bg-gray-800 hover:bg-gray-700')}
                                                        >
                                                            Edit Profile
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            to={'/favourite'}
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-base text-white bg-gray-800 hover:bg-gray-700')}
                                                        >
                                                            Favourite
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            onClick={handleLogout}
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-base text-white bg-gray-800 hover:bg-gray-700')}
                                                        >
                                                            Sign out
                                                            <i className="fa-solid fa-arrow-right-from-bracket text-white"></i>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                ) : (
                                    <div className="flex space-x-3">
                                        <Link className="text-gray-300 hover:text-white"
                                              to={'/register'}>Register</Link>
                                        <p className="text-gray-300">or</p>
                                        <Link className="text-gray-300 hover:text-white" to={'/login'}>Sing in</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}