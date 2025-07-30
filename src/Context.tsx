import { Accessor, createContext, createSignal, ParentProps, Setter, useContext } from "solid-js"

import { TxtFile, erraseFile, readFileFromInput } from "./file"


interface FileContextType {
    file: Accessor<TxtFile | null>,
    setFile: Setter<TxtFile | null>,
    readFileFromInput: (e: Event, f: Setter<TxtFile | null>) => void,
    erraseFile: (f: Setter<TxtFile | null>) => void,
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
        file: file, setFile: setFile, erraseFile: erraseFile,
        readFileFromInput: readFileFromInput
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
