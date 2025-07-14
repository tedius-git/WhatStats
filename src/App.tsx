import { type Component } from 'solid-js';
import InputFile from './Input';
import OutPut from './Output';
import "./App.css"
import { FileProvider } from './Context';


const App: Component = () => {
    return (

        <FileProvider>
            <InputFile />
            <OutPut />
        </FileProvider>
    );
};

export default App;
