var config = require('./dbconfig');
// const sql = require('mssql');
const sql = require('mssql/msnodesqlv8')


async function getUsers() {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT * FROM [User]");
        return users.recordset;

    } catch (error) {
        console.log(error);
    }
}

async function getCauses() {
    try {
        let pool = await sql.connect(config);
        let causes = await pool.request().query("SELECT * FROM [Cause]");
        return causes.recordset;

    } catch (error) {
        console.log(error);
    }
}

async function getCities() {
    try {
        let pool = await sql.connect(config);
        let cities = await pool.request().query("SELECT * FROM [City]");
        return cities.recordset;

    } catch (error) {
        console.log(error);
    }
}

async function getCategories() {
    try {
        let pool = await sql.connect(config);
        let categories = await pool.request().query("SELECT * FROM [Category]");
        return categories.recordset;

    } catch (error) {
        console.log(error);
    }
}

async function getDurations() {
    try {
        let pool = await sql.connect(config);
        let durations = await pool.request().query("SELECT * FROM [Duration]");
        return durations.recordset;

    } catch (error) {
        console.log(error);
    }
}

async function getUser(userId) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request().input('id', sql.Int, userId).query("SELECT * FROM [User] WHERE user_id = @id");
        return user.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function getCause(causeId) {
    try {
        let pool = await sql.connect(config);
        let cause = await pool.request().input('id', sql.Int, causeId).query("SELECT * FROM [Cause] WHERE cause_id = @id");
        return cause.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function getCity(cityId) {
    try {
        let pool = await sql.connect(config);
        let city = await pool.request().input('id', sql.Int, cityId).query("SELECT * FROM [City] WHERE city_id = @id");
        return city.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function getCategory(categoryId) {
    try {
        let pool = await sql.connect(config);
        let category = await pool.request().input('id', sql.Int, categoryId).query("SELECT * FROM [Category] WHERE category_id = @id");
        return category.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function getDuration(durationId) {
    try {
        let pool = await sql.connect(config);
        let duration = await pool.request().input('id', sql.Int, durationId).query("SELECT * FROM [Duration] WHERE duration_id = @id");
        return duration.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function addUser(user) {
    try {
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
            .input('first_name', sql.VarChar, user.first_name)
            .input('last_name', sql.VarChar, user.last_name)
            .input('username', sql.VarChar, user.username)
            .input('password', sql.VarChar, user.password)
            .input('email', sql.VarChar, user.email)
            .execute("InsertUsers");
        return insertUser.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addCause(cause) {
    try {
        let pool = await sql.connect(config);
        let insertCause = await pool.request()
            .input('name', sql.VarChar, cause.name)
            .input('short_description', sql.VarChar, cause.short_description)
            .input('long_description', sql.VarChar, cause.long_description)
            .input('start_date', sql.Date, cause.start_date)
            .input('end_date', sql.Date, cause.end_date)
            .input('latitude', sql.Float, cause.latitude)
            .input('longitude', sql.Float, cause.longitude)
            .input('duration_id', sql.Int, cause.duration_id)
            .input('isUrgent', sql.Bit, cause.isUrgent)
            .input('image', sql.Image, cause.image)
            .input('creator_id', sql.Int, cause.creator_id)
            .input('city_id', sql.Int, cause.city_id)
            .input('category_id', sql.Int, cause.category_id)
            .execute("InsertCause");
        return insertCause.recordsets;
    } catch (error) {
        console.log(error);
    }
}

//Add messages to db
async function addMessage(message) { //TODO: create table in charity-champs.sql
    try {
        let pool = await sql.connect(config);
        let insertMessage = await pool.request()
            .input('username', sql.VarChar, message.username)
            .input('text', sql.VarChar, message.text)
            .input('time', sql.VarChar, message.time) //TODO: not varCHar
            .input('room', sql.VarChar, message.room)
            .execute("InsertMessages");
        return insertMessage.recordsets; //?? recordsets
    } catch (error) {
        console.log(error);
    }
}

//getMeesages from db by room
async function getMessages(room) {
    try {
        let pool = await sql.connect(config);
        let messages = await pool.request().input('room', sql.VarChar, room).query("SELECT * FROM [MESSAGES] WHERE room = @room ORDER BY message_id "); //TODO room won't be sql.Int
        return messages.recordset;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers: getUsers,
    getCauses: getCauses,
    getCities: getCities,
    getCategories: getCategories,
    getDurations: getDurations,
    getUser: getUser,
    getCause: getCause,
    getCity: getCity,
    getCategory: getCategory,
    getDuration: getDuration,
    addUser: addUser,
    addMessage: addMessage,
    getMessages: getMessages,
    addCause: addCause
}