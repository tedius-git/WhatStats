import { type Component } from 'solid-js';
import OutPut from './Output';
import "./App.css"
import { FileProvider } from './Context';


const App: Component = () => {
    return (
        <FileProvider>
            <h1 class="header-title">WhatStats</h1>
            <OutPut />
        </FileProvider>
    );
};

export default App;
