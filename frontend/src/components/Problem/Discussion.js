import Comments from "./Comments";

const Discussion = () => {
    return (
        <div className="discussion">
            <div className="p-4 rounded-md shadow-md text-white mb-6">
                <form>
                    <div className="mb-0.5">
                        <textarea
                            id="comment"
                            name="comment"
                            rows="3"
                            className="w-full p-2 rounded-md resize-none bg-transparent border-none focus:ring-0"
                            placeholder="Write your comment here..."
                            required
                        ></textarea>
                    </div>

                    <div className="text-end">
                        <button
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
                <select id="sortBy"
                        className="bg-zinc-800 text-white text-sm rounded-md block w-36 p-2">
                    <option value="best">Best</option>
                    <option value="CA">Most votes</option>
                    <option value="FR">Older to Newer</option>
                    <option value="DE">Newer to Older</option>
                </select>
            </div>

            <Comments />

            <div className="pagination text-center py-5">
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a href="#"
                       className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-zinc-700 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </a>
                    <a href="#" aria-current="page"
                       className="border relative z-10 inline-flex items-center bg-zinc-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
                    <span
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                    <a href="#"
                       className="relative hidden items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-zinc-700 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                    <a className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-zinc-700 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </a>
                </nav>
            </div>
        </div>
    )
}

export default Discussion