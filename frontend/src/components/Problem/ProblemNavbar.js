import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../actions/auth";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/logo.png";
import user_photo from "../../assets/user_photo.png";
import {Fragment} from "react";

const navigation = [
    {name: 'Problems', href: '/', current: true},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProblemNavbar = ({}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isAuthenticated, user} = useSelector(state => state.auth)

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    const checkUserLoggedIn = () => {
        if (!isAuthenticated) {
            navigate(`/login/?redirect_url=problem`)
        }
    }

    return (
        <Disclosure as="nav" className="fixed top-0 right-0 left-0 bg-zinc-900 z-20">
            {({open}) => (
                <>
                    <div className="px-2">
                        <div className="relative h-16 w-full grid grid-cols-3">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to={'/'}>
                                        <img
                                            className="h-8 w-auto"
                                            src={logo}
                                            alt="Your Company"
                                        />
                                    </Link>
                                </div>
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
                            <div className="flex items-center justify-center gap-0.5 h-full">
                                <button
                                    onClick={checkUserLoggedIn}
                                    className="text-bold bg-neutral-700 hover:bg-neutral-600 text-white py-2 px-4 rounded-l-md flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
                                    </svg>
                                    Run
                                </button>
                                <button
                                    onClick={checkUserLoggedIn}
                                    className="text-bold bg-neutral-700 hover:bg-neutral-600 text-green-600 py-2 px-4 rounded-r-md flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"/>
                                    </svg>
                                    Submit
                                </button>
                            </div>
                            <div
                                className="absolute inset-y-0 right-0 flex items-center justify-end pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

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
                                                    <Link to={`/profile/${user.username}`}
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
                                                    </Link>
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

                </>
            )}
        </Disclosure>
    )
}

export default ProblemNavbar