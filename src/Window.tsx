import { JSX, type ParentComponent, Setter, Show } from 'solid-js';
import styles from "./Window.module.css"

interface WindowProps {
    title: string;
    icon: string;
    show?: boolean;
    onClose?: any;
}

const Window: ParentComponent<WindowProps> = (props) => {

    return (
        <Show when={props.show ?? true}>
            <div class={styles.window}>
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
        </Show>
    )
}

export default Window
