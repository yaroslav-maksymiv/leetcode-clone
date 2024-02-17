import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {deleteFromSavedProblems, loadSavedProblems} from "../actions/problems";

export const Favourite = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isAuthenticated} = useSelector(state => state.auth)
    const {savedProblems, savedProblemsLoading} = useSelector(state => state.problem)

    useEffect(() => {
        dispatch(loadSavedProblems())
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem('isAuthenticated') === 'false') {
                navigate('/login?redirect_url=favourite')
            }
        }, 300)
    }, [isAuthenticated])

    const handleRemoveFromList = (problemId) => {
        deleteFromSavedProblems(problemId).then(response => {
            if (response.status === 200) {
                dispatch(loadSavedProblems())
            }
        })
    }

    return (
        <div className="w-full h-full min-h-screen pt-16">
            <div className="mx-auto max-w-5xl pt-16 px-2 sm:px-6 lg:px-8">
                <h6 className="text-3xl mb-8">Favourite</h6>
                <div>
                    {savedProblems.length > 0 ? (
                        <>
                            {savedProblems.map((problem, index) => (
                                <div key={problem.id}
                                     className="w-full flex items-center justify-between rounded-md shadow-md mb-4 py-2 px-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6">
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
                                        </div>
                                        <Link className="text-lg"
                                              to={`/problem/${problem.problem_id}`}>{index + 1}. {problem.title}</Link>
                                    </div>
                                    <div className="cursor-pointer" onClick={(e) => handleRemoveFromList(problem.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-red-600">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="text-center text-gray-500 mt-20">No problems in the list yet</div>
                    )}
                </div>
            </div>
        </div>
    )
}