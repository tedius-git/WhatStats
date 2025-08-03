import { type Component } from 'solid-js';
import OutPut from './Output';
import "./App.css"
import { FileProvider } from './Context';
import icon from "./assets/github-mark.svg"


const App: Component = () => {
    return (
        <FileProvider>
            <header>
                <h1>WhatStats</h1>
                <a href='https://github.com/tedius-git/WhatStats' target='_blank'>
                    <img src={icon} />
                </a>
            </header>
            <OutPut />
        </FileProvider>
    );
};

export default App;
