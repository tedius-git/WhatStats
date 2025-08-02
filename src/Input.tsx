import { type Component } from 'solid-js';
import { useFileReader } from "./Context"
import Window from "./Window"
import icon from "./assets/whatstats.png"
import styles from "./Input.module.css"


const InputFile: Component = () => {
    const { setFile, readFileFromInput } = useFileReader()

    return (
        <Window title='Input File'
            icon={icon}
            resizable={true}
        >
            <form>
                <label>Choose the .txt
                    <div class={styles.top_white}></div>
                    <input type="file" accept=".txt"
                        onChange={(e) => readFileFromInput(e, setFile)}>
                    </input>
                </label>
            </form>
        </Window>
    )
}

export default InputFile
