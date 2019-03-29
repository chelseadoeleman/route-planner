if (canMakeUseOfJavaScript()) {
    var main = document.getElementsByTagName('main')[0]
    if(main) {
        var transportLink = document.createElement('a')
        transportLink.href = '/transport'
        transportLink.innerText = 'Go from my current location'
        
        var setLocationForm = document.createElement('form')
        setLocationForm.name = 'from'
        setLocationForm.action = '/setLocation'
        setLocationForm.method = 'POST'
        
        var formLabel = document.createElement('label')
        formLabel.htmlFor = 'from'
        formLabel.innerText = 'From'
        
        var formInput = document.createElement('input')
        formInput.type = 'text'
        formInput.id = 'from'
        formInput.name = 'location'
        
        var formButton = document.createElement('button')
        formButton.type = 'submit'
        formButton.innerText = 'Start my route'
        
        setLocationForm.appendChild(formLabel)
        setLocationForm.appendChild(formInput)
        setLocationForm.appendChild(formButton)
        
        attachEventListener(transportLink, 'click', function(event) {
            if(event.preventDefault) {
                event.preventDefault()
            }
            navigator.geolocation.getCurrentPosition(function(position) {
                location.replace('/transport?name=currentLocation&lat=' + position.coords.latitude + '&lng=' + position.coords.longitude)
            })
            return false 
        })
    
        main.appendChild(transportLink)
        main.appendChild(setLocationForm)
    }
}