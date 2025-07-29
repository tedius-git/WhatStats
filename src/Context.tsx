import { Accessor, createContext, createSignal, ParentProps, Setter, useContext } from "solid-js"

import { TxtFile, erraseFile, readFileFromInput } from "./file"


interface FileContextType {
    file: Accessor<TxtFile | null>,
    setFile: Setter<TxtFile | null>,
    readFileFromInput: (e: Event) => void,
    erraseFile: () => void,
}

const FileContext = createContext<FileContextType>()

export function FileProvider(props: ParentProps) {
    const [file, setFile] = createSignal<TxtFile | null>(
        localStorage.getItem("name") && localStorage.getItem("size") && localStorage.getItem("content")
            ? {
                name: localStorage.getItem("name")!,
                size: localStorage.getItem("size")!,
                content: localStorage.getItem("content")!
            }
            : null
    )
    const contextValue: FileContextType = {
        file: file, setFile: setFile, erraseFile: erraseFile(setFile),
        readFileFromInput: readFileFromInput(setFile)
    }
    return (
        <FileContext.Provider value={contextValue}>
            {props.children}
        </FileContext.Provider>
    )
}

export function useFileReader() {
    const context = useContext(FileContext)
    if (!context) {
        throw new Error("useFileReader must be used within a FileProvider")
    }
    return context
}
