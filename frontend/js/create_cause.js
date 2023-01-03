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

let marker = false;

map.on('click', (e) => {
    if (marker) marker.remove()
    marker = new mapboxgl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)

});

//marker.getLngLat() връща обект с координатите

