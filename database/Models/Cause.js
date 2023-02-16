class Cause {
    constructor(cause_id, name, short_description, long_description, start_date, end_date, latitude, longitude, duration_id, isUrgent, image, creator_id, city_id, category_id) {
        this.causeId = cause_id;
        this.name = name;
        this.shortDescription = short_description;
        this.longDescription = long_description;
        this.startDate = start_date;
        this.endDate = end_date;
        this.latitude = latitude;
        this.longitude = longitude;
        this.durationId = duration_id;
        this.isUrgent = isUrgent;
        this.image = image;
        this.creatorId = creator_id;
        this.cityId = city_id;
        this.categoryId = category_id;
    }
}

module.exports = Cause;