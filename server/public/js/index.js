if (canMakeUseOfJavaScript()) {
    var button = document.getElementsByTagName('button')[0]
    var inputForm = document.getElementsByTagName('input')[0]
    var message = document.getElementsByClassName('message')[0]
    
    button.addEventListener('click', () => {
        if (inputForm.value === '') {
            message.style = 'opacity: 1;'
        }
    })

    if (geolocationSupported()) {
        var center = document.getElementsByClassName('Center__wrap')[0]
        if(center) {
            var transportLink = document.createElement('a')
            transportLink.href = '/transport'
            transportLink.innerText = 'Use my current location'
            
            attachEventListener(transportLink, 'click', function(event) {
                if(event.preventDefault) {
                    event.preventDefault()
                }
                navigator.geolocation.getCurrentPosition(function(position) {
                    location.replace('/transport?name=currentLocation&lat=' + position.coords.latitude + '&lng=' + position.coords.longitude)
                })
                return false 
            })
        
            center.appendChild(transportLink)
        }
    } else {
        var main = document.getElementsByTagName('main')[0]
        if(main) {
            var notSupported = document.createElement('p')
            notSupported.innerText = 'Geolocation is not supported, please fill in your location.'
            main.appendChild(notSupported)
        } 
    }
}