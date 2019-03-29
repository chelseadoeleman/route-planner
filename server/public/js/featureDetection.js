function querySelectorAllSupported() {
    return 'querySelectorAll' in document
        && typeof document.body.querySelectorAll === 'function'
}

function getElementsByClassNameSupported() {
    return 'getElementsByClassName' in document
        && typeof document.getElementsByClassName === 'function'
}

function getElementsByTagNameSupported() {
    return 'getElementsByTagName' in document.body
        && typeof document.body.getElementsByTagName === 'function'
}

function XMLHttpRequestSupported() {
    return 'XMLHttpRequest' in window
        && typeof window.XMLHttpRequest === 'function'
}

function geolocationSupported() {
    return 'geolocation' in navigator
        && typeof navigator.geolocation === 'object'
}

function setAttributeSupported() {
    return 'setAttribute' in document.body
        && typeof document.body.setAttribute === 'function'
}

function innerHTMLSupported() {
    return 'innerHTML' in document.body
        && typeof document.body.innerHTML === 'string'
}

function innerTextSupported() {
    return 'innerText' in document.body
        && typeof document.body.innerText === 'string'
}

function indexOfSupported() {
    return 'indexOf' in Array.prototype
        && typeof Array.prototype.indexOf === 'function'
}

function splitSupported() {
    return 'split' in String.prototype
        && typeof String.prototype.split === 'function'
}

function replaceSupported() {
    return 'replace' in String.prototype
        && typeof String.prototype.replace === 'function'
}

function parseSupported() {
    return 'parse' in JSON
        && typeof JSON.parse === 'function'
}

function appendChildSupported() {
    return 'appendChild' in document
        && typeof document.appendChild === 'function'
}

function mapSupported() {
    return 'Map' in window
        && typeof window.Map === 'function'
}

function getElementsByClassNameAlternative(className) {
    var matches = []
    var tags = document.getElementsByTagName("*")

    for (var i = 0; i < tags.length; i++) {
        var classNames = tags[i].className.split(' ')

        for (var j = 0; j < classNames.length; j++) {
            if (classNames[j] == className) {
                matches.push(tags[i])
            }
        }
    }

    return matches
}

function getHtmlElementsByClass(className) {
    if (querySelectorAllSupported()) {
        return document.querySelectorAll('.' + className)
    } else if (getElementsByClassNameSupported()) {
        return document.getElementsByClassName(className)
    } else {
        return getElementsByClassNameAlternative(className)
    }
}

function attachEventListener(target, eventName, callback) {
    if ('addEventListener' in target) {
        target.addEventListener(eventName, callback)
    } else if ('attachEvent' in target) {
        target.attachEvent(eventName, callback)
    } else {
        throw new Error('cannot attach event')
    }
}

function canMakeUseOfJavaScript() {
    return getElementsByTagNameSupported() 
        && XMLHttpRequestSupported()
        && geolocationSupported()
        && setAttributeSupported()
        && innerHTMLSupported()
        && innerTextSupported()
        && indexOfSupported()
        && splitSupported()
        && replaceSupported()
        && parseSupported()
        && appendChildSupported()
        && mapSupported()
}