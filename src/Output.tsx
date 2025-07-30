import { getStats } from "./analisis"
import { type Component, createMemo, createSignal, Show } from 'solid-js';
import { useFileReader } from "./Context"
import Window from "./Window"
import icon from "./assets/whatstats.png"
import styles from "./Output.module.css"

const OutPut: Component = () => {
    const { file, erraseFile, setFile } = useFileReader()
    const [search, setSearch] = createSignal("")

    const stats = createMemo(() => {
        const fileResult = file()
        if (fileResult) {
            return { name: fileResult.name, size: fileResult.size, content: fileResult.content, stats: getStats(fileResult.content) }
        }
    })

    return (
        <Show when={stats()} fallback={<div>No file selected or loading...</div>}>
            <Window title={stats()?.name + " " + stats()?.size}
                icon={icon}
                onClose={(e: Event) => erraseFile(setFile)}
                details={[
                    (<p>Messages: {stats()?.stats.numMsg}</p>),
                    (<p>People in the Chat: {stats()?.stats.people.length}</p>),
                ]
                }
                onSearch={setSearch}
            >
                <div class={styles.output}>
                    <div class={styles.left}>
                        {stats()?.stats.people.map(person => (
                            <div class={styles.person}>
                                <p class={styles.name}>{person.person}: </p>
                                <p class={styles.number}>{person.number}</p>
                            </div>
                        ))}
                    </div>
                    <div class={styles.right}>
                        {stats()?.stats.messages.map(msg => (
                            <p>{msg.author} {msg.content}</p>
                        ))}
                    </div>
                </div>
            </Window>
        </Show >
    )
}

export default OutPut
