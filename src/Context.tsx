import { Accessor, createContext, createSignal, ParentProps, Setter, useContext } from "solid-js"

export interface TxtFile {
    name: string,
    size: number,
    content: string,
}


interface FileContextType {
    file: Accessor<TxtFile | null>,
    setFile: Setter<TxtFile | null>,
    erraseFile: (setFile: Setter<TxtFile | null>) => void,
}

const FileContext = createContext<FileContextType>()

export function FileProvider(props: ParentProps) {
    const [file, setFile] = createSignal<TxtFile | null>(
        localStorage.getItem("name") && localStorage.getItem("size") && localStorage.getItem("content")
            ? {
                name: localStorage.getItem("name")!,
                size: Number(localStorage.getItem("size")) || 0,
                content: localStorage.getItem("content")!
            }
            : null
    )
    const erraseFile = (setFile: Setter<TxtFile | null>) => {
        setFile(null)
        localStorage.clear()
    }
    const contextValue: FileContextType = { file, setFile, erraseFile }
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
