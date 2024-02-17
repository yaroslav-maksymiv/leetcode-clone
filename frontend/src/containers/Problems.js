import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {loadProblemsList, getRandomProblem} from "../actions/problems";
import {useDispatch, useSelector} from "react-redux";
import {useDebounce} from 'use-debounce';
import Loader from "../components/Loader";

export const Problems = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [category, setCategory] = useState(null)
    const [difficulty, setDifficulty] = useState(null)
    const [status, setStatus] = useState(null)
    const [search, setSearch] = useState('')
    const [searchValue] = useDebounce(search, 700)

    const {problemsList, problemsListLoading, problemsListError} = useSelector(state => state.problem)

    useEffect(() => {
        const params = new URLSearchParams()

        if (difficulty) {
            params.append('difficulty', difficulty)
        }
        if (status) {
            params.append('status', status)
        }
        if (search) {
            params.append('search', search)
        }

        let newUrl = `${location.pathname}`
        if (params.toString()) {
            newUrl += `?${params.toString()}`
        }
        window.history.replaceState(null, '', newUrl)
    }, [difficulty, status, searchValue, location.pathname])

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const newDifficulty = params.get('difficulty')
        const newStatus = params.get('status')
        const newSearch = params.get('search')
        if (newDifficulty !== null) setDifficulty(newDifficulty)
        if (newStatus !== null) setStatus(newStatus)
        if (newSearch !== null) setSearch(newSearch)
    }, [])

    const handlePickRandomProblem = () => {
        getRandomProblem({difficulty, category}).then(response => {
            if (response.data) {
                navigate(`/problem/${response.data.problem_id}`)
            }
        })
    }

    useEffect(() => {
        dispatch(loadProblemsList({difficulty, status, search}))
    }, [difficulty, status, searchValue])

    return (
        <div className="w-full h-full bg-zinc-800 min-h-screen pt-16">
            <div className="mx-auto max-w-7xl pt-16 px-2 sm:px-6 lg:px-8 grid grid-cols-[auto,270px] gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} id="difficulty"
                                className="bg-zinc-800 text-white text-sm rounded-md block w-36 p-2">
                            <option value="" selected>Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} id="status"
                                className="bg-zinc-800 text-white text-sm rounded-md block w-36 p-2">
                            <option value="" selected>Status</option>
                            <option value="solved">Solved</option>
                            <option value="attempted">Attempted</option>
                        </select>
                        <div
                            className="rounded-md text-gray-600 border border-gray-500 bg-zinc-800 flex items-center px-1.5 gap-2 py-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="w-5 h-5 font-bold">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                            </svg>
                            <input
                                value={search} onChange={(e) => setSearch(e.target.value)}
                                type="text" placeholder="Search questions"
                                className="focus:ring-0 rounded-md bg-zinc-800 text-gray-300 border-none p-0"/>
                        </div>
                        <button onClick={handlePickRandomProblem} className="flex items-center gap-2 text-green-400">
                            <div className="rounded-full w-8 h-8 bg-green-400 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                                </svg>

                            </div>
                            <div>Pick one</div>
                        </button>
                    </div>
                    {problemsListLoading ? (
                        <div className="mt-20">
                            <Loader/>
                        </div>
                    ) : problemsListError || problemsList.length === 0 ? (
                        <div className="text-gray-400">No problems found</div>
                    ) : problemsList.length > 0 && (
                        <table className="w-full table-auto text-white">
                            <thead>
                            <tr className="border-b border-gray-500">
                                <th className="text-start font-normal text-gray-400 py-3 px-3">Status</th>
                                <th className="text-start font-normal text-gray-400">Title</th>
                                <th className="text-start font-normal text-gray-400">Acceptance</th>
                                <th className="text-start font-normal text-gray-400">Difficulty</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-300 font-normal">
                            {problemsList.map((problem, index) => {
                                return (
                                    <tr key={problem.id} className={`${(index + 1) % 2 === 0 && 'bg-zinc-600'}`}>
                                        <td className="pl-3 py-3">
                                            {problem.user_status && (
                                                <>
                                                    {problem.user_status === 'solved' && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 24 24"
                                                             stroke-width="1.5" stroke="currentColor"
                                                             className="w-5 h-5 text-green-600">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                        </svg>
                                                    )}
                                                    {problem.user_status === 'attempted' && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 24 24"
                                                             stroke-width="1.5" stroke="currentColor"
                                                             className="w-5 h-5 text-yellow-600">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
                                                        </svg>
                                                    )}
                                                </>
                                            )}
                                        </td>
                                        <td className="h-10">
                                            <Link
                                                to={`/problem/${problem.problem_id}`}>{index + 1}. {problem.title}</Link>
                                        </td>
                                        <td>
                                            {problem.acceptance?.toFixed(1)}%
                                        </td>
                                        <td>
                                            {problem.difficulty === 'Easy' && (
                                                <div className="text-sm text-cyan-600">{problem.difficulty}</div>
                                            )}
                                            {problem.difficulty === 'Medium' && (
                                                <div className="text-sm text-yellow-600">{problem.difficulty}</div>
                                            )}
                                            {problem.difficulty === 'Hard' && (
                                                <div className="text-sm text-red-500">{problem.difficulty}</div>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="w-full">
                    {/*<div className="h-full bg-zinc-600 rounded-lg"></div>*/}
                </div>
            </div>
        </div>
    )
}