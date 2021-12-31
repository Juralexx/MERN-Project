export const dateParser = (num) => {
    let options = {year: "numeric", month: "short", day: "2-digit" }
    let timestamp = Date.parse(num)
    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)
    return date.toString()
}