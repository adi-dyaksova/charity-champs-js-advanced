import { CharityMarker } from './map_model.js'

const currentMarkers = [];

mapboxgl.accessToken = 'pk.eyJ1IjoibmFua292IiwiYSI6ImNsYnNjZndpZDBwYnIzb250MjVsY2U5Y2QifQ.Yg7cmhmI1DRyolZYmoaoPg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [23.320039, 42.696156],
    zoom: 11
});


function flyToMe(_zoom) {
    navigator.geolocation.getCurrentPosition(getCoords)
    function getCoords(pos) {
        //error handling
        map.flyTo({ center: [pos.coords.longitude, pos.coords.latitude], zoom: _zoom })
    }
}

flyToMe(12)



function removeAllMarkers() {
    currentMarkers.forEach(marker => marker.remove())
}

function displayMarkers(causes) {
    causes.forEach(cause => {
        const marker = new mapboxgl.Marker({ color: cause["isUrgent"] ? "red" : "lightblue" })
            .setLngLat([cause["longitude"], cause["latitude"]])
            .setPopup(new mapboxgl.Popup({
                className: "popup-window",
                maxWidth: "none",
            }
            ).setHTML(`<div class="popup">
                         <h1>${cause["name"]}</h1>
                        <a href="charity.html?cause=${encodeURIComponent(JSON.stringify(cause))}">Виж повече!</a>
                       </div>`))
            .addTo(map)

        currentMarkers.push(marker)
    })
}

//TODO: fix repetitive code
function getCauses() {
    fetch("/getCauses", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {

            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not load causes.")
            }
        })
        .then(data => {
            //displayCauses(data);
            displayMarkers(data);
        })
        .catch((error) => console.log(error))
}

async function displayFilteredMarkers() {
    const filteredCauses = await getFilteredCauses();
    console.log(filteredCauses);
    removeAllMarkers();
    displayMarkers(filteredCauses);
}

document.getElementById("save-filters").addEventListener("click", () => displayFilteredMarkers())

getCauses()

//marker.remove() премахва маркера от картата

