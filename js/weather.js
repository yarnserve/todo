const weather = document.querySelector('.weather')
const APP_ID = 'a5819ac017fa9d0149bef8ca63834cef'

function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=metric`
  fetch(url)
    .then(res => res.json())
    .then(data => (weather.innerText = `${data.main.temp}℃ ${data.name}`))
}

function saveCoords(coords) {
  localStorage.setItem('coords', JSON.stringify(coords))
}

function geoSucces(position) {
  console.log(position)

  const lat = position.coords.latitude
  const lon = position.coords.longitude

  const coords = {
    latitude: lat,
    longitude: lon,
  }
  saveCoords(coords)
  getWeather(lat, lon)
}

function geoError() {
  console.log('위치 정보를 허용하지 않았습니다.')
}

function askCoords() {
  navigator.geolocation.getCurrentPosition(geoSucces, geoError)
}

function loadCoords() {
  const localCoords = localStorage.getItem('coords')

  if (localCoords === null) {
    askCoords()
  } else {
    const parsedCoords = JSON.parse(localCoords)
    getWeather(parsedCoords.latitude, parsedCoords.longitude)
  }
}

function init() {
  loadCoords()
}

init()
