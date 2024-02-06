import DateTimeFormatter from "../DateTimeFormatter";

export const Submissions = ({activeTab}) => {
    return (
        <div style={{'height': '554px'}}
             className={`${activeTab === 'submissions' ? '' : 'hidden'} submissions min-w-96 layout-block__content flex-grow h-full overflow-auto`}>
            {/*<table className="w-full table-auto text-white">*/}
            {/*    <thead>*/}
            {/*    <tr className="border-b border-gray-500">*/}
            {/*        <th className="text-start font-normal text-gray-400 pl-3 py-1">Status</th>*/}
            {/*        <th className="text-start font-normal text-gray-400">Language</th>*/}
            {/*        <th className="text-start font-normal text-gray-400">Runtime</th>*/}
            {/*        <th className="text-start font-normal text-gray-400">Memory</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody className="text-gray-300 font-normal">*/}
            {/*    <tr>*/}
            {/*        <td className="pl-3 py-2">*/}
            {/*            <div className={`${true ? 'text-green-600' : 'text-red-500'}`}>Accepted</div>*/}
            {/*            <div className="text-xs"><DateTimeFormatter dateTime={'2019-04-30T08:59:00.000Z'} /></div>*/}
            {/*        </td>*/}
            {/*        <td>*/}
            {/*            <div className="text-sm text-center bg-zinc-600 rounded-full px-2 py-0.5 w-fit">PHP</div>*/}
            {/*        </td>*/}
            {/*        <td>*/}
            {/*            <div className="flex gap-0.5 items-center">*/}
            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
            {/*                     stroke-width="1.5"*/}
            {/*                     stroke="currentColor" className="w-4 h-4">*/}
            {/*                    <path stroke-linecap="round" stroke-linejoin="round"*/}
            {/*                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>*/}
            {/*                </svg>*/}

            {/*                <div className="">123 ms</div>*/}
            {/*            </div>*/}
            {/*        </td>*/}
            {/*        <td>*/}
            {/*            <div className="flex gap-1 items-center">*/}
            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
            {/*                     stroke-width="1.5" stroke="currentColor" className="w-4 h-4">*/}
            {/*                    <path stroke-linecap="round" stroke-linejoin="round"*/}
            {/*                          d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"/>*/}
            {/*                </svg>*/}

            {/*                <div>17.5 mb</div>*/}
            {/*            </div>*/}
            {/*        </td>*/}
            {/*    </tr>*/}
            {/*    <tr className="bg-zinc-700">*/}
            {/*        <td className="pl-3 py-2">*/}
            {/*            <div className={`${true ? 'text-green-600' : 'text-red-500'}`}>Accepted</div>*/}
            {/*            <div className="text-xs">15 Oct, 01</div>*/}
            {/*        </td>*/}
            {/*        <td>*/}
            {/*            <div className="text-sm text-cente bg-zinc-600 rounded-full px-2 py-0.5 w-fit">python</div>*/}
            {/*        </td>*/}
            {/*        <td>*/}
            {/*            <div className="flex gap-0.5 items-center">*/}
            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
            {/*                     stroke-width="1.5"*/}
            {/*                     stroke="currentColor" className="w-4 h-4">*/}
            {/*                    <path stroke-linecap="round" stroke-linejoin="round"*/}
            {/*                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>*/}
            {/*                </svg>*/}

            {/*                <div className="">123 ms</div>*/}
            {/*            </div>*/}
            {/*        </td>*/}
            {/*        <td>*/}
            {/*            <div className="flex gap-1 items-center">*/}
            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
            {/*                     stroke-width="1.5" stroke="currentColor" className="w-4 h-4">*/}
            {/*                    <path stroke-linecap="round" stroke-linejoin="round"*/}
            {/*                          d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"/>*/}
            {/*                </svg>*/}

            {/*                <div>17.5 mb</div>*/}
            {/*            </div>*/}
            {/*        </td>*/}
            {/*    </tr>*/}
            {/*    </tbody>*/}
            {/*</table>*/}
            <div className="h-full flex items-center justify-center">
                <div className="text-gray-500">No submissions yet</div>
            </div>
        </div>
    )
}

export default Submissions