import { type Component } from 'solid-js';
import { useFileReader } from "./Context"
import Window from "./Window"
import icon from "./assets/explorer.png"
import styles from "./Input.module.css"


const InputFile: Component = () => {
    const { setFile, readFileFromInput } = useFileReader()

    return (
        <Window title='Input File'
            icon={icon}
            resizable={true}
        >
            <p class={styles.hint}>
                Please select the .zip or the .txt file from inside.
            </p>
            <form>
                <label>Select file
                    <div class={styles.top_white}></div>
                    <input type="file" accept=".txt, .zip"
                        onChange={(e) => readFileFromInput(e, setFile)}>
                    </input>
                </label>
            </form>
        </Window>
    )
}

export default InputFile
