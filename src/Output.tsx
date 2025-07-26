import { getStats, Stats } from "./analisis"
import { Accessor, type Component, createMemo, Show } from 'solid-js';
import { useFileReader } from "./Context"
import Window from "./Window"
import icon from "./assets/whatstats.png"

const OutPut: Component = () => {
    const { content, fileInfo } = useFileReader()

    const stats: Accessor<Stats | null> = createMemo(() => {
        const currentContent = content()
        return currentContent ? getStats(currentContent) : null
    })

    const displayData = createMemo(() => {
        const info = fileInfo()
        const currentStats = stats()
        return info && currentStats ? { info, stats: currentStats } : null
    })

    return (
        <Show when={displayData()} fallback={<div>No file selected or loading...</div>}>
            {(data) => (
                <Window title={data().info.name + " " + data().info.size}
                 icon={icon}
                >
                    <div>
                        <h3>Number of Messages: {data().stats.numMsg}</h3>
                        <div>
                            <h3>People in the Chat:</h3>
                            {data().stats.people.map(person => (
                                <div class="person">
                                    <p class="name">{person.person}</p>
                                    <p class="number">{person.number}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Window>
            )}
        </Show>
    )
}

export default OutPut
