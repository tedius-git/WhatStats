import { createSignal, type Component } from 'solid-js';
import InputFile from './Input';
import OutPut from './Output';
import "./App.css"
import { FileProvider } from './Context';


const App: Component = () => {
    const [search, setSearch] = createSignal("")
    return (
        <FileProvider>
            <InputFile onSearch={setSearch} />
            <OutPut />
        </FileProvider>
    );
};

export default App;
