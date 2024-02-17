import React, {useEffect, useState} from 'react'

import {useSelector, useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {profileUpdate} from "../actions/profile";
import BirthdaySelects from "../components/ProfileEdit/BirthdaySelects";
import {dateOptions} from "../misc";
import PhotoEditPopup from "../components/ProfileEdit/PhotoEditPopup";

export const ProfileEdit = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isAuthenticated} = useSelector(state => state.auth)

    const [activeSet, setActiveSet] = useState('')
    const [editedUser, setEditedUser] = useState({...user})
    const [birthday, setBirthday] = useState('')

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login?redirect_url=edit-profile')
        }
    }, [isAuthenticated])

    useEffect(() => {
        setEditedUser({...user})

        if (user && user.birthday) {
            const parsedDate = new Date(user.birthday)
            const formattedDate = parsedDate.toLocaleDateString('en-US', dateOptions)
            setBirthday(formattedDate)
        }
    }, [user])

    const handleInputChange = (field, value) => {
        setEditedUser((prevUser) => ({...prevUser, [field]: value}))
    }

    const cancelEditing = () => {
        setActiveSet('')
        setEditedUser({...user})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(profileUpdate(editedUser))
        setActiveSet('')
    }

    if (user) {
        return (
            <div className="pt-20">
                <header className="bg-white mt-7">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="items-center text-3xl font-bold tracking-tight text-gray-900 flex">
                            <PhotoEditPopup editedUser={editedUser} setEditedUser={setEditedUser} handleSubmit={handleSubmit} cancelEditing={cancelEditing}/>

                            <Link to={`/user/${user.username}`} className="text-4xl">{user.username}</Link>
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <div>
                            <div className="px-4 sm:px-0">
                                <h3 className="text-2xl font-semibold leading-7 text-gray-900">Basic Info</h3>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="py-6 flex justify-between items-center">
                                        <div className="items-center flex justify-between">
                                            <dt
                                                className="text-sm font-medium leading-6 text-gray-900 w-48 mr-44">First
                                                name
                                            </dt>
                                            {activeSet === 'firstName' ? (
                                                <form style={{width: "300px"}}>
                                                    <input
                                                        id="firstName"
                                                        name="firstName"
                                                        type="text"
                                                        required
                                                        placeholder="First name"
                                                        value={editedUser.first_name}
                                                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                                                        className="block w-full rounded-md border border-gray-300 py-2 px-3 mb-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                                                    />
                                                    <button
                                                        onClick={handleSubmit}
                                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 mr-2 border border-blue-500 hover:border-transparent rounded"
                                                        type="submit"
                                                    >
                                                        Set
                                                    </button>
                                                    <button
                                                        onClick={cancelEditing}
                                                        className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-4 border border-gray-500 hover:border-transparent rounded">
                                                        Cancel
                                                    </button>
                                                </form>
                                            ) : (
                                                <div>
                                                    {editedUser.first_name ? (
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 ">
                                                            {editedUser.first_name}
                                                        </dd>
                                                    ) : (
                                                        <dd className="mt-1 text-sm leading-6 text-gray-400 ">First
                                                            name</dd>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {activeSet !== 'firstName' && (
                                            <button
                                                onClick={(e) => setActiveSet('firstName')}
                                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                                Edit set
                                            </button>
                                        )}
                                    </div>
                                    <div className="py-6 flex justify-between items-center">
                                        <div className="items-center flex justify-between">
                                            <dt
                                                className="text-sm font-medium leading-6 text-gray-900 w-48 mr-44">Last
                                                name
                                            </dt>
                                            {activeSet === 'lastName' ? (
                                                <form style={{width: "300px"}}>
                                                    <input
                                                        id="lastName"
                                                        name="lastName"
                                                        type="text"
                                                        required
                                                        placeholder="Last name"
                                                        value={editedUser.last_name}
                                                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                                                        className="block w-full rounded-md border border-gray-300 py-2 px-3 mb-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                                                    />
                                                    <button
                                                        onClick={handleSubmit}
                                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 mr-2 border border-blue-500 hover:border-transparent rounded"
                                                        type="submit"
                                                    >
                                                        Set
                                                    </button>
                                                    <button
                                                        onClick={cancelEditing}
                                                        className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-4 border border-gray-500 hover:border-transparent rounded">
                                                        Cancel
                                                    </button>
                                                </form>
                                            ) : (
                                                <div>
                                                    {editedUser.last_name ? (
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 ">
                                                            {editedUser.last_name}
                                                        </dd>
                                                    ) : (
                                                        <dd className="mt-1 text-sm leading-6 text-gray-400 ">Last
                                                            name</dd>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {activeSet !== 'lastName' && (
                                            <button
                                                onClick={(e) => setActiveSet('lastName')}
                                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                                Edit set
                                            </button>
                                        )}
                                    </div>
                                    <div className="py-6 flex justify-between items-center">
                                        <div className="items-center flex justify-between">
                                            <dt
                                                className="text-sm font-medium leading-6 text-gray-900 w-48 mr-44">Birthday
                                            </dt>
                                            {activeSet === 'birthday' ? (
                                                <BirthdaySelects setEditedUser={setEditedUser}
                                                                 cancelEditing={cancelEditing}
                                                                 handleSubmit={handleSubmit}
                                                                 birthday={user.birthday}/>
                                            ) : (
                                                <div>
                                                    {editedUser.birthday ? (
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                            {birthday}
                                                        </dd>
                                                    ) : (
                                                        <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                                            Your birthday
                                                        </dd>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {activeSet !== 'birthday' && (
                                            <button
                                                onClick={(e) => setActiveSet('birthday')}
                                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                                Edit set
                                            </button>
                                        )}
                                    </div>
                                    <div className="py-6 flex justify-between items-center">
                                        <div className="items-center flex justify-between">
                                            <dt
                                                className="text-sm font-medium leading-6 text-gray-900 w-48 mr-44">Gender
                                            </dt>
                                            {activeSet === 'gender' ? (
                                                <form style={{width: "400px"}}>
                                                    <select
                                                        value={editedUser.gender}
                                                        onChange={(e) => handleInputChange('gender', e.target.value)}
                                                        id="gender" name="gender" autoComplete="gender"
                                                        className="block w-full mb-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    >
                                                        <option value="" selected disabled>Select Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </select>
                                                    <button
                                                        onClick={handleSubmit}
                                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 mr-2 border border-blue-500 hover:border-transparent rounded"
                                                        type="submit"
                                                    >
                                                        Set
                                                    </button>
                                                    <button
                                                        onClick={cancelEditing}
                                                        className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-4 border border-gray-500 hover:border-transparent rounded">
                                                        Cancel
                                                    </button>
                                                </form>
                                            ) : (
                                                <div>
                                                    {editedUser.gender ? (
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                            {editedUser.gender[0].toUpperCase() + editedUser.gender.substring(1)}
                                                        </dd>
                                                    ) : (
                                                        <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                                            Your gender
                                                        </dd>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {activeSet !== 'gender' && (
                                            <button
                                                onClick={(e) => setActiveSet('gender')}
                                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                                Edit set
                                            </button>
                                        )}
                                    </div>
                                    {/*<div className="py-6 flex justify-between items-center">*/}
                                    {/*    <div className="items-center flex justify-between">*/}
                                    {/*        <dt*/}
                                    {/*            className="text-sm font-medium leading-6 text-gray-900 w-48 mr-44">Location*/}
                                    {/*        </dt>*/}
                                    {/*        {activeSet === 'location' ? (*/}
                                    {/*            <form style={{width: "400px"}}>*/}
                                    {/*                <div className="mb-3 flex items-center gap-2">*/}
                                    {/*                    <select*/}
                                    {/*                        id="country" name="country" autoComplete="country"*/}
                                    {/*                        className="block  mb-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">*/}
                                    {/*                        <option value="male">Male</option>*/}
                                    {/*                        <option value="female">Female</option>*/}
                                    {/*                    </select>*/}
                                    {/*                    <select*/}
                                    {/*                        id="state" name="state" autoComplete="state"*/}
                                    {/*                        className="block mb-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">*/}
                                    {/*                        <option value="male">Male</option>*/}
                                    {/*                        <option value="female">Female</option>*/}
                                    {/*                    </select>*/}
                                    {/*                    <select*/}
                                    {/*                        id="city" name="city" autoComplete="city"*/}
                                    {/*                        className="block mb-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">*/}
                                    {/*                        <option value="male">Male</option>*/}
                                    {/*                        <option value="female">Female</option>*/}
                                    {/*                    </select>*/}
                                    {/*                </div>*/}
                                    {/*                <button*/}
                                    {/*                    onClick={handleSubmit}*/}
                                    {/*                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 mr-2 border border-blue-500 hover:border-transparent rounded"*/}
                                    {/*                    type="submit"*/}
                                    {/*                >*/}
                                    {/*                    Set*/}
                                    {/*                </button>*/}
                                    {/*                <button*/}
                                    {/*                    onClick={cancelEditing}*/}
                                    {/*                    className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-4 border border-gray-500 hover:border-transparent rounded">*/}
                                    {/*                    Cancel*/}
                                    {/*                </button>*/}
                                    {/*            </form>*/}
                                    {/*        ) : (*/}
                                    {/*            <div>*/}
                                    {/*                {editedUser.location ? (*/}
                                    {/*                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">*/}
                                    {/*                        {editedUser.location}*/}
                                    {/*                    </dd>*/}
                                    {/*                ) : (*/}
                                    {/*                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">*/}
                                    {/*                        Your location*/}
                                    {/*                    </dd>*/}
                                    {/*                )}*/}
                                    {/*            </div>*/}
                                    {/*        )}*/}
                                    {/*    </div>*/}
                                    {/*    {activeSet !== 'location' && (*/}
                                    {/*        <button*/}
                                    {/*            onClick={(e) => setActiveSet('location')}*/}
                                    {/*            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">*/}
                                    {/*            Edit set*/}
                                    {/*        </button>*/}
                                    {/*    )}*/}
                                    {/*</div>*/}
                                    <div className="py-6 flex justify-between items-center">
                                        <div className="items-center flex justify-between">
                                            <dt
                                                className="text-sm font-medium leading-6 text-gray-900 w-48 mr-44">Summary
                                            </dt>
                                            {activeSet === 'summary' ? (
                                                <form style={{width: "400px"}}>
                                                    <textarea
                                                        id="summary"
                                                        name="summary"
                                                        rows={5}
                                                        required
                                                        placeholder="Tell us about yourself (interests, experience, etc.)"
                                                        value={editedUser.summary}
                                                        onChange={(e) => handleInputChange('summary', e.target.value)}
                                                        className="block w-full rounded-md border border-gray-300 py-2 px-3 mb-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                                                    />
                                                    <button
                                                        onClick={handleSubmit}
                                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 mr-2 border border-blue-500 hover:border-transparent rounded"
                                                        type="submit"
                                                    >
                                                        Set
                                                    </button>
                                                    <button
                                                        onClick={cancelEditing}
                                                        className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-4 border border-gray-500 hover:border-transparent rounded">
                                                        Cancel
                                                    </button>
                                                </form>
                                            ) : (
                                                <div>
                                                    {editedUser.summary ? (
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                            {editedUser.summary}
                                                        </dd>
                                                    ) : (
                                                        <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                                            Tell us about yourself (interests, experience, etc.)
                                                        </dd>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {activeSet !== 'summary' && (
                                            <button
                                                onClick={(e) => setActiveSet('summary')}
                                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                                Edit set
                                            </button>
                                        )}
                                    </div>

                                </dl>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

