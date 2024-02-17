import user_photo from "../../assets/user_photo.png";
import {useState} from "react";
import DateTimeFormatter from "../DateTimeFormatter";
import {useSelector} from "react-redux";
import {useDebounce} from "use-debounce";
import useUpdateEffect from "../../hooks/use-update-effect";
import {deleteComment, loadReplies, toggleCommentDislike, toggleCommentLike} from "../../actions/comments";
import {toast} from "react-toastify";
import Loader from "../Loader";

const Comment = ({comment, handleCommentSend, deleteCommentFromParent}) => {

    const {isAuthenticated, user} = useSelector(state => state.auth)

    const [showReplyButton, setShowReplyButton] = useState(false)
    const [userChangedLiked, setUserChangedLiked] = useState(false)
    const [userChangedDisliked, setUserChangedDisliked] = useState(false)
    const [liked, setLiked] = useState(comment.user_liked)
    const [disliked, setDisliked] = useState(comment.user_disliked)
    const [isReplySectionOpened, setIsReplySectionOpened] = useState(false)
    const [showReplies, setShowReplies] = useState(false)
    const [replyValue, setReplyValue] = useState('')

    const [replies, setReplies] = useState([])
    const [repliesLoading, setRepliesLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [moreReplies, setMoreReplies] = useState(false)

    const [likedDebounce] = useDebounce(liked, 500)
    const [dislikedDebounce] = useDebounce(disliked, 500)

    useUpdateEffect(() => {
        if (userChangedLiked) {
            toggleCommentLike(comment.id).then(response => {
                console.log(response)
            })
        }
    }, [likedDebounce])

    useUpdateEffect(() => {
        if (userChangedDisliked) {
            toggleCommentDislike(comment.id).then(response => {
                console.log(response)
            })
        }
    }, [dislikedDebounce])

    const handleLoadReplies = () => {
        setRepliesLoading(true)
        loadReplies(comment.id, page, 5).then(response => {
            const data = response.data
            if (data.results?.length > 0) {
                setReplies(prev => {
                    return [...prev, ...data.results]
                })
            }
            setMoreReplies(data.links?.next)
            setRepliesLoading(false)
        })
    }

    useUpdateEffect(() => {
        if (showReplies) {
            handleLoadReplies()
        }
    }, [page])

    const showMoreReplies = () => {
        if (moreReplies) {
            setPage(prev => prev + 1)
        }
    }

    const handleShowReplies = () => {
        setReplies([])
        setPage(1)
        setShowReplies(prev => !prev)
        handleLoadReplies()
    }

    const hideReplies = () => {
        setReplies([])
        setPage(1)
        setShowReplies(false)
    }

    const handleSendReply = (e, comment, parent) => {
        handleCommentSend(e, comment, parent).then(comment => {
            setReplies(prev => {
                return [comment, ...prev]
            })
            setShowReplies(true)
            if (comment.replies_count === 0) {
                setShowReplyButton(true)
            }
        })

        setIsReplySectionOpened(false)
        setReplyValue('')
    }

    const toggleReply = () => {
        if (isAuthenticated) {
            setIsReplySectionOpened(prev => !prev)
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

    const handleLikeToggle = () => {
        if (isAuthenticated) {
            setLiked(prev => !prev)
            setDisliked(false)
            setUserChangedLiked(true)
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

    const handleDislikeToggle = () => {
        if (isAuthenticated) {
            setDisliked(prev => !prev)
            setLiked(false)
            setUserChangedDisliked(true)
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

    const removeDeleteElement = (elementId) => {
        setReplies(replies => {
            const filteredReplies = replies.filter(reply => reply.id !== elementId)
            if (filteredReplies.length === 0) {
                setShowReplies(false)
                setShowReplyButton(false)
                comment.replies_count = 0
            }
            return filteredReplies
        })
    }

    const handleCommentDelete = (commentId) => {
        deleteComment(commentId).then(response => {
            deleteCommentFromParent(commentId)
        })
    }

    return (
        <div className="comment">
            <div className="flex justify-between">
                <div className="flex items-center gap-3 text-white mb-3">
                    <img
                        className="h-8 w-8 rounded-full"
                        src={comment.user.photo ? comment.user.photo : user_photo}
                        alt=""
                    />
                    <p>{comment.user.username}</p>
                </div>
                <div className="text-gray-500 text-sm"><DateTimeFormatter dateTime={comment.created_at}/></div>
            </div>
            <div className="text-white mb-2">
                {comment.content}
            </div>
            <div className="flex items-center gap-3 comment-action-items">
                <div onClick={handleLikeToggle}
                     className="cursor-pointer text-gray-500 hover:text-gray-400 text-sm flex items-center gap-1">
                    {liked ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="w-4 h-4 text-gray-200">
                            <path
                                d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="w-4 h-4">
                            <path
                                d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z"/>
                        </svg>
                    )}

                    {comment.likes > 0 ? comment.likes : ''}
                </div>
                <div onClick={handleDislikeToggle}
                     className="cursor-pointer text-gray-500 hover:text-gray-400 text-sm flex items-center gap-1">
                    {disliked ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="w-4 h-4 text-gray-200">
                            <path
                                d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="w-4 h-4">
                            <path
                                d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z"/>
                        </svg>
                    )}
                </div>
                {(comment.replies_count > 0 || showReplyButton) && (
                    <div onClick={handleShowReplies}
                         className="cursor-pointer text-gray-500 hover:text-gray-400 text-sm flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"/>
                        </svg>

                        Show {comment.replies_count ? comment.replies_count : ''} replies
                    </div>
                )}
                <div onClick={toggleReply}
                     className="cursor-pointer text-gray-500 hover:text-gray-400 text-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/>
                    </svg>

                    Reply
                </div>
                {user?.username === comment.user.username && (
                    <div onClick={() => handleCommentDelete(comment.id)}
                         className="delete-comment-btn invisible text-red-500 cursor-pointer flex align-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-4 h-4 mt-1">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                        </svg>
                        Delete
                    </div>
                )}
            </div>
            <div className="pl-6 mt-5 w-full border-l border-gray-500">
                {isReplySectionOpened && (
                    <div className="flex gap-5 w-full mb-4">
                        <img
                            className="h-7 w-7 rounded-full"
                            src={user.photo ? user.photo : user_photo}
                            alt="User photo"
                        />
                        <div className="w-full">
                            <div className="mb-2">
                                 <textarea id="reply" rows="1"
                                           placeholder="Type comment here..."
                                           className="shadow-md block p-2.5 w-full text-sm text-white bg-zinc-800 rounded-md"
                                           value={replyValue}
                                           onChange={(e) => setReplyValue(e.target.value)}
                                 ></textarea>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <button
                                    onClick={() => setIsReplySectionOpened(false)}
                                    type="submit"
                                    className="bg-gray-700 text-sm text-white py-2 px-3 rounded-full focus:outline-none focus:shadow-outline-blue"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={(e) => handleSendReply(e, replyValue, comment.id)}
                                    type="submit"
                                    className="bg-green-700 text-sm text-white py-2 px-3 rounded-full focus:outline-none focus:shadow-outline-blue"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showReplies && (
                    <div className="mb-8">
                        <div>
                            {repliesLoading ? (
                                <div>
                                    <Loader/>
                                </div>
                            ) : (
                                <>
                                    {replies.map(reply => (
                                        <Comment key={reply.id} comment={reply}
                                                 handleCommentSend={handleCommentSend}
                                                 deleteCommentFromParent={removeDeleteElement}/>
                                    ))}
                                </>
                            )}
                        </div>
                        <div className="flex align-center justify-between">
                            <div>
                                {moreReplies && (
                                    <div onClick={showMoreReplies} className="text-blue-600 cursor-pointer text-sm">Show
                                        more
                                    </div>
                                )}
                            </div>
                            <div onClick={hideReplies}
                                 className="flex align-center gap-1 text-gray-200 cursor-pointer text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" className="w-4 h-4 pt-1">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
                                </svg>
                                <div>Hide</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comment