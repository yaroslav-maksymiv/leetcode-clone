import axios from "axios"
import {useEffect, useRef, useState} from "react"
import ProblemDescription from "../components/Problem/ProblemDescription";
import ProblemCode from "../components/Problem/ProblemCode";
import ProblemTests from "../components/Problem/ProblemTests";
import ProblemNavbar from "../components/Problem/ProblemNavbar";
import {useNavigate, useParams} from "react-router-dom";
import {getProblemData} from "../utils/problems";
import {useSelector} from "react-redux";

export const Problem = () => {
    const navigate = useNavigate()
    const {id: problemId} = useParams()
    const problemData = getProblemData(problemId)

    const [result, setResult] = useState(null)
    const [code, setCode] = useState(problemData.startCode)
    const [language, setLanguage] = useState('Java Script')

    const {isAuthenticated} = useSelector(state => state.auth)

    const checkUserLoggedIn = () => {
        if (!isAuthenticated) {
            navigate(`/login/?redirect_url=problem/${problemId}`)
        }
        return true
    }

    const handleCodeRun = () => {
        if (checkUserLoggedIn()) {
            const userCode = new Function(`return ${code}`)()
            const startTime = performance.now()
            const result = problemData.handlerFunction(userCode)
            const endTime = performance.now()
            const resultTime = endTime - startTime
            setResult([...result, resultTime])
        }
    }

    const handleCodeSubmit = () => {
        handleCodeRun()
    }

    const isResized = useRef(false)
    const isResizedTop = useRef(false)
    const halfDividerWidth = 4

    const elementWidth = window.innerWidth
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
            <ProblemNavbar handleCodeSubmit={handleCodeSubmit} handleCodeRun={handleCodeRun}/>
            <div
                className="overflow-hidden pt-14 resizable-layout w-full h-screen grid grid-cols-[min-content_auto] bg-zinc-900">
                <div className="flex">
                    <div className="left-panel flex p-2 pr-0 overflow-hidden" style={{width: `${leftPanelWidth}px`}}>
                        <ProblemDescription problemData={problemData}/>
                    </div>
                    <div className="divider w-2 cursor-col-resize"
                         onMouseDown={() => isResized.current = true}></div>
                </div>

                <div className="right-panel grid grid-rows-[min-content_auto] overflow-hidden">
                    <div className="">
                        <div className="top-panel p-2 pl-0 pb-0" style={{height: `${topPanelHeight}px`}}>
                            <ProblemCode problemData={problemData} setCode={setCode} setLanguage={setLanguage}
                                         code={code} language={language}/>
                        </div>
                        <div className="horizontal-divider cursor-row-resize h-2"
                             onMouseDown={() => isResizedTop.current = true}></div>
                    </div>
                    <div className="bottom-panel p-2 pl-0 pt-0 overflow-hidden">
                        <ProblemTests result={result} problemData={problemData}/>
                    </div>
                </div>
            </div>
        </>
    )
}
