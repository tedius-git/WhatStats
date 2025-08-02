import { getStats, Msg } from "./analisis"
import { type Component, createEffect, createMemo, createResource, createSignal, onCleanup, Show } from 'solid-js';
import { useFileReader } from "./Context"
import Window from "./Window"
import icon from "./assets/whatstats.png"
import styles from "./Output.module.css"

const filterMessagesAsync = async (messages: Msg[], searchTerm: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!searchTerm.trim()) {
                resolve(messages);
                return;
            }

            const filtered = messages.filter((msg: Msg) =>
                msg.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
            resolve(filtered);
        }, 0);
    });
};

const OutPut: Component = () => {
    const { file, erraseFile, setFile } = useFileReader()
    const [search, setSearch] = createSignal("")
    const [debouncedSearch, setDebouncedSearch] = createSignal("")

    createEffect(() => {
        const searchValue = search();
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(searchValue);
        }, 200);

        onCleanup(() => clearTimeout(timeoutId));
    });

    const stats = createMemo(() => {
        const fileResult = file()
        if (fileResult) {
            return { name: fileResult.name, size: fileResult.size, content: fileResult.content, stats: getStats(fileResult.content) }
        }
    })

    const [filteredMessages, { mutate, refetch }] = createResource(
        () => ({ messages: stats()?.stats.messages || [], search: debouncedSearch() }),
        async ({ messages, search }) => {
            return await filterMessagesAsync(messages, search);
        }
    );

    return (
        <Show when={stats()} fallback={<div>No file selected or loading...</div>}>
            <Window title={stats()?.name + " " + stats()?.size}
                icon={icon}
                onClose={(e: Event) => erraseFile(setFile)}
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
                        <input
                            class={styles.search}
                            placeholder="Search"
                            onInput={(e) => setSearch(e.currentTarget.value)}
                            value={search()}
                        />
                        <Show when={!filteredMessages.loading}
                            fallback={
                                <p>loading</p>
                            }>
                            <Show when={filteredMessages()?.length > 0}
                                fallback={
                                    <p>No matches found</p>
                                }>
                                {filteredMessages()?.map((msg: Msg) => (
                                    <div class={styles.message}>
                                        <p class={styles.author}>{msg.author}</p>
                                        <p class={styles.content}>{msg.content}</p>
                                    </div>
                                ))}
                            </Show>
                        </Show>
                    </div>
                </div>
            </Window>
        </Show >
    )
}

export default OutPut
