import axios from "axios"
import {useEffect, useRef, useState} from "react"
import ProblemDescription from "../components/Problem/ProblemDescription";
import ProblemCode from "../components/Problem/ProblemCode";
import ProblemTests from "../components/Problem/ProblemTests";
import ProblemNavbar from "../components/Problem/ProblemNavbar";

export const Problem = () => {
    const handleRequest = async () => {
        const config = {
            headers: {
                'X-RapidAPI-Key': 'd01ff1e4e9msh7c776ea78f5da42p14d486jsnf48c931f157a',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'content-type': 'application/json',
            }
        }

        // const response = await axios.get('https://ce.judge0.com/languages/', config)
        // console.log(response)

        // const body = {
        //     'language_id': 71,
        //     'source_code': "print('hello world!')",
        //     'expected_output': 'hello world!'
        // }
        //
        // const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', body, config)
        // console.log(response)

        const response = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/08a28ca5-bc4d-4941-9e32-af43463ea3a7`, config)
        console.log(response)
    }

    const isResized = useRef(false)
    const isResizedTop = useRef(false)
    const halfDividerWidth = 4

    const elementWidth = window.innerWidth
    // const [minWidth, setMinWidth] = useState(0.25 * elementWidth - halfDividerWidth)
    // const [maxWidth, setMaxWidth] = useState(0.75 * elementWidth - halfDividerWidth)
     const [minWidth, setMinWidth] = useState(50)
    const [maxWidth, setMaxWidth] = useState(elementWidth - halfDividerWidth - 50)
    const [leftPanelWidth, setLeftPanelWidth] = useState(0.5 * elementWidth - halfDividerWidth)

    const elementHeight = window.innerHeight - 64 // header height
    const [minHeight, setMinHeight] = useState(halfDividerWidth + 45)
    const [maxHeight, setMaxHeight] = useState(elementHeight - halfDividerWidth - 45)
    const [topPanelHeight, setTopPanelHeight] = useState(0.70 * elementHeight - halfDividerWidth)

    useEffect(() => {
        window.addEventListener("mousemove", (e) => {
            if (isResized.current) {
                setLeftPanelWidth((previousWidth) => {
                    const newWidth = previousWidth + e.movementX / 2
                    const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth
                    return isWidthInRange ? newWidth : previousWidth
                })
            } else if (isResizedTop.current) {
                setTopPanelHeight((previousHeight) => {
                    const newHeight = previousHeight + e.movementY / 2
                    const isHeightInRange = newHeight >= minHeight && newHeight <= maxHeight
                    return isHeightInRange ? newHeight : previousHeight
                })
            }
        })
        window.addEventListener("mouseup", () => {
            isResized.current = false
            isResizedTop.current = false
        })
    }, [])

    return (
        <>
            <ProblemNavbar/>
            <div
                className="overflow-hidden pt-14 resizable-layout w-full h-screen grid grid-cols-[min-content_auto] bg-zinc-900">
                <div className="flex">
                    <div className="left-panel flex p-2 pr-0 overflow-hidden" style={{width: `${leftPanelWidth}px`}}>
                        <ProblemDescription/>
                    </div>
                    <div className="divider w-2 cursor-col-resize"
                         onMouseDown={() => isResized.current = true}></div>
                </div>

                <div className="right-panel grid grid-rows-[min-content_auto] overflow-hidden">
                    <div className="">
                        <div className="top-panel p-2 pl-0 pb-0" style={{height: `${topPanelHeight}px`}}>
                            <ProblemCode/>
                        </div>
                        <div className="horizontal-divider cursor-row-resize h-2"
                             onMouseDown={() => isResizedTop.current = true}></div>
                    </div>
                    <div className="bottom-panel p-2 pl-0 pt-0 overflow-hidden">
                        <ProblemTests/>
                    </div>
                </div>
            </div>
        </>
    )
}
