import { Setter, type Component } from 'solid-js';
import { useFileReader, TxtFile } from "./Context"

const readFile = (e: Event, setFile: Setter<TxtFile | null>) => {
    const target = e.target as HTMLInputElement
    if (target.files == null) {
        setFile(null)
        return
    }
    const file = target.files[0]
    const name = file.name.split(".txt")[0]
    const size = file.size
    let fileReader = new FileReader()
    fileReader.onload = () => {
        setFile({ name: name, size: size, content: fileReader.result as string })
        localStorage.setItem("content", fileReader.result as string)
        localStorage.setItem("name", name as string)
        localStorage.setItem("size", size.toString())
    }
    fileReader.readAsText(file)
}

const InputFile: Component = () => {
    const { setFile } = useFileReader()

    return (
        <header class="header-container">
            <h1 class="header-title">WhatStats</h1>
            <form>
                <label>Choose the .txt
                    <div class='top-white'></div>
                    <input type="file" accept=".txt"
                        onChange={(e) => readFile(e, setFile)}>
                    </input>
                </label>
            </form>
        </header>

    )
}

export default InputFile
