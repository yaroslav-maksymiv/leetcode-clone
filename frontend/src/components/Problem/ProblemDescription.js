import Discussion from "./Discussion";
import {useEffect, useRef, useState} from "react";
import Submissions from "./Submissions";
import Solution from "./Solution";
import {useDebounce} from "use-debounce";
import {toggleDislike, toggleLike, toggleProblemToSaved} from "../../actions/problems";
import useUpdateEffect from "../../hooks/use-update-effect";
import {toast} from "react-toastify";

const ProblemDescription = ({activeTab, setActiveTab, isAuthenticated, problem, problemData, problemStatus}) => {

    const discussionRef = useRef(null)

    const [likesCount, setLikesCount] = useState(problem.likes)
    const [dislikesCount, setDislikesCount] = useState(problem.dislikes)

    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)
    const [likedDebounce] = useDebounce(liked, 700)
    const [dislikedDebounce] = useDebounce(disliked, 700)
    const [userChangedLiked, setUserChangedLiked] = useState(false)
    const [userChangedDisliked, setUserChangedDisliked] = useState(false)
    const [saved, setSaved] = useState(problem.saved)
    const [userChangedSaved, setUserChangedSaved] = useState(false)
    const [savedDebounce] = useDebounce(saved, 700)

    useEffect(() => {
        if (problem) {
            setSaved(problem.saved)
            setLiked(problem.user_liked)
            setDisliked(problem.user_disliked)
            setLikesCount(problem.likes)
            setDislikesCount(problem.dislikes)
        }
    }, [problem])

    useUpdateEffect(() => {
        if (userChangedSaved) {
            toggleProblemToSaved(problem.id, saved).then(response => {
            })
        }
    }, [savedDebounce])

    useUpdateEffect(() => {
        if (userChangedDisliked && problem) {
            toggleDislike(problem.id).then(response => {
                setLikesCount(response.data.likes)
                setDislikesCount(response.data.dislikes)
            })
        }
    }, [dislikedDebounce])

    useUpdateEffect(() => {
        if (userChangedLiked && problem) {
            toggleLike(problem.id).then(response => {
                setLikesCount(response.data.likes)
                setDislikesCount(response.data.dislikes)
            })
        }
    }, [likedDebounce])

    const handleScrollToDiscussion = () => {
        setActiveTab('description')
        setTimeout(() => {
            discussionRef.current?.scrollIntoView({behavior: 'smooth'})
        }, 200)
    }

    const handleSavedToggle = () => {
        setSaved(prev => !prev)
        setUserChangedSaved(true)
    }

    const handleLikedToggle = () => {
        if (isAuthenticated) {
            setLiked(prev => !prev)
            setUserChangedLiked(true)
            setUserChangedDisliked(false)
            setDisliked(false)
        } else {
            toast.error("Sign in required", {
                position: "top-center",
                className: 'app-notification',
                autoClose: 2000,
                hideProgressBar: true,
                pauseOnHover: true,
                theme: "dark",
            })
        }
    }

    const handleDislikedToggle = () => {
        if (isAuthenticated) {
            setDisliked(prev => !prev)
            setUserChangedDisliked(true)
            setUserChangedLiked(false)
            setLiked(false)
        } else {
            toast.error("Sign in required", {
                position: "top-center",
                className: 'app-notification',
                autoClose: 2000,
                hideProgressBar: true,
                pauseOnHover: true,
                theme: "dark",
            })
        }
    }

    return (
        <div className="layout-block bg-zinc-800 w-full h-full rounded-md border border-gray-500 flex flex-col">
            <div
                className="layout-block__top bg-neutral-700 w-full min-h-10 h-10 rounded-t-md flex items-center justify-between ps-1">
                <div className="flex items-center">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`${activeTab === 'description' ? 'text-white' : 'text-zinc-400'} text-sm bg-neutral-700 hover:bg-neutral-600 py-1 px-3 rounded-md flex items-center gap-1`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-blue-600 ">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                        </svg>
                        Description
                    </button>
                    {/*<button*/}
                    {/*    onClick={() => setActiveTab('solution')}*/}
                    {/*    className={`${activeTab === 'solution' ? 'text-white' : 'text-zinc-400'} text-sm bg-neutral-700 hover:bg-neutral-600 py-1 px-3 rounded-md flex items-center gap-1`}>*/}
                    {/*    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
                    {/*         stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-blue-600">*/}
                    {/*        <path stroke-linecap="round" stroke-linejoin="round"*/}
                    {/*              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>*/}
                    {/*    </svg>*/}

                    {/*    Solution*/}
                    {/*</button>*/}
                    <button
                        onClick={() => setActiveTab('submissions')}
                        className={`${activeTab === 'submissions' ? 'text-white' : 'text-zinc-400'} text-sm bg-neutral-700 hover:bg-neutral-600 py-1 px-3 rounded-md flex items-center gap-1`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-blue-600">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/>
                        </svg>

                        Submissions
                    </button>
                </div>
            </div>

            <div
                className="layout-block bg-zinc-800 w-full h-full rounded-md flex flex-col overflow-y-auto">
                {/* Rest of your code */}

                <div style={{'height': '554px'}}
                     className={`${activeTab === 'description' ? '' : 'hidden'} description min-w-96 layout-block__content flex-grow h-full overflow-auto px-4 py-5`}>
                    <div className="flex justify-between items-center w-full mb-6">
                        <h1 className="text-white text-3xl">{problemData.title}</h1>
                        <div className="flex items-center gap-1 text-gray-500">
                            {problemStatus === 'solved' && (
                                <>
                                    <p className="">Solved</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5"
                                         stroke="currentColor" className="w-5 h-5 text-green-600">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                </>
                            )}
                            {problemStatus === 'attempted' && (
                                <>
                                    <p className="">Attempted</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor"
                                         className="w-5 h-5 text-yellow-600">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
                                    </svg>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mb-10">
                        {problem.difficulty === 'Easy' && (
                            <div className="bg-zinc-600 text-sm px-2 py-1 text-cyan-600 rounded-lg">Easy</div>)}
                        {problem.difficulty === 'Medium' && (
                            <div className="bg-zinc-600 text-sm px-2 py-1 text-yellow-400 rounded-lg">Medium</div>)}
                        {problem.difficulty === 'Hard' && (
                            <div className="bg-zinc-600 text-sm px-2 py-1 text-red-500 rounded-lg">Hard</div>)}
                    </div>
                    <div className="text-white mb-10">
                        <div dangerouslySetInnerHTML={{__html: problemData.statement}}></div>
                    </div>
                    <div className="mb-10 flex flex-col gap-6">
                        {problemData.examples.map(example => (
                            <div key={example.id}>
                                <h6 className="text-white mb-2">Example:</h6>
                                {example.img && (
                                    <img className="mb-4" src={example.img} alt="example"/>
                                )}
                                <div className="pl-4 border-l-2 border-gray-500 flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <p className="text-white text-bold">Input: </p>
                                        <p className="text-gray-400">{example.inputText}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="text-white text-bold">Output: </p>
                                        <p className="text-gray-400">{example.outputText}</p>
                                    </div>
                                    {example.explanation && (
                                        <div className="flex gap-2">
                                            <p className="text-white text-bold">Explanation: </p>
                                            <p className="text-gray-400">{example.explanation}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mb-10 text-white">
                        <h6 className="text-white mb-2">Constraints:</h6>
                        <div className="flex flex-col gap-1.5"
                             dangerouslySetInnerHTML={{__html: problemData.constraints}}></div>
                    </div>
                    <div className="w-full bg-gray-500 border-b border-gray-500 mb-8"></div>
                    <div className="flex items-center flex-wrap gap-3 mb-8">
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-gray-500">Accepted:</div>
                            <div className="text-white text-bold">{problem.accepted_submissions_count}</div>
                        </div>
                        <div className="h-3 border-l border-gray-700"></div>
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-gray-500">Submissions:</div>
                            <div className="text-white text-bold">{problem.submissions_count}</div>
                        </div>
                        <div className="h-3 border-l border-gray-700"></div>
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-gray-500">Acceptance rate:</div>
                            <div className="text-white text-bold">{problem.acceptance?.toFixed(1)}%</div>
                        </div>
                    </div>
                    <div className="w-full bg-gray-500 border-b border-gray-500 mb-8"></div>
                    <div ref={discussionRef}>
                        <Discussion/>
                    </div>
                </div>
                <Solution activeTab={activeTab}/>
                <Submissions activeTab={activeTab}/>
            </div>
            <div className="bg-zinc-800 w-full min-h-10 h-10 rounded-b-md flex items-center ps-1 gap-1">
                <div className="flex items-center gap-0.5">
                    <button
                        onClick={handleLikedToggle}
                        className="text-bold bg-neutral-700 hover:bg-neutral-600 text-white py-1 px-3 rounded-l-md flex items-center gap-1">
                        {liked ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-4 h-4 text-green-500">
                                <path
                                    d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"/>
                            </svg>
                        )}

                        {likesCount}
                    </button>
                    <button
                        onClick={handleDislikedToggle}
                        className="text-bold bg-neutral-700 hover:bg-neutral-600 text-white py-1 px-3 rounded-r-md flex items-center gap-1">
                        {disliked ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-4 h-4">
                                <path
                                    d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"/>
                            </svg>
                        )}

                        {dislikesCount}
                    </button>
                </div>
                <button
                    onClick={handleScrollToDiscussion}
                    className="text-bold bg-zinc-800 hover:bg-neutral-600 text-white py-1 px-3 rounded-md flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
                    </svg>
                    {problem.comments_count}
                </button>
                {isAuthenticated && (
                    <>
                        <div className="items-divider h-6 w-0.5 bg-zinc-600"></div>
                        <button
                            onClick={handleSavedToggle}
                            className="text-bold bg-zinc-800 hover:bg-neutral-600 text-white py-1 px-0 rounded-md flex items-center gap-1.5">
                            &nbsp;
                            {!saved ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor" className="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="text-yellow-500 w-5 h-5">
                                    <path fill-rule="evenodd"
                                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                          clip-rule="evenodd"/>
                                </svg>
                            )}
                            &nbsp;
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProblemDescription