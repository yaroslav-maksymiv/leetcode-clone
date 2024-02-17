import Comment from './Comment'
import {useSelector} from "react-redux";
import Paginator from "../Paginator";
import Loader from "../Loader";

const Comments = ({pageSize, setPage, handleCommentSend, handleCommentDelete}) => {
    const {
        comments, loading, error,
        nextPage, prevPage, currentPage,
        total
    } = useSelector(state => state.comment)

    return (
        <section className="comments">
            <div>
                {loading ? (
                    <div>
                        <Loader/>
                    </div>
                ) : error ? (
                    <div className="text-gray-500">{error}</div>
                ) : comments?.length > 0 ? (
                    <>
                        {comments.map(comment => (
                            <Comment key={comment.id} deleteCommentFromParent={handleCommentDelete} handleCommentSend={handleCommentSend} comment={comment}/>
                        ))}
                    </>
                ) : (
                    <div className="text-gray-500 text-center text-lg my-8">No comments yet!</div>
                )}
            </div>

            {comments?.length > 0 && (
                <Paginator
                    pageSize={pageSize}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    currentPage={currentPage}
                    total={total}
                    siblingsCount={1}
                    setPage={setPage}
                />
            )}
        </section>
    )
}

export default Comments