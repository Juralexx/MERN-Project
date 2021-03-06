/**
 * Return a randam ID.
 */

import axios from "axios";

export const randomID = (max) => {
    const allCapsAlpha = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"];
    const allUniqueChars = [..."~!@#$%^&*()_+-=[]\\{}|;:,./<>?"];
    const allNumbers = [..."0123456789"];

    const baseline = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha, ...allUniqueChars];

    const generator = (base, len) => {
        return [...Array(len)]
            .map(i => base[Math.random() * base.length | 0])
            .join('');
    }

    return generator(baseline, max)
}

/**
 * Return a randam 24 numbers and letters ID.
 */

export const randomNbLtID = (max) => {
    const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"];
    const allNumbers = [..."0123456789"];

    const baseline = [...allNumbers, ...allLowerAlpha];

    const generator = (base, len) => {
        return [...Array(len)]
            .map(i => base[Math.random() * base.length | 0])
            .join('');
    }

    return generator(baseline, max)
}

/**
 * Return a randam 24 numbers ID.
 */

export const randomNbID = (max) => {
    const allNumbers = [..."0123456789"];
    const baseline = [...allNumbers];

    const generator = (base, len) => {
        return [...Array(len)]
            .map(i => base[Math.random() * base.length | 0])
            .join('');
    }

    return generator(baseline, max)
}

/**
 * Check pseudo validity.
 */

export const onlyLettersSpacesAndDashes = (string) => {
    const regexp = new RegExp(/^[A-Za-z\s\-]+$/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Check if a string contains only letters, numbers and dashes validity.
 */

export const onlyLettersNumbersAndDashes = (string) => {
    const regexp = new RegExp(/^(\w|-)+$/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Check email validity.
 */

export const isEmailValid = (email) => {
    const regexp = new RegExp(/^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i)
    if (regexp.test(email)) return true
    else return false
}

/**
 * Check theme and return choosen values.
 */

export const checkTheme = (light, dark) => {
    const theme = localStorage.getItem("theme")
    if (theme !== null && theme === "light")
        return light
    else return dark
}

/**
 * Return date formated : dd mon. YYY.
 */

export const dateParser = (num) => {
    let options = { year: "numeric", month: "short", day: "2-digit" }
    let timestamp = Date.parse(num)
    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)
    return date.toString()
}

/**
 * Return date formated without year.
 */

export const dateParserWithoutYear = (num) => {
    let options = { month: "short", day: "2-digit" }
    let timestamp = Date.parse(num)
    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)
    return date.toString()
}
/**
 * ISO date to navigator date input format.
 */

export const ISOtoNavFormat = (date) => {
    return date.substring(0, 10)
}

/**
 * Return hours only : hh:mm.
 */

export const getHourOnly = (date) => {
    const hours = date.getUTCHours();
    const minutes = date.getMinutes();
    return (1 + ((hours - 1))) + " h " + minutes.toString().padStart(2, "0");
}

/**
 * Map elements in array and return new dates only.
 */

export const keepNewDateOnly = (arrayToMap, setState) => {
    let array = []
    arrayToMap.map((element, key) => {
        return (
            array = [...array, { index: key, date: element.date.substring(0, 10) }]
        )
    })
    let filteredArray = []
    array.filter(item => {
        let i = filteredArray.findIndex(element => (element.date === item.date));
        if (i <= -1) { filteredArray.push(item) }
        return null;
    });
    setState(filteredArray)
}

/**
 * Return array elements if element.date is less than 24 hours ago.
 */

export const thisDay = (array) => {
    return array.filter(element => element.date.substring(0, 10) === new Date().toISOString().substring(0, 10))
}

/**
 * Return array elements if element.date is between 24 and 48 hours ago.
 */

export const lastDay = (array) => {
    return array.filter(element => element.date.substring(0, 10) === new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().substring(0, 10))
}

/**
 * Return array elements between today and choosen date.
 */

export const timeBetween = (array, days) => {
    let currentDate = new Date();
    let currentDateTime = currentDate.getTime();
    let last30DaysDate = new Date(currentDate.setDate(currentDate.getDate() - days));
    let last30DaysDateTime = last30DaysDate.getTime();

    return array.filter(element => {
        const elementDateTime = new Date(element.date).getTime();
        if (elementDateTime <= currentDateTime && elementDateTime > last30DaysDateTime) {
            return true;
        }
        return false
    }).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
}

/**
 * Reverse array order.
 */

export const reverseArray = (array) => {
    return array.map(array.pop, [...array])
}

/**
 * Group array values by parameter value. Return an array with nested arrays.
 */

export const groupBy = (array, parameter) => {
    let group = array.reduce((r, a) => {
        r[a[parameter]] = [...r[a.id] || [], a]
        return r
    }, {})

    return Object.values(group)
}

/**
 * Remove HTML markers
 */

export const removeHTMLMarkers = (html) => {
    let regex = /(<([^>]+)>)/ig
    return html.replace(regex, '')
}

/**
 * Converts a string to its html characters completely.
 */

export const stringToCharSet = (str) => {
    var buf = [];
    for (var i = str.length - 1; i >= 0; i--) {
        buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return buf.join('')
}

/**
 * Converts an html characterSet into its original character.
 */

export const charSetToChar = (str) => {
    var txt = document.createElement("textarea")
    txt.innerHTML = str
    return txt.value
}

/**
 * Check if array or object are empty.
 */

export const isEmpty = (value) => {
    return (
        value === undefined
        || value === null
        || (typeof value === "object" && Object.keys(value).length === 0)
        || (typeof value === "string" && value.trim().length === 0)
    )
}

/**
 * Check file extension
 */

export const isImage = (file) => {
    const types = ['image/jpg', 'image/jpeg', 'image/bmp', 'image/gif', 'image/png', 'image/svg+xml'];
    return types.some(el => file.type === el);
}

export const isVideo = (file) => {
    const types = ['video/mp4', 'video/webm', 'video/x-m4v', 'video/quicktime'];
    return types.some(el => file.type === el);
}

export const isFile = (file) => {
    const types = [
        '.7z',
        '.ade',
        '.mde',
        '.adp',
        '.apk',
        '.appx',
        '.appxbundle',
        '.aspx',
        '.bat',
        '.com',
        '.dll',
        '.exe',
        '.msi',
        '.cab',
        '.cmd',
        '.cpl',
        '.dmg',
        '.gz',
        '.hta',
        '.ins',
        '.ipa',
        '.iso',
        '.isp',
        '.jar',
        '.js',
        '.jse',
        '.jsp',
        '.lib',
        '.lnk',
        '.msc',
        '.msix',
        '.msixbundle',
        '.msp',
        '.mst',
        '.nsh',
        '.pif',
        '.ps1',
        '.scr',
        '.sct',
        '.wsc',
        '.shb',
        '.sys',
        '.vb',
        '.vbe',
        '.vbs',
        '.vxd',
        '.wsf',
        '.wsh',
        '.tar'
    ]
    return !types.some(el => file.name.endsWith(el))
}

export const isURL = (str) => {
    const regexp = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)
    if (regexp.test(str)) {
        return true
    } else return false
}

export const isURLInText = (text) => {
    const regexp = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+")
    if (regexp.test(text)) {
        return true
    } else return false
}

export const returnURLsInText = (text) => {
    const regexp = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+")
    let txt = text
    let arr = []
    while (regexp.test(txt)) {
        let matched = regexp.exec(txt)[0]
        console.log(matched)
        arr.push(matched)
        txt = txt.replace(matched, '')
    }
    return arr
}

/**
 * Check if array or object are empty.
 */

export const addClass = (state, classe) => {
    if (state) return classe
    else return 'un' + classe
}

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

/**
 * Get diff??rence between two number and add "+" before
 */

export const getDifference = (one, two) => {
    return "+" + (two - one)
}

/**
 * Convert string  in URL.
 */

export const cleanTitleMakeURL = (title, setTitle, setUrl) => {
    let newTitle = title.toLowerCase();
    newTitle = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
    newTitle = newTitle.replace(/[&#,+()$~%^.'":*?!;<>{}/\\\\]/g, " ")
    newTitle = newTitle.replace(/ +/g, " ")
    newTitle = newTitle.trim()
    setTitle(newTitle)

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let URL = newTitle.toLowerCase();
    URL = removeAccents(URL)
    URL = URL.replace(/ /g, "-")
    setUrl(getRndInteger(1000000000, 9999999999) + "/" + URL)
}

/**
 * Detect Enter key press.
 */

export const handleEnterKey = (event, func) => {
    if (event.key === 'Enter') {
        return func()
    } else return
}

/**
 * Basique GeoJSON structure for leaflet.
 */

export const geoJSONStructure = (props) => {
    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": props
                }
            }
        ]
    }
}

export const geolocToFloat = (string) => {
    let lat = string.substr(0, string.indexOf(','))
    let lon = string.substr(string.indexOf(',') + 1, string.length)
    lat = parseFloat(lat)
    lon = parseFloat(lon)
    return [lat, lon]
}

/**
 * Remove choosen characters from string
 */

export const replaceStr = (char, str) => {
    const string = str.replace(char, '')
    return string
}

/**
 * Download file
 */

export const download = async (file) => {
    await axios({
        url: file.url,
        method: 'GET',
        responseType: 'blob'
    })
        .then(res => {
            const link = document.createElement('a')
            link.href = URL.createObjectURL(new Blob([res.data]))
            link.setAttribute('download', file.name)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        })
}

/**
 * Remove all accents.
 */

let characterMap = {
    "??": "A",
    "??": "A",
    "??": "A",
    "??": "A",
    "??": "A",
    "??": "A",
    "???": "A",
    "???": "A",
    "???": "A",
    "???": "A",
    "???": "A",
    "??": "AE",
    "???": "A",
    "???": "A",
    "??": "A",
    "??": "C",
    "???": "C",
    "??": "E",
    "??": "E",
    "??": "E",
    "??": "E",
    "???": "E",
    "???": "E",
    "???": "E",
    "???": "E",
    "???": "E",
    "??": "E",
    "??": "I",
    "??": "I",
    "??": "I",
    "??": "I",
    "???": "I",
    "??": "I",
    "??": "D",
    "??": "N",
    "??": "O",
    "??": "O",
    "??": "O",
    "??": "O",
    "??": "O",
    "??": "O",
    "???": "O",
    "???": "O",
    "???": "O",
    "??": "O",
    "??": "U",
    "??": "U",
    "??": "U",
    "??": "U",
    "??": "Y",
    "??": "a",
    "??": "a",
    "??": "a",
    "??": "a",
    "??": "a",
    "??": "a",
    "???": "a",
    "???": "a",
    "???": "a",
    "???": "a",
    "???": "a",
    "??": "ae",
    "???": "a",
    "???": "a",
    "??": "a",
    "??": "c",
    "???": "c",
    "??": "e",
    "??": "e",
    "??": "e",
    "??": "e",
    "???": "e",
    "???": "e",
    "???": "e",
    "???": "e",
    "???": "e",
    "??": "e",
    "??": "i",
    "??": "i",
    "??": "i",
    "??": "i",
    "???": "i",
    "??": "i",
    "??": "d",
    "??": "n",
    "??": "o",
    "??": "o",
    "??": "o",
    "??": "o",
    "??": "o",
    "??": "o",
    "???": "o",
    "???": "o",
    "???": "o",
    "??": "o",
    "??": "u",
    "??": "u",
    "??": "u",
    "??": "u",
    "??": "y",
    "??": "y",
    "??": "A",
    "??": "a",
    "??": "A",
    "??": "a",
    "??": "A",
    "??": "a",
    "??": "C",
    "??": "c",
    "??": "C",
    "??": "c",
    "??": "C",
    "??": "c",
    "??": "C",
    "??": "c",
    "C??": "C",
    "c??": "c",
    "??": "D",
    "??": "d",
    "??": "D",
    "??": "d",
    "??": "E",
    "??": "e",
    "??": "E",
    "??": "e",
    "??": "E",
    "??": "e",
    "??": "E",
    "??": "e",
    "??": "E",
    "??": "e",
    "??": "G",
    "??": "G",
    "??": "g",
    "??": "g",
    "??": "G",
    "??": "g",
    "??": "G",
    "??": "g",
    "??": "G",
    "??": "g",
    "??": "H",
    "??": "h",
    "??": "H",
    "??": "h",
    "???": "H",
    "???": "h",
    "??": "I",
    "??": "i",
    "??": "I",
    "??": "i",
    "??": "I",
    "??": "i",
    "??": "I",
    "??": "i",
    "??": "I",
    "??": "i",
    "??": "IJ",
    "??": "ij",
    "??": "J",
    "??": "j",
    "??": "K",
    "??": "k",
    "???": "K",
    "???": "k",
    "K??": "K",
    "k??": "k",
    "??": "L",
    "??": "l",
    "??": "L",
    "??": "l",
    "??": "L",
    "??": "l",
    "??": "L",
    "??": "l",
    "??": "l",
    "??": "l",
    "???": "M",
    "???": "m",
    "M??": "M",
    "m??": "m",
    "??": "N",
    "??": "n",
    "??": "N",
    "??": "n",
    "??": "N",
    "??": "n",
    "??": "n",
    "N??": "N",
    "n??": "n",
    "??": "O",
    "??": "o",
    "??": "O",
    "??": "o",
    "??": "O",
    "??": "o",
    "??": "OE",
    "??": "oe",
    "P??": "P",
    "p??": "p",
    "??": "R",
    "??": "r",
    "??": "R",
    "??": "r",
    "??": "R",
    "??": "r",
    "R??": "R",
    "r??": "r",
    "??": "R",
    "??": "r",
    "??": "S",
    "??": "s",
    "??": "S",
    "??": "s",
    "??": "S",
    "??": "S",
    "??": "s",
    "??": "s",
    "??": "S",
    "??": "s",
    "??": "T",
    "??": "t",
    "??": "t",
    "??": "T",
    "??": "T",
    "??": "t",
    "??": "T",
    "??": "t",
    "T??": "T",
    "t??": "t",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "V??": "V",
    "v??": "v",
    "??": "W",
    "??": "w",
    "???": "W",
    "???": "w",
    "X??": "X",
    "x??": "x",
    "??": "Y",
    "??": "y",
    "??": "Y",
    "Y??": "Y",
    "y??": "y",
    "??": "Z",
    "??": "z",
    "??": "Z",
    "??": "z",
    "??": "Z",
    "??": "z",
    "??": "s",
    "??": "f",
    "??": "O",
    "??": "o",
    "??": "U",
    "??": "u",
    "??": "A",
    "??": "a",
    "??": "I",
    "??": "i",
    "??": "O",
    "??": "o",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "???": "U",
    "???": "u",
    "???": "U",
    "???": "u",
    "??": "A",
    "??": "a",
    "??": "AE",
    "??": "ae",
    "??": "O",
    "??": "o",
    "??": "TH",
    "??": "th",
    "???": "P",
    "???": "p",
    "???": "S",
    "???": "s",
    "X??": "X",
    "x??": "x",
    "??": "??",
    "??": "??",
    "??": "??",
    "??": "??",
    "A??": "A",
    "a??": "a",
    "E??": "E",
    "e??": "e",
    "I??": "I",
    "i??": "i",
    "??": "N",
    "??": "n",
    "???": "O",
    "???": "o",
    "???": "O",
    "???": "o",
    "???": "U",
    "???": "u",
    "???": "W",
    "???": "w",
    "???": "Y",
    "???": "y",
    "??": "A",
    "??": "a",
    "??": "E",
    "??": "e",
    "??": "I",
    "??": "i",
    "??": "O",
    "??": "o",
    "??": "R",
    "??": "r",
    "??": "U",
    "??": "u",
    "B??": "B",
    "b??": "b",
    "????": "C",
    "????": "c",
    "????": "E",
    "????": "e",
    "F??": "F",
    "f??": "f",
    "??": "G",
    "??": "g",
    "??": "H",
    "??": "h",
    "J??": "J",
    "??": "j",
    "??": "K",
    "??": "k",
    "M??": "M",
    "m??": "m",
    "P??": "P",
    "p??": "p",
    "Q??": "Q",
    "q??": "q",
    "????": "R",
    "????": "r",
    "???": "S",
    "???": "s",
    "V??": "V",
    "v??": "v",
    "W??": "W",
    "w??": "w",
    "X??": "X",
    "x??": "x",
    "Y??": "Y",
    "y??": "y",
    "A??": "A",
    "a??": "a",
    "B??": "B",
    "b??": "b",
    "???": "D",
    "???": "d",
    "??": "E",
    "??": "e",
    "????": "E",
    "????": "e",
    "???": "H",
    "???": "h",
    "I??": "I",
    "i??": "i",
    "????": "I",
    "????": "i",
    "M??": "M",
    "m??": "m",
    "O??": "O",
    "o??": "o",
    "Q??": "Q",
    "q??": "q",
    "U??": "U",
    "u??": "u",
    "X??": "X",
    "x??": "x",
    "Z??": "Z",
    "z??": "z",
};

let chars = Object.keys(characterMap).join('|')
let allAccents = new RegExp(chars, 'g')

export const removeAccents = (string) => {
    return string.replace(allAccents, (match) => {
        return characterMap[match];
    })
}