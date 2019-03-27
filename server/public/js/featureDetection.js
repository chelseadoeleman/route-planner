function querySelectorAllExists() {
    return 'querySelectorAll' in document
        && typeof document.body.querySelectorAll === 'function'
}

function getElementsByClassNameExists() {
    return 'getElementsByClassName' in document
        && typeof document.getElementsByClassName === 'function'
}

function getElementsByTagNameExists() {
    return 'getElementsByTagName' in document.body
        && typeof document.body.getElementsByTagName === 'function'
}

function XMLHttpRequestExists() {
    return 'XMLHttpRequest' in window
        && typeof window.XMLHttpRequest === 'function'
}

function geolocationExists() {
    return 'geolocation' in navigator
        && typeof navigator.geolocation === 'object'
}

function setAttributeExists() {
    return 'setAttribute' in document.body
        && typeof document.body.setAttribute === 'function'
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
    if (querySelectorAllExists()) {
        return document.querySelectorAll('.' + className)
    } else if (getElementsByClassNameExists()) {
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
    return getElementsByTagNameExists() 
        && XMLHttpRequestExists()
        && geolocationExists()
        && setAttributeExists()
}