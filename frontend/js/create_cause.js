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

function create_cause() {
    const name = document.getElementById("cause_name").value

    fetch("/addCause", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            //да вземаме ID от базата
            'name': document.getElementById("cause_name").value,
            'short_description': document.getElementById("short-description").value,
            'long_description': document.getElementById("long-description").value,
            'start_date': document.getElementById("cause_date_from").value,
            "end_date": document.getElementById("cause_date_to").value,
            "latitude": marker.getLngLat().lat,
            "longitude": marker.getLngLat().lng,
            "duration_id": /*duration_id[document.getElementById("cause_duration").value]*/ 1,
            "isUrgent": document.getElementById("cause_isUrgent").checked ? 1 : 0,
            "image": document.getElementById("upload-picture").value,
            "creator_id": sessionStorage.id,
            "city_id": /*cities_id[document.getElementById("cause_city").value]*/ 1,
            "category_id": /*categories_id[document.getElementById("cause_category").value]*/ 1
        })
    })
        .then(response => {
            if (response.ok) {
                // /GET cause ID page
                window.location.replace('charity.html');


                notificate(name)
            } else {
                throw new Error("Could not create cause.")
            }
        })
        .catch((error) => console.log(error))
}

document.getElementsByClassName("publish-btn")[0].addEventListener("click", () => create_cause())