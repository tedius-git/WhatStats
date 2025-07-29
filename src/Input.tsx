import { type Component } from 'solid-js';
import { useFileReader } from "./Context"


const InputFile: Component = () => {
    const { readFileFromInput } = useFileReader()

    return (
        <header class="header-container">
            <h1 class="header-title">WhatStats</h1>
            <form>
                <label>Choose the .txt
                    <div class='top-white'></div>
                    <input type="file" accept=".txt"
                        onChange={(e) => readFileFromInput(e)}>
                    </input>
                </label>
            </form>
        </header >

    )
}

export default InputFile
