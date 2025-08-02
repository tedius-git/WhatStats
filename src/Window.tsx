import { type ParentComponent, Show } from 'solid-js';
import styles from "./Window.module.css"

interface WindowProps {
    title: string;
    icon: string;
    onClose?: any;
    resizable: boolean;
}

const Window: ParentComponent<WindowProps> = (props) => {
    const windowStyle = () => {
        if (props.resizable) {
            return styles.resize
        } else {
            return styles.window
        }
    }

    return (
        <div class={windowStyle()}>
            <div class={styles.decoration}>
                <Show when={props.icon}>
                    <img src={props.icon} alt="" />
                </Show>
                <p class={styles.title}>{props.title}</p>
                <button onclick={props.onClose} class={styles.exit}>x</button>
            </div>
            <div class={styles.content}>
                {props.children}
            </div>
        </div>
    )
}

export default Window
