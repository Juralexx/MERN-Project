import axios from "axios";

/**
 * Check if were at the root of the site
 */

export const isHome = window.location.pathname === '/'

/**
 * Add a body class
 */

export const addBodyClass = (className) => {
    document.body.classList.add(className)
}

/**
 * Remove a body class
 */

export const removeBodyClass = (className) => {
    document.body.classList.remove(className)
}

/**
 * Replace first body class by the second
 */

export const replaceBodyClass = (classToAdd, classToRemove) => {
    document.body.classList.add(classToAdd)
    document.body.classList.remove(classToRemove)
}

/**
 * Return the value of the required local storage key
 */

export const getStorage = (item) => {
    return localStorage.getItem(item)
}

/**
 * Sets the value of the pair identified by key to value
 */

export const setStorage = (item, value) => {
    return localStorage.setItem(item, value)
}

/**
 * Return a randam ID.
 */

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
 * Remove all special characters
 */

export const removeSpecialChars = (string) => {
    const noSpecialChars = string.replace(/[^\w ]/g, ' ');
    return noSpecialChars
}

/**
 * Check pseudo validity.
 */

export const onlyLettersSpacesAndDashes = (string) => {
    // eslint-disable-next-line
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
 * Check if string contains any letter.
 */

export const containsAnyLetters = (string) => {
    const regexp = new RegExp(/[a-zA-Z]/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Check if string contains only letter.
 */

export const onlyLetters = (string) => {
    const regexp = new RegExp(/^[a-zA-Z]*$/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Check if string contains any numbers.
 */

export const containsAnyNumbers = (string) => {
    const regexp = new RegExp(/[0-9]/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Check if string contains only numbers.
 */

export const onlyNumbers = (string) => {
    const regexp = new RegExp(/^[0-9]*$/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Check email validity.
 */

export const isEmailValid = (email) => {
    // eslint-disable-next-line
    const regexp = new RegExp(/^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i)
    if (regexp.test(email)) return true
    else return false
}

/**
 * Check french phone number validity.
 */

export const isPhoneValid = (phone) => {
    const regexp = new RegExp(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/)
    if (regexp.test(phone)) return true
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
    return (1 + ((hours - 1))) + "h" + minutes.toString().padStart(2, "0");
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
 * Remove choosen item from specified array
 */

export const deleteItemFromArray = (array, key) => {
    let arr = [...array]
    arr.splice(key, 1)
    return arr
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
 * 
 */

export const fullImage = (props) => {
    return ({
        backgroundImage: `url(${props})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
    })
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
    // eslint-disable-next-line
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
 * Get différence between two number and add "+" before
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
    "À": "A",
    "Á": "A",
    "Â": "A",
    "Ã": "A",
    "Ä": "A",
    "Å": "A",
    "Ấ": "A",
    "Ắ": "A",
    "Ẳ": "A",
    "Ẵ": "A",
    "Ặ": "A",
    "Æ": "AE",
    "Ầ": "A",
    "Ằ": "A",
    "Ȃ": "A",
    "Ç": "C",
    "Ḉ": "C",
    "È": "E",
    "É": "E",
    "Ê": "E",
    "Ë": "E",
    "Ế": "E",
    "Ḗ": "E",
    "Ề": "E",
    "Ḕ": "E",
    "Ḝ": "E",
    "Ȇ": "E",
    "Ì": "I",
    "Í": "I",
    "Î": "I",
    "Ï": "I",
    "Ḯ": "I",
    "Ȋ": "I",
    "Ð": "D",
    "Ñ": "N",
    "Ò": "O",
    "Ó": "O",
    "Ô": "O",
    "Õ": "O",
    "Ö": "O",
    "Ø": "O",
    "Ố": "O",
    "Ṍ": "O",
    "Ṓ": "O",
    "Ȏ": "O",
    "Ù": "U",
    "Ú": "U",
    "Û": "U",
    "Ü": "U",
    "Ý": "Y",
    "à": "a",
    "á": "a",
    "â": "a",
    "ã": "a",
    "ä": "a",
    "å": "a",
    "ấ": "a",
    "ắ": "a",
    "ẳ": "a",
    "ẵ": "a",
    "ặ": "a",
    "æ": "ae",
    "ầ": "a",
    "ằ": "a",
    "ȃ": "a",
    "ç": "c",
    "ḉ": "c",
    "è": "e",
    "é": "e",
    "ê": "e",
    "ë": "e",
    "ế": "e",
    "ḗ": "e",
    "ề": "e",
    "ḕ": "e",
    "ḝ": "e",
    "ȇ": "e",
    "ì": "i",
    "í": "i",
    "î": "i",
    "ï": "i",
    "ḯ": "i",
    "ȋ": "i",
    "ð": "d",
    "ñ": "n",
    "ò": "o",
    "ó": "o",
    "ô": "o",
    "õ": "o",
    "ö": "o",
    "ø": "o",
    "ố": "o",
    "ṍ": "o",
    "ṓ": "o",
    "ȏ": "o",
    "ù": "u",
    "ú": "u",
    "û": "u",
    "ü": "u",
    "ý": "y",
    "ÿ": "y",
    "Ā": "A",
    "ā": "a",
    "Ă": "A",
    "ă": "a",
    "Ą": "A",
    "ą": "a",
    "Ć": "C",
    "ć": "c",
    "Ĉ": "C",
    "ĉ": "c",
    "Ċ": "C",
    "ċ": "c",
    "Č": "C",
    "č": "c",
    "C̆": "C",
    "c̆": "c",
    "Ď": "D",
    "ď": "d",
    "Đ": "D",
    "đ": "d",
    "Ē": "E",
    "ē": "e",
    "Ĕ": "E",
    "ĕ": "e",
    "Ė": "E",
    "ė": "e",
    "Ę": "E",
    "ę": "e",
    "Ě": "E",
    "ě": "e",
    "Ĝ": "G",
    "Ǵ": "G",
    "ĝ": "g",
    "ǵ": "g",
    "Ğ": "G",
    "ğ": "g",
    "Ġ": "G",
    "ġ": "g",
    "Ģ": "G",
    "ģ": "g",
    "Ĥ": "H",
    "ĥ": "h",
    "Ħ": "H",
    "ħ": "h",
    "Ḫ": "H",
    "ḫ": "h",
    "Ĩ": "I",
    "ĩ": "i",
    "Ī": "I",
    "ī": "i",
    "Ĭ": "I",
    "ĭ": "i",
    "Į": "I",
    "į": "i",
    "İ": "I",
    "ı": "i",
    "Ĳ": "IJ",
    "ĳ": "ij",
    "Ĵ": "J",
    "ĵ": "j",
    "Ķ": "K",
    "ķ": "k",
    "Ḱ": "K",
    "ḱ": "k",
    "K̆": "K",
    "k̆": "k",
    "Ĺ": "L",
    "ĺ": "l",
    "Ļ": "L",
    "ļ": "l",
    "Ľ": "L",
    "ľ": "l",
    "Ŀ": "L",
    "ŀ": "l",
    "Ł": "l",
    "ł": "l",
    "Ḿ": "M",
    "ḿ": "m",
    "M̆": "M",
    "m̆": "m",
    "Ń": "N",
    "ń": "n",
    "Ņ": "N",
    "ņ": "n",
    "Ň": "N",
    "ň": "n",
    "ŉ": "n",
    "N̆": "N",
    "n̆": "n",
    "Ō": "O",
    "ō": "o",
    "Ŏ": "O",
    "ŏ": "o",
    "Ő": "O",
    "ő": "o",
    "Œ": "OE",
    "œ": "oe",
    "P̆": "P",
    "p̆": "p",
    "Ŕ": "R",
    "ŕ": "r",
    "Ŗ": "R",
    "ŗ": "r",
    "Ř": "R",
    "ř": "r",
    "R̆": "R",
    "r̆": "r",
    "Ȓ": "R",
    "ȓ": "r",
    "Ś": "S",
    "ś": "s",
    "Ŝ": "S",
    "ŝ": "s",
    "Ş": "S",
    "Ș": "S",
    "ș": "s",
    "ş": "s",
    "Š": "S",
    "š": "s",
    "Ţ": "T",
    "ţ": "t",
    "ț": "t",
    "Ț": "T",
    "Ť": "T",
    "ť": "t",
    "Ŧ": "T",
    "ŧ": "t",
    "T̆": "T",
    "t̆": "t",
    "Ũ": "U",
    "ũ": "u",
    "Ū": "U",
    "ū": "u",
    "Ŭ": "U",
    "ŭ": "u",
    "Ů": "U",
    "ů": "u",
    "Ű": "U",
    "ű": "u",
    "Ų": "U",
    "ų": "u",
    "Ȗ": "U",
    "ȗ": "u",
    "V̆": "V",
    "v̆": "v",
    "Ŵ": "W",
    "ŵ": "w",
    "Ẃ": "W",
    "ẃ": "w",
    "X̆": "X",
    "x̆": "x",
    "Ŷ": "Y",
    "ŷ": "y",
    "Ÿ": "Y",
    "Y̆": "Y",
    "y̆": "y",
    "Ź": "Z",
    "ź": "z",
    "Ż": "Z",
    "ż": "z",
    "Ž": "Z",
    "ž": "z",
    "ſ": "s",
    "ƒ": "f",
    "Ơ": "O",
    "ơ": "o",
    "Ư": "U",
    "ư": "u",
    "Ǎ": "A",
    "ǎ": "a",
    "Ǐ": "I",
    "ǐ": "i",
    "Ǒ": "O",
    "ǒ": "o",
    "Ǔ": "U",
    "ǔ": "u",
    "Ǖ": "U",
    "ǖ": "u",
    "Ǘ": "U",
    "ǘ": "u",
    "Ǚ": "U",
    "ǚ": "u",
    "Ǜ": "U",
    "ǜ": "u",
    "Ứ": "U",
    "ứ": "u",
    "Ṹ": "U",
    "ṹ": "u",
    "Ǻ": "A",
    "ǻ": "a",
    "Ǽ": "AE",
    "ǽ": "ae",
    "Ǿ": "O",
    "ǿ": "o",
    "Þ": "TH",
    "þ": "th",
    "Ṕ": "P",
    "ṕ": "p",
    "Ṥ": "S",
    "ṥ": "s",
    "X́": "X",
    "x́": "x",
    "Ѓ": "Г",
    "ѓ": "г",
    "Ќ": "К",
    "ќ": "к",
    "A̋": "A",
    "a̋": "a",
    "E̋": "E",
    "e̋": "e",
    "I̋": "I",
    "i̋": "i",
    "Ǹ": "N",
    "ǹ": "n",
    "Ồ": "O",
    "ồ": "o",
    "Ṑ": "O",
    "ṑ": "o",
    "Ừ": "U",
    "ừ": "u",
    "Ẁ": "W",
    "ẁ": "w",
    "Ỳ": "Y",
    "ỳ": "y",
    "Ȁ": "A",
    "ȁ": "a",
    "Ȅ": "E",
    "ȅ": "e",
    "Ȉ": "I",
    "ȉ": "i",
    "Ȍ": "O",
    "ȍ": "o",
    "Ȑ": "R",
    "ȑ": "r",
    "Ȕ": "U",
    "ȕ": "u",
    "B̌": "B",
    "b̌": "b",
    "Č̣": "C",
    "č̣": "c",
    "Ê̌": "E",
    "ê̌": "e",
    "F̌": "F",
    "f̌": "f",
    "Ǧ": "G",
    "ǧ": "g",
    "Ȟ": "H",
    "ȟ": "h",
    "J̌": "J",
    "ǰ": "j",
    "Ǩ": "K",
    "ǩ": "k",
    "M̌": "M",
    "m̌": "m",
    "P̌": "P",
    "p̌": "p",
    "Q̌": "Q",
    "q̌": "q",
    "Ř̩": "R",
    "ř̩": "r",
    "Ṧ": "S",
    "ṧ": "s",
    "V̌": "V",
    "v̌": "v",
    "W̌": "W",
    "w̌": "w",
    "X̌": "X",
    "x̌": "x",
    "Y̌": "Y",
    "y̌": "y",
    "A̧": "A",
    "a̧": "a",
    "B̧": "B",
    "b̧": "b",
    "Ḑ": "D",
    "ḑ": "d",
    "Ȩ": "E",
    "ȩ": "e",
    "Ɛ̧": "E",
    "ɛ̧": "e",
    "Ḩ": "H",
    "ḩ": "h",
    "I̧": "I",
    "i̧": "i",
    "Ɨ̧": "I",
    "ɨ̧": "i",
    "M̧": "M",
    "m̧": "m",
    "O̧": "O",
    "o̧": "o",
    "Q̧": "Q",
    "q̧": "q",
    "U̧": "U",
    "u̧": "u",
    "X̧": "X",
    "x̧": "x",
    "Z̧": "Z",
    "z̧": "z",
};

let chars = Object.keys(characterMap).join('|')
let allAccents = new RegExp(chars, 'g')

export const removeAccents = (string) => {
    return string.replace(allAccents, (match) => {
        return characterMap[match];
    })
}