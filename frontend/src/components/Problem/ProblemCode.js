import CodeMirror from '@uiw/react-codemirror';
import {javascript} from '@codemirror/lang-javascript';
import {python} from '@codemirror/lang-python';
import {java} from '@codemirror/lang-java';
import {php} from '@codemirror/lang-php';
import {cpp} from '@codemirror/lang-cpp';
import {vscodeDark} from '@uiw/codemirror-theme-vscode';
import Popup from 'reactjs-popup';
import {EditorView} from "@codemirror/view"

import {useState} from "react";
import {capitalizeFirstLetter} from "../../misc";
import Loader from "../Loader";

const ProblemCode = ({problemCodeSaving, code, setCode, problemData, codeLoaded}) => {
    const availableFontSizes = Array.from({length: (21 + 1) - 12}, (_, index) => 12 + index)

    const [language, setLanguage] = useState(javascript())
    const [languageName, setLanguageName] = useState('Java Script')
    const [languageModalIsOpen, setLanguageModalIsOpen] = useState(false)

    const [editorFontSize, setEditorFontSize] = useState(localStorage.getItem('editorFontSize') ? Number(localStorage.getItem('editorFontSize')) : 16)
    const [isEditorPopupOpen, setIsEditorPopupOpen] = useState(false)

    const closeEditorPopup = () => {
        setIsEditorPopupOpen(false)
    }

    const handleFontSizeChange = (e) => {
        setEditorFontSize(e.target.value)
        localStorage.setItem('editorFontSize', e.target.value)
    }

    const onChange = (value) => {
        setCode(value)
    }

    const handleLanguageChange = (lang, langName) => {
        setLanguage(lang)
        setLanguageName(langName)
        setLanguageModalIsOpen(false)
    }

    const handleCodeReset = () => {
        setCode(problemData.startCode)
    }

    return (
        <div
            className="layout-block bg-zinc-800 w-full h-full rounded-md border border-gray-500 overflow-hidden flex flex-col">
            <div
                className="layout-block__top min-h-10 bg-neutral-700 w-full h-10 rounded-t-md flex items-center justify-between ps-1">
                <div className="flex items-center">
                    <button
                        className="cursor-pointer text-sm bg-neutral-700 hover:bg-neutral-600 text-white py-1 px-3 rounded-md flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-green-600">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"/>
                        </svg>
                        Code
                    </button>
                </div>
            </div>
            <div style={{'background': '#1e1e1e'}} className="layout-block__content flex-grow overflow-hidden h-full">
                <div className="overflow-auto h-full min-w-96">
                    <div style={{'background': '#1e1e1e'}}
                         className="layout-block__code-top w-full text-white flex items-center justify-between px-1 h-8 border-b border-zinc-700">
                        <div className="layout-block__languages relative w-40 ">
                            <button
                                onClick={() => setLanguageModalIsOpen(prev => !prev)}
                                className="cursor-pointer text-sm hover:bg-neutral-600 text-white py-0.5 px-2 rounded-md flex items-center gap-1">
                                {capitalizeFirstLetter(languageName)}
                                {languageModalIsOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5"
                                         stroke="currentColor" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5"
                                         stroke="currentColor" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                    </svg>
                                )}
                            </button>
                            {languageModalIsOpen && (
                                <div
                                    className="w-52 mt-3 bg-zinc-700 p-3 rounded-md text-white absolute z-10 grid grid-cols-2 gap-2">
                                    <button

                                        className="w-full cursor-pointer text-sm hover:bg-neutral-600 text-white py-0.5 px-2 rounded-md flex items-center gap-1">
                                        C++
                                    </button>
                                    <button

                                        className="w-full cursor-pointer text-sm hover:bg-neutral-600 text-white py-0.5 px-2 rounded-md flex items-center gap-1">
                                        Python
                                    </button>
                                    <button
                                        onClick={() => handleLanguageChange(javascript(), 'Java Script')}
                                        className="w-full cursor-pointer text-sm hover:bg-neutral-600 text-white py-0.5 px-2 rounded-md flex items-center gap-1">
                                        Java Script
                                    </button>
                                    <button
                                        className="w-full cursor-pointer text-sm hover:bg-neutral-600 text-white py-0.5 px-2 rounded-md flex items-center gap-1">
                                        Java
                                    </button>
                                    <button
                                        className="w-full cursor-pointer text-sm hover:bg-neutral-600 text-white py-0.5 px-2 rounded-md flex items-center gap-1">
                                        PHP
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsEditorPopupOpen(prev => !prev)}
                                className="cursor-pointer text-sm hover:bg-neutral-600 text-white py-0.5 px-2 rounded-md flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor" className="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                            </button>
                            <Popup className="editor-settings-popup" open={isEditorPopupOpen} closeOnDocumentClick
                                   onClose={closeEditorPopup}>
                                <div className="bg-zinc-800 shadow-2xl text-white rounded-md">
                                    <div className="text-2xl text-center border-b border-zinc-700 p-4">Editor Settings
                                    </div>
                                    <div className="p-4">
                                        <div className="w-full flex items-center justify-between gap-6">
                                            <div className="text-white">
                                                <div className="text-lg">Font Size</div>
                                                <div className="text-sm">Choose the font size of the text editor.</div>
                                            </div>
                                            <select id="fontSize"
                                                    value={editorFontSize}
                                                    onChange={handleFontSizeChange}
                                                    className="text-bold bg-zinc-800 text-white text-sm rounded-md block w-20 p-2">
                                                {availableFontSizes.map(fSize => (
                                                    <option key={fSize} value={fSize}>{fSize}px</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="border-t border-zinc-700 flex items-center justify-center p-4">
                                        <button
                                            onClick={closeEditorPopup}
                                            className="bg-transparent text-red-700 font-semibold py-1 px-2.5 border border-red-700 rounded">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                            <button
                                onClick={handleCodeReset}
                                className="cursor-pointer text-sm hover:bg-neutral-600 text-white py-0.5 px-2 rounded-md flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor" className="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div style={{'fontSize': `${editorFontSize}px`, 'overflow': 'visible'}} className="relative h-full">
                        {codeLoaded ? (
                            <CodeMirror
                                value={code}
                                height={'100%'}
                                onChange={onChange}
                                theme={vscodeDark}
                                extensions={[language, EditorView.lineWrapping]}
                            />
                        ) : (
                            <div className="flex justify-center align-center w-full h-full">
                                <Loader/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div
                className="layout-block__bottom bg-zinc-800 w-full h-10 rounded-b-md flex items-center pl-3 pr-3 gap-1">
                {problemCodeSaving ? (
                    <div className="text-xs text-gray-500">Saving to cloud</div>
                ) : (
                    <div className="text-xs text-gray-500">Saved to cloud</div>
                )}
            </div>
        </div>
    )
}

export default ProblemCode