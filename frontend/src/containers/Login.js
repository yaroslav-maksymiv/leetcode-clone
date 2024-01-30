import logo from '../assets/logo.png'

import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/auth";

export const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const redirectUrl = new URLSearchParams(location.search).get('redirect_url')


    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const {isAuthenticated} = useSelector(state => state.auth)
    useEffect(() => {
        if (isAuthenticated) {
            if (redirectUrl) {
                navigate(`/${redirectUrl}`)
            } else {
                navigate('/')
            }

        }
    }, [isAuthenticated])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(formData.username, formData.password))
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <img
                    className="mx-auto h-12 w-auto mb-8"
                    src={logo}
                    alt="Your Company"
                />
                <h2 className="text-center font-bold text-gray-800 mb-6">Sign in</h2>
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
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                            onChange={handleChange}
                            value={formData.username}
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
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white rounded-md py-2 px-4 text-sm font-semibold focus:outline-none focus:ring focus:border-indigo-500"
                    >
                        Sign in
                    </button>
                </form>
                <p className="mt-4 flex justify-between text-sm text-gray-500">
                    <Link to={'/password-reset'} className="text-sm text-black">
                        Forgot password?
                    </Link>
                    <Link to={'/register'} className="text-sm text-black">
                        Sing up?
                    </Link>
                </p>
            </div>
        </div>
    );
};
