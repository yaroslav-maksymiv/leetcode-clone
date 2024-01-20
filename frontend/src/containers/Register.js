import logo from '../assets/logo.png'

import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {register} from "../actions/auth";

export const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rePassword: '',
        email: ''
    })
    const {username, password, rePassword, email} = formData
    const {registered, isAuthenticated} = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
        if (registered) {
            navigate('/login')
        }
    }, [registered, isAuthenticated])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password === rePassword) {
            dispatch(register(username, password, rePassword, email))
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <img
                    className="mx-auto h-12 w-auto mb-8"
                    src={logo}
                    alt="Your Company"
                />
                <h2 className="text-center font-bold text-gray-800 mb-6">Sign up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:borderblack"
                            onChange={handleChange}
                            value={username}
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                Password
                            </label>
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:borderblack"
                            onChange={handleChange}
                            value={password}
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                Confirm Password
                            </label>
                        </div>
                        <input
                            id="rePassword"
                            name="rePassword"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:borderblack"
                            onChange={handleChange}
                            value={rePassword}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:borderblack"
                            onChange={handleChange}
                            value={email}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white rounded-md py-2 px-4 text-sm font-semibold focus:outline-none focus:ring focus:borderblack"
                    >
                        Sign up
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-500">
                    <Link to={'/login'} className="text-sm text-black">
                        Sing in?
                    </Link>
                </p>
            </div>
        </div>
    );
};
