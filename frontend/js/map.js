import { CharityMarker } from './map_model.js'

mapboxgl.accessToken = 'pk.eyJ1IjoibmFua292IiwiYSI6ImNsYnNjZndpZDBwYnIzb250MjVsY2U5Y2QifQ.Yg7cmhmI1DRyolZYmoaoPg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [23.320039, 42.696156],
    zoom: 11
});

navigator.geolocation.getCurrentPosition(getCoords)
function getCoords(pos) {
    //error handling
    map.flyTo({ center: [pos.coords.longitude, pos.coords.latitude], zoom: 12 })
}


const test = new CharityMarker(1, 23.320039, 42.696156, "Подкрепи бежанци с хранителни продукти")
const test2 = new CharityMarker(1, 23.320039, 42.676156, "Разходи кучетата от общинския приют в Перник")

const test_db = [test, test2]
test_db.forEach(charity => {
    const marker = new mapboxgl.Marker()
        .setLngLat([charity.longitude, charity.latitude])
        .setPopup(new mapboxgl.Popup({
            className: "popup-window",
            maxWidth: "none",
        }
        ).setHTML(charity.constructPopup()))
        .addTo(map)
})



