import {useState} from "react";

const TestCase = ({id, input, output, expected, status}) => {
    const [isContentVisible, setIsContentVisible] = useState(false)

    const toggleContent = () => {
        setIsContentVisible(prev => !prev)
    }

    return (
        <div className="w-full">
            <div onClick={toggleContent}
                 className="cursor-pointer relative z-2 bg-zinc-900 text-white text-lg flex items-center h-11 px-2 rounded-md gap-2">
                <div>Test Case {id}</div>
                {status && (
                    <div>
                        {status === 'accepted' && (
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        )}
                        {status === 'failed' && (
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                    </div>
                )}
            </div>
            {isContentVisible && (
                <div className="content bg-zinc-600 flex flex-col gap-2 p-2 px-4 relative -top-0.5 z-1">
                    <div>
                        <div className="text-white mb-2">Input:</div>
                        <div className="flex flex-col gap-1">
                            {input.map((item, index) => (
                                <textarea key={index} id="message" rows="1"
                                          className="resize-none block p-2.5 w-full text-sm text-white bg-zinc-800 rounded-md border focus:ring-0 focus:border-gray-500"
                                          value={item}
                                ></textarea>
                            ))}
                        </div>
                    </div>
                    {output && (
                        <div>
                            <div className="text-white mb-2">Output:</div>
                            <textarea id="message" rows="1"
                                      className="resize-none block p-2.5 w-full text-sm text-white bg-zinc-800 rounded-md border focus:ring-0 focus:border-gray-500"
                                      value={output}
                            ></textarea>
                        </div>
                    )}
                    {expected && (
                        <div>
                            <div className="text-white mb-2">Expected:</div>
                            <textarea id="message" rows="1"
                                      className="resize-none block p-2.5 w-full text-sm text-white bg-zinc-800 rounded-md border focus:ring-0 focus:border-gray-500"
                                      value={expected}
                            ></textarea>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default TestCase