export type Stats = {
    numMsg: number
    people: Person[]
    messages: Msg[]
}

export type Person = {
    name: string, number: number
}


type Date = {
    day: number,
    month: number,
    year: number,
    hour: number,
    minuts: number,
    period: "a. m." | "p. m.",
}

export type Msg = {
    author?: string,
    date: Date,
    content: string
}

export function getStats(msgs: Msg[]): Stats {
    // const msgs = parseTxt(content).filter(msg => msg.author)
    const people = Array.from(new Set(msgs.map(msg => msg.author).filter((item) => item !== undefined)))
    const msgPerPerson = people.map((person) => {
        return {
            name: person,
            number: msgs.filter((msg) => msg.author === person).length
        }
    }).toSorted((person, prev) => prev.number - person.number)
    return {
        messages: msgs,
        numMsg: msgs.length,
        people: msgPerPerson,
    }
}

const getDate = (line: string): Date => {
    const [date, time] = line.split("-")[0].split(",");
    const [day, month, year] = date.trim().split("/").map(Number);

    const [hour, minuts] = time.trim().split(":").map((n) => parseInt(n));

    const period = time.match("p. m.") ? "a. m." : "p. m.";

    return {
        day,
        month,
        year,
        hour,
        minuts,
        period
    };
}

const getAuthor = (line: string): string | undefined => {
    if (line.split("-")[1].includes(":")) {
        return line.split("-")[1].split(":")[0].trim()
    }
}

export function parseTxt(content: string): Msg[] {
    const dateLineRegex = /^\d{1,2}\/\d{1,2}\/\d{4},/;
    const lines = content.split("\n");

    const messages: Msg[] = [];

    for (const line of lines) {
        if (dateLineRegex.test(line.trim())) {
            messages.push({
                author: getAuthor(line),
                date: getDate(line),
                content: line.split("-")[1].includes(":") ? line.split("-")[1].split(":")[1].trim() : line.split("-")[1].trim()
            });
        } else if (messages.length > 0) {
            messages[messages.length - 1].content += "\n" + line;
        }
    }
    return messages.filter(msg => msg.author)
}
