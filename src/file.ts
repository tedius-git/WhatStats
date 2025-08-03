import { Setter } from "solid-js"
import JSZip from "jszip";

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

export async function readFileFromInput(
    e: Event,
    setFile: Setter<TxtFile | null>
) {
    const target = e.target as HTMLInputElement
    if (target.files == null) {
        setFile(null)
        return
    }

    const file = target.files[0]
    const ext = file.name.split(".").pop()?.toLowerCase()

    if (ext === "zip") {
        const zip = await JSZip.loadAsync(file)
        for (const [path, entry] of Object.entries(zip.files)) {
            if (path.endsWith(".txt") && !entry.dir) {
                const content = await entry.async("string")
                const name = path.split("/").pop()?.replace(".txt", "") ?? "archivo"
                const size = new Blob([content]).size

                setFile({ name, size: formatFileSize(size), content })
                localStorage.setItem("content", content)
                localStorage.setItem("name", name)
                localStorage.setItem("size", formatFileSize(size))
                return
            }
        }
        alert("No .txt file found inside de .zip")
        setFile(null)
    } else if (ext === "txt") {
        const name = file.name.split(".txt")[0]
        const size = file.size
        const reader = new FileReader()
        reader.onload = () => {
            const content = reader.result as string
            setFile({ name, size: formatFileSize(size), content })
            localStorage.setItem("content", content)
            localStorage.setItem("name", name)
            localStorage.setItem("size", formatFileSize(size))
        }
        reader.readAsText(file)
    } else {
        alert("Incorrect file type")
        setFile(null)
    }
}


export function erraseFile(setFile: Setter<TxtFile | null>) {
    setFile(null)
    localStorage.clear()
}
