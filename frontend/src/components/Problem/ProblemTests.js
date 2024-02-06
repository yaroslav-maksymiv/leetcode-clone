import TestCase from "./TestCase";
import {useEffect, useState} from "react";

const ProblemTests = ({problemData, result}) => {
    const testCases = problemData.testCases

    const [activeTab, setActiveTab] = useState('testCases')

    useEffect(() => {
        if (result?.length > 0) {
            setActiveTab('results')
        }
    }, [result])

    return (
        <div
            className="layout-block bg-zinc-800 w-full h-full rounded-md border border-gray-500 overflow-hidden flex flex-col">
            <div
                className="layout-block__top bg-neutral-700 w-full min-h-10 h-10 rounded-t-md flex items-center justify-between ps-1">
                <div className="flex items-center">
                    <button
                        onClick={() => setActiveTab('testCases')}
                        className={`${activeTab === 'testCases' ? 'text-white' : 'text-zinc-400'} text-sm bg-neutral-700 hover:bg-neutral-600 py-1 px-3 rounded-md flex items-center flex-nowrap min-w-28 gap-1`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-green-600">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <div>Test case</div>
                    </button>
                    <button
                        onClick={() => setActiveTab('results')}
                        className={`${activeTab === 'results' ? 'text-white' : 'text-zinc-400'} text-sm bg-neutral-700 hover:bg-neutral-600 py-1 px-3 rounded-md flex items-center gap-1`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-green-600">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"/>
                        </svg>
                        Result
                    </button>
                </div>
            </div>

            <div
                className={`${activeTab === 'testCases' ? '' : 'hidden'} layout-block__content flex-grow h-full overflow-auto p-4 flex flex-col gap-4`}>
                {
                    testCases.map((testCase, index) => {
                        const inputItems = []
                        testCase.parameters.forEach(param => {
                            inputItems.push(`${Object.keys(param)[0]} = ${param[Object.keys(param)[0]]}`)
                        })
                        return (
                            <TestCase key={index} id={index + 1} input={inputItems}/>
                        )
                    })
                }
            </div>
            <div
                className={`${activeTab === 'results' ? '' : 'hidden'} layout-block__content flex-grow h-full overflow-auto p-4 flex flex-col gap-4`}>
                {result ? (
                    <>
                        {result[2] ? (
                            <h6 className="text-2xl text-green-600">Accepted</h6>
                        ) : (
                            <h6 className="text-2xl text-red-500">Failed</h6>
                        )}
                        {
                            testCases.map((testCase, index) => {
                                const inputItems = []
                                const output = `${JSON.stringify(result[0][index])}`
                                const expectedOutput = `${JSON.stringify(testCase.expectedOutput)}`
                                const status = result[1][index] ? 'accepted' : 'failed'
                                testCase.parameters.forEach(param => {
                                    inputItems.push(`${JSON.stringify(Object.keys(param)[0])} = ${JSON.stringify(param[Object.keys(param)[0]])}`)
                                })
                                return (
                                    <TestCase key={index} id={index + 1} input={inputItems} output={output}
                                              expected={expectedOutput} status={status}/>
                                )
                            })
                        }
                    </>
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-gray-500">You must run your code first</div>
                    </div>
                )}

                {/*<TestCase id={1} input={['a = [1, 2, 3]', 'target = 123']} output={'[0,1]'} expected={'[0,1]'} status={'accepted'}/>*/}
                {/*<TestCase id={1} input={['a = [1, 2, 3]', 'target = 123']} output={'[0,2]'} expected={'[0,3]'} status={'failed'}/>*/}
            </div>

            {/*<div*/}
            {/*    className="layout-block__bottom bg-zinc-800 w-full min-h-10 h-10 rounded-b-md flex items-center pl-3 pr-3 gap-1">*/}
            {/*    Bottom*/}
            {/*</div>*/}
        </div>
    )
}

export default ProblemTests