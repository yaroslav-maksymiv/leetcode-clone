import {usePagination, DOTS} from "../hooks/pagination";

const Paginator = ({
                       nextPage, prevPage, total, currentPage, pageSize, siblingsCount, setPage
                   }) => {
    const paginationRange = usePagination({
        totalCount: total, pageSize, siblingCount: siblingsCount, currentPage
    })

    if (paginationRange < 2) {
        return null
    }

    const onNext = () => {
        setPage(prev => prev + 1)
    }

    const onPrev = () => {
        setPage(prev => prev - 1)
    }

    const onPage = (page) => {
        setPage(page)
    }

    return (
        <div className="mt-8 pagination text-center py-5">
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

                {prevPage ? (
                    <div
                        onClick={onPrev}
                        className="cursor-pointer w-10 relative flex justify-center relative items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-zinc-700 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </div>
                ) : (
                    <div
                        className="w-10 relative flex justify-center items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 opacity-50">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                )}

                {paginationRange?.map(pageNumber => {
                    if (pageNumber === DOTS) {
                        return <span
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                    }
                    if (pageNumber === currentPage) {
                        return <div aria-current="page"
                                    className="border relative z-10 inline-flex items-center bg-zinc-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {pageNumber}
                        </div>
                    }

                    return (
                        <div
                            onClick={() => onPage(pageNumber)}
                            className="cursor-pointer relative hidden items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-zinc-700 focus:z-20 focus:outline-offset-0 md:inline-flex">
                            {pageNumber}
                        </div>
                    )
                })}

                {nextPage ? (
                    <div
                        onClick={onNext}
                        className="cursor-pointer w-10 relative flex justify-center items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-zinc-700 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </div>
                ) : (
                    <div
                        className="w-10 relative flex justify-center items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 opacity-50">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Paginator