import { getStats } from "./analisis"
import { type Component, createMemo, Show } from 'solid-js';
import { useFileReader } from "./Context"
import Window from "./Window"
import icon from "./assets/whatstats.png"

const OutPut: Component = () => {
    const { setFile, file, erraseFile } = useFileReader()

    const stats = createMemo(() => {
        const fileResult = file()
        if (fileResult) {
            return { name: fileResult.name, size: fileResult.size, stats: getStats(fileResult.content) }
        }
    })

    return (
        <Show when={stats()} fallback={<div>No file selected or loading...</div>}>
            <Window title={stats()?.name + " " + stats()?.size}
                icon={icon}
                onClose={(e: Event) => erraseFile(setFile)}
            >
                <div>
                    <h3>Number of Messages: {stats()?.stats.numMsg}</h3>
                    <div>
                        <h3>People in the Chat: {stats()?.stats.people.length}</h3>
                        {stats()?.stats.people.map(person => (
                            <div class="person">
                                <p class="name">{person.person}: </p>
                                <p class="number">{person.number}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Window>
        </Show>
    )
}

export default OutPut
