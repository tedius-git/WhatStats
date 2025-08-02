import { getStats, Msg, parseTxt, Stats } from "./analisis"
import { type Component, createEffect,  createResource, createSignal, onCleanup, Show } from 'solid-js';
import styles from "./Search.module.css"
import { TxtFile } from "./file";

const MessagesAsync = async (messages: Msg[], searchTerm: string): Promise<Stats> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!searchTerm.trim()) {
                resolve(getStats(messages));
                return;
            }

            const filtered = getStats(messages.filter((msg: Msg) =>
                msg.content.toLowerCase().includes(searchTerm.toLowerCase())
            ));
            resolve(filtered);
        }, 0);
    });
};

interface SearchProps {
    file: TxtFile
}

const Search: Component<SearchProps> = (props) => {
    const [search, setSearch] = createSignal("")
    const [debouncedSearch, setDebouncedSearch] = createSignal("")

    createEffect(() => {
        const searchValue = search();
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(searchValue);
        }, 200);

        onCleanup(() => clearTimeout(timeoutId));
    });

    const [Messages] = createResource(
        () => ({ messages: parseTxt(props.file.content), search: debouncedSearch() }),
        async ({ messages, search }) => {
            return await MessagesAsync(messages, search);
        }
    );

    return (
        <div>
            <input
                class={styles.search}
                placeholder="Search"
                onInput={(e) => setSearch(e.currentTarget.value)}
                value={search()}
            />
            <div class={styles.output}>
                <Show when={!Messages.loading}
                    fallback={
                        <p>loading</p>
                    }>
                    <div class={styles.left}>
                        {Messages()?.people.map(person => (
                            <div class={styles.person}>
                                <p class={styles.name}>{person.name}: </p>
                                <p class={styles.number}>{person.number}</p>
                            </div>
                        ))}
                    </div>
                    <div class={styles.right}>
                        <Show when={Messages()?.messages.length > 0}
                            fallback={
                                <p>No matches found</p>
                            }>
                            {Messages()?.messages.map((msg: Msg) => (
                                <div class={styles.message}>
                                    <p class={styles.author}>{msg.author}</p>
                                    <p class={styles.content}>{msg.content}</p>
                                </div>
                            ))}
                        </Show>
                    </div>
                </Show>
            </div>
        </div>
    )
}

export default Search
