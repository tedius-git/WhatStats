import { Accessor, createContext, createSignal, ParentProps, Setter, useContext } from "solid-js"

export interface FileInfo {
    name: string,
    size: number,
}

interface FileContextType {
    content: Accessor<string | null>,
    setContent: Setter<string | null>,
    fileInfo: Accessor<FileInfo | null>
    setFileInfo: Setter<FileInfo | null>
}

const FileContext = createContext<FileContextType>()

export function FileProvider(props: ParentProps) {
    const [content, setContent] = createSignal(localStorage.getItem("file"))
    const [fileInfo, setFileInfo] = createSignal<FileInfo | null>(
        localStorage.getItem("name") && localStorage.getItem("size")
            ? {
                name: localStorage.getItem("name")!,
                size: Number(localStorage.getItem("size")) || 0
            }
            : null
    )
    const contextValue: FileContextType = { content, setContent, fileInfo, setFileInfo }
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
