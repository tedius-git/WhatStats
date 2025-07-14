import { getStats, Stats } from "./analisis"
import { Accessor, type Component, createMemo, Show } from 'solid-js';
import { useFileReader } from "./Context"

const OutPut: Component = () => {
    const { content, fileInfo } = useFileReader()

    const stats: Accessor<Stats | null> = createMemo(() => {
        const currentContent = content()
        return currentContent ? getStats(currentContent) : null
    })

    return (
        <Show when={content()}>
            <div class="glass file-info">
                <p>File Size: {fileInfo()?.size} </p>
                <p>File Name: {fileInfo()?.name} </p>
            </div>
            <div class="glass">
                <h3>Number of Messages: {stats()?.numMsg} </h3>
                <div>
                    <h3>People in the Chat: </h3>
                    {stats()?.people.map(person => (
                        <div class="person">
                            <p class="name"> {person.person} </p>
                            <p class="number"> {person.number} </p>
                        </div>
                    ))}
                </div>
            </div>
        </Show>
    )
}

export default OutPut
