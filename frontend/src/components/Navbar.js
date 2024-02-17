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
        <Disclosure as="nav" className="absolute top-0 right-0 left-0 bg-zinc-900 z-19">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5"/>
                                    <span className="sr-only">Open main menu</span>

                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to={'/'}>
                                        <img
                                            className="h-8 w-auto"
                                            src={logo}
                                            alt="Your Company"
                                        />
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-zinc-900 text-white' : 'text-zinc-300 hover:bg-zinc-700 hover:text-white',
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

                                {/* Profile dropdown */}
                                {isAuthenticated && user ? (
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button
                                                className="outline-none flex rounded-full bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-800">
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
                                                className="absolute right-0 z-10 mt-6 w-48 origin-top-right rounded-md bg-zinc-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    <div to={`/profile/${user.username}`}
                                                          className="flex justify-start p-2">
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
                                                    </div>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            to={'/edit-profile'}
                                                            className={classNames(active ? 'bg-zinc-100' : '', 'block px-4 py-2 text-base text-white bg-zinc-800 hover:bg-zinc-700')}
                                                        >
                                                            Edit Profile
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            to={'/favourite'}
                                                            className={classNames(active ? 'bg-zinc-100' : '', 'block px-4 py-2 text-base text-white bg-zinc-800 hover:bg-zinc-700')}
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
                                                            className={classNames(active ? 'bg-zinc-100' : '', 'flex justify-between items-center px-4 py-2 text-base text-white bg-zinc-800 hover:bg-zinc-700')}
                                                        >
                                                            Sign out
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                                 fill="currentColor" className="w-5 h-5">
                                                                <path fill-rule="evenodd"
                                                                      d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
                                                                      clip-rule="evenodd"/>
                                                                <path fill-rule="evenodd"
                                                                      d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z"
                                                                      clip-rule="evenodd"/>
                                                            </svg>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                ) : (
                                    <div className="flex space-x-3">
                                        <Link className="text-zinc-300 hover:text-white"
                                              to={'/register'}>Register</Link>
                                        <p className="text-zinc-300">or</p>
                                        <Link className="text-zinc-300 hover:text-white" to={'/login'}>Sing in</Link>
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
                                        item.current ? 'bg-zinc-900 text-white' : 'text-zinc-300 hover:bg-zinc-700 hover:text-white',
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