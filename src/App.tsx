import { type Component } from 'solid-js';
import OutPut from './Output';
import "./App.css"
import { FileProvider } from './Context';
import icon from "./assets/github-mark.svg"


const App: Component = () => {
    return (
        <FileProvider>
            <main class='main'>
                <OutPut />
            </main>
            <footer>
                <div class='taskbar_app'>
                    <a href='https://github.com/tedius-git/WhatStats' target='_blank'>
                        <img src={icon} />
                    </a>
                </div>
            </footer>
        </FileProvider >
    );
};

export default App;
