import logo from '../assets/logo.png'

import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetPasswordConfirm} from "../actions/auth";

export const PasswordResetConfirmation = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {uid, token} = useParams()

    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        newPassword: '',
        reNewPassword: ''
    })
    const {newPassword, reNewPassword} = formData

    const {isAuthenticated} = useSelector(state => state.auth)
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
        if (requestSent) {
            navigate('/login')
        }
    }, [isAuthenticated, requestSent])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(resetPasswordConfirm(uid, token, newPassword, reNewPassword))
        setRequestSent(true)
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <img
                    className="mx-auto h-12 w-auto mb-8"
                    src={logo}
                    alt="Your Company"
                />
                <h2 className="text-center font-bold text-gray-800 mb-6">Reset Password Confirm</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
                                Password
                            </label>
                        </div>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                            onChange={handleChange}
                            value={newPassword}
                        />
                    </div>
                     <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="reNewPassword" className="block text-sm font-medium text-gray-600">
                                Repeat Password
                            </label>
                        </div>
                        <input
                            id="reNewPassword"
                            name="reNewPassword"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                            onChange={handleChange}
                            value={reNewPassword}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white rounded-md py-2 px-4 text-sm font-semibold focus:outline-none focus:ring focus:border-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
