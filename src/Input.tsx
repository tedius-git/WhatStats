import { type Component } from 'solid-js';
import { useFileReader, FileInfo } from "./Context"

const readFile = (e: Event, setContent: (content: string | null) => void, setFileInfo: (info: FileInfo | null) => void) => {
    const target = e.target as HTMLInputElement
    if (target.files == null) {
        setContent(null)
        setFileInfo(null)
        return
    }
    const file = target.files[0]
    const name = file.name.split(".txt")[0]
    const size = file.size
    let fileReader = new FileReader()
    fileReader.onload = () => {
        setContent(fileReader.result as string)
        setFileInfo({ name: name, size: size })
        localStorage.setItem("file", fileReader.result as string)
        localStorage.setItem("name", name as string)
        localStorage.setItem("size", size.toString())
    }
    fileReader.readAsText(file)
}

const InputFile: Component = () => {
    const { setContent, setFileInfo } = useFileReader()

    return (
        <header class="header-container">
            <h1 class="header-title">WhatStats</h1>
            <form>
                <label>Choose the .txt
                <div class='top-white'></div>
                    <input type="file" accept=".txt"
                        onChange={(e) => readFile(e, setContent, setFileInfo)}>
                    </input>
                </label>
            </form>
        </header>

    )
}

export default InputFile
