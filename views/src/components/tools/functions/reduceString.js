/**
 * Reduce string between 0 and choosen length.
 */

export const reduceString = (string, maxLength) => {
    if (string.length >= maxLength) {
        if (string.substring((maxLength - 1), maxLength) === " ") {
            let cleanSpaces = string.replace(string.substring((maxLength - 1), maxLength), "")
            string = cleanSpaces.substring(0, maxLength) + "..."
        }
        return string.substring(0, maxLength) + "..."
    } else return string
}