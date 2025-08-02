import { type Component, Show } from 'solid-js';
import { useFileReader } from "./Context"
import Window from "./Window"
import icon from "./assets/whatstats.png"
import InputFile from './Input';
import Search from "./Search";


const OutPut: Component = () => {
    const { file, erraseFile, setFile } = useFileReader()

    return (
        <Show when={file()} fallback={
            <InputFile />
        }>
            <Window title={file()?.name + " " + file()?.size}
                icon={icon}
                onClose={(e: Event) => erraseFile(setFile)}
                resizable={false}
            >
                <Search file={file()} />
            </Window>
        </Show >
    )
}

export default OutPut
