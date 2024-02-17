import Comments from "./Comments";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {loadComments, removeComment, sendComment} from "../../actions/comments";
import {toast} from "react-toastify";

const pageSize = 5 // defines count of comments on each page

const Discussion = () => {
    const dispatch = useDispatch()

    const [page, setPage] = useState(1)
    const [orderBy, setOrderBy] = useState('-created_at')
    const [commentText, setCommentText] = useState('')

    const {problem} = useSelector(state => state.problem)

    useEffect(() => {
        if (problem?.id) {
            dispatch(loadComments(problem.id, page, pageSize, orderBy))
        }
    }, [problem, orderBy, page])

    const changeOrderBy = (value) => {
        setOrderBy(value)
        setPage(1)
    }

    const handleCommentSend = (e, content, parent = null) => {
        e.preventDefault()
        return new Promise((resolve, reject) => {
            if (localStorage.getItem('isAuthenticated') === 'true') {
                sendComment(problem.id, content, parent)
                    .then(response => {
                        toast("Comment was sent successfully!", {
                            position: "top-center",
                            className: 'app-notification',
                            autoClose: 2000,
                            hideProgressBar: true,
                            pauseOnHover: true,
                            theme: "dark"
                        })
                        setCommentText('')
                        if (orderBy === '-created_at' && page === 1 && !parent) {
                            dispatch(loadComments(problem.id, page, pageSize, orderBy))
                        }
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            } else {
                toast.error("Sign in required", {
                    position: "top-center",
                    className: 'app-notification',
                    autoClose: 2000,
                    hideProgressBar: true,
                    pauseOnHover: true,
                    theme: "dark"
                })
                reject(new Error("Sign in required"))
            }
        })
    }

    const commentSend = (e, commentText) => {
        handleCommentSend(e, commentText)
            .then(response => {})
            .catch(e => {})
    }

    const handleCommentDelete = (commentId) => {
        dispatch(removeComment(commentId))
    }

    return (
        <div className="discussion">
            <div className="p-4 rounded-md shadow-md text-white mb-6">
                <form>
                    <div className="mb-0.5">
                        <textarea
                            id="comment"
                            name="comment"
                            rows="3"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full p-2 rounded-md resize-none bg-transparent border-none focus:ring-0"
                            placeholder="Write your comment here..."
                            required
                        ></textarea>
                    </div>

                    <div className="text-end">
                        <button
                            onClick={(e) => commentSend(e, commentText)}
                            type="submit"
                            className="bg-green-700 text-white py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue"
                        >
                            Comment
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex items-center gap-3 mb-6">
                <div className="text-gray-400 text-sm">Sort by:</div>
                <select
                    onChange={(e) => changeOrderBy(e.target.value)}
                    id="sortBy"
                    className="bg-zinc-800 text-white text-sm rounded-md block w-36 p-2">
                    <option value="-created_at">Newer to Older</option>
                    <option value="created_at">Older to Newer</option>
                    <option value="-likes">Most likes</option>
                </select>
            </div>

            <Comments handleCommentDelete={handleCommentDelete} pageSize={pageSize} setPage={setPage} handleCommentSend={handleCommentSend}/>
        </div>
    )
}

export default Discussion