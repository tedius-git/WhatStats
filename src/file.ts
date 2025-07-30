import { Setter } from "solid-js"

export interface TxtFile {
    name: string,
    size: string,
    content: string,
}

export function formatFileSize(bytes: number): string {
    const MB = 1024 * 1024;
    const GB = 1024 * MB;

    if (bytes >= GB) {
        return (bytes / GB).toFixed(2) + " GB";
    } else if (bytes >= MB) {
        return (bytes / MB).toFixed(2) + " MB";
    } else {
        return (bytes / 1024).toFixed(2) + " KB";
    }
}


export function readFileFromInput(e: Event, setFile: Setter<TxtFile | null>) {
    const target = e.target as HTMLInputElement
    if (target.files == null) {
        setFile(null)
    } else {
        const file = target.files[0]
        const name = file.name.split(".txt")[0]
        const size = file.size
        let fileReader = new FileReader()
        fileReader.onload = () => {
            setFile({ name: name, size: formatFileSize(size), content: fileReader.result as string })
            localStorage.setItem("content", fileReader.result as string)
            localStorage.setItem("name", name as string)
            localStorage.setItem("size", formatFileSize(size) as string)
        }
        fileReader.readAsText(file)
    }
}


export function erraseFile(setFile: Setter<TxtFile | null>) {
    setFile(null)
    localStorage.clear()
}
