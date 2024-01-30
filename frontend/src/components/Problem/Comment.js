import user_photo from "../../assets/user_photo.png";
import {useState} from "react";
import DateTimeFormatter from "../DateTimeFormatter";

const Comment = ({}) => {

    const [isReplySectionOpened, setIsReplySectionOpened] = useState(false)
    const [replyValue, setReplyValue] = useState('')

    const loadReplies = () => {

    }

    const toggleReply = () => {
        setIsReplySectionOpened(prev => !prev)
    }

    return (
        <div className="comment">
            <div className="flex justify-between">
                <div className="flex items-center gap-3 text-white mb-3">
                    <img
                        className="h-8 w-8 rounded-full"
                        src={user_photo}
                        alt=""
                    />
                    <p>Ihor</p>
                </div>
                <div className="text-gray-500 text-sm"><DateTimeFormatter dateTime={'2019-04-30T08:59:00.000Z'} /></div>
            </div>
            <div className="text-white mb-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A distinctio dolorum eius et id illo iste
                magni natus necessitatibus nesciunt omnis, ut velit vitae! Aut dolorum eius ex quaerat quidem?
            </div>
            <div className="flex items-center gap-3">
                <div className="cursor-pointer text-gray-500 hover:text-gray-400 text-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="w-4 h-4">
                        <path
                            d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z"/>
                    </svg>

                    144
                </div>
                <div className="cursor-pointer text-gray-500 hover:text-gray-400 text-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path
                            d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z"/>
                    </svg>

                </div>
                <div className="cursor-pointer text-gray-500 hover:text-gray-400 text-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"/>
                    </svg>

                    Show 3 replies
                </div>
                <div onClick={toggleReply}
                     className="cursor-pointer text-gray-500 hover:text-gray-400 text-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/>
                    </svg>

                    Reply
                </div>
            </div>
            <div className="pl-5 mt-5 w-full">
                {isReplySectionOpened && (
                    <div className="flex gap-5 w-full mb-4">
                        <img
                            className="h-7 w-7 rounded-full"
                            src={user_photo}
                            alt=""
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
                                    type="submit"
                                    className="bg-green-700 text-sm text-white py-2 px-3 rounded-full focus:outline-none focus:shadow-outline-blue"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Comment