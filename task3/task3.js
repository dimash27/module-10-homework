let msgBtn = document.querySelector('#msgBtn')
let locBtn = document.querySelector('#locBtn')
let input = document.querySelector('#input')
let chat = document.querySelector('#chat')

let websocket = new WebSocket('wss://echo.websocket.org/')
websocket.onmessage = function(evt) {
    if (evt.data != '[object GeolocationPosition]')
        printMsg(evt.data, false)
}

msgBtn.addEventListener('click', () => {
    let msg = input.value;
    if (msg) {
        input.classList.remove('warning')
        websocket.send(msg)
        printMsg(msg, true)
        input.value = ''
    }
    else input.classList.add('warning')
})

locBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported')
    } else {
        navigator.geolocation.getCurrentPosition(printLoc, errLoc)
    }
})

function printMsg(text, isClient) {
    let msg = `<div class='${isClient ? 'clientMsg' : 'serverMsg'}'>${text}</div>`
    chat.innerHTML+=msg
}

function printLoc(position) {
    websocket.send(position)
    let lat = position.coords.latitude
    let lng = position.coords.longitude
    let link = `
        <a href='https://www.openstreetmap.org/#map=18/${lat}/${lng}' class='clientMsg' target='_blank'>Geolocation</a>
    `
    chat.innerHTML+=link
}

function errLoc() {
    alert('Could not get your location')
}