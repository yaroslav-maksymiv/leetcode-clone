import {Link} from "react-router-dom";

export const Problems = () => {
    return (
        <div className="w-full h-full bg-zinc-800 min-h-screen pt-16">
            <div className="mx-auto max-w-7xl pt-16 px-2 sm:px-6 lg:px-8 grid grid-cols-[auto,270px] gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <select id="difficulty"
                                className="bg-zinc-800 text-white text-sm rounded-md block w-36 p-2">
                            <option disabled selected>Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <select id="status"
                                className="bg-zinc-800 text-white text-sm rounded-md block w-36 p-2">
                            <option disabled selected>Status</option>
                            <option value="solved">Solved</option>
                            <option value="attempted">Attempted</option>
                        </select>
                        <div className="rounded-md text-gray-600 border border-gray-500 bg-zinc-800 flex items-center px-1.5 gap-2 py-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="w-5 h-5 font-bold">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                            </svg>
                            <input type="text" placeholder="Search questions"
                                   className="focus:ring-0 rounded-md bg-zinc-800 text-gray-600 border-none p-0"/>
                        </div>
                        <button className="flex items-center gap-2 text-green-400">
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
                        <tr>
                            <td className="pl-3 py-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-green-600">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </td>
                            <td>
                                <Link to={'/problems'}>1. Two Sum</Link>

                            </td>
                            <td>
                                57%
                            </td>
                            <td>
                                <div className="text-sm text-cyan-600">Easy</div>
                            </td>
                        </tr>
                        <tr className="bg-zinc-600">
                            <td className="pl-3 py-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-yellow-600">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                                </svg>

                            </td>
                            <td>
                                <Link to={'/problem'}>1. Two Sum</Link>

                            </td>
                            <td>
                                57%
                            </td>
                            <td>
                                <div className="text-sm text-yellow-400">Easy</div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-full">
                    {/*<div className="h-full bg-zinc-600 rounded-lg"></div>*/}
                </div>
            </div>
        </div>
    )
}