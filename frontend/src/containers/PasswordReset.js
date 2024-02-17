import logo from '../assets/logo.png'

import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {passwordResetNull, resetPassword} from "../actions/auth";
import {toast} from "react-toastify";

export const PasswordReset = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        email: ''
    })
    const {email} = formData
    const {isAuthenticated, passwordReset} = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (passwordReset) {
            toast.success("Reset password link was sent to your email", {
                position: "top-center",
                className: 'app-notification',
                autoClose: 5000,
                hideProgressBar: true,
                pauseOnHover: true,
                theme: "dark",
            })
            dispatch(passwordResetNull())
        } else if (passwordReset === false) {
            setErrors(['The e-mail address is not assigned to any user account.'])
        }
    }, [passwordReset])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        dispatch(resetPassword(email))

        setIsButtonDisabled(true)
        setTimeout(() => setIsButtonDisabled(false), 5000)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 py-36">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <img
                    className="mx-auto h-12 w-auto mb-8"
                    src={logo}
                    alt="Your Company"
                />
                <h2 className="text-center font-bold text-gray-800 mb-6">Reset Password</h2>
                <div className="my-4">
                    {errors.map(error => (
                        <div className="mb-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                             role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                            onChange={handleChange}
                            value={email}
                        />
                    </div>
                    <button
                        disabled={isButtonDisabled}
                        type="submit"
                        className="w-full bg-black text-white rounded-md py-2 px-4 text-sm font-semibold focus:outline-none focus:ring focus:border-indigo-500"
                    >
                        Submit
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
