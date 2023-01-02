export class CharityMarker {
    constructor(id, longitude, latitude, title, isUrgent, category) {
        this.id = id
        this.longitude = longitude
        this.latitude = latitude
        this.title = title
        this.isUrgent = isUrgent
        this.category = category
    }


    constructPopup() {
        return `<div class="popup">
                    <h1>${this.title}</h1>
                    <a href="charity.html">Виж повече!</a>
                </div>`
        //препратката трябва да я оправим като имаме база
    }
}