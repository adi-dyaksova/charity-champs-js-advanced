var config = require('./dbconfig');
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

async function getFilteredCauses(filters) {
    const durations = filters["durations"];
    const categories = filters["categories"];
    const cities = filters["cities"];
    const isUrgent = filters["isUrgent"];
    
    const durationsStr = durations.map(function (a) {
        return "'" + a.replace("'", "''") + "'";
    }).join(",");

    const citiesStr = cities.map(function (a) {
        return "'" + a.replace("'", "''") + "'";
    }).join(",");

    const categoriesStr = categories.map(function (a) {
        return "'" + a.replace("'", "''") + "'";
    }).join(",");

    let whereClause = "";
    if (durationsStr) {
        whereClause += ` (duration_id IN (SELECT duration_id FROM Duration WHERE type IN (${durationsStr} )) OR duration_id IS NULL) AND`;
    }
    if (categoriesStr) {
        whereClause += ` (category_id IN (SELECT category_id FROM Category WHERE name IN (${categoriesStr})) OR category_id IS NULL) AND`;
    }
    if (citiesStr) {
        whereClause += ` (city_id IN (SELECT city_id FROM City WHERE name IN( ${citiesStr})) OR city_id IS NULL) AND`;
    }
    if (isUrgent) {
        whereClause += ` isUrgent = 1 AND`;
    }
    if (whereClause) {
        whereClause = "WHERE " + whereClause.slice(0, -4); // Remove the last "AND"
    }
    const query = `SELECT * FROM Cause ${whereClause}`;
    let pool = await sql.connect(config);
    const causes = await pool.request().query(query);
    return causes.recordset;
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

async function getCreatedCausesByUser(userId) {
    try {
        let pool = await sql.connect(config);
        let createdCauses = await pool.request().input('id', sql.Int, userId).query("SELECT * FROM [Cause] WHERE creator_id = @id");
        return createdCauses.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function getVolunteeredCausesByUser(userId) {
    try {
        let pool = await sql.connect(config);
        let volunteeredCauses = await pool.request().input('id', sql.Int, userId).query("SELECT * FROM [UserCause] WHERE user_id = @id");
        return volunteeredCauses.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function deleteVolunteeredCause(causeId) {
    try {
        let pool = await sql.connect(config);
        let volunteeredCauses = await pool.request().input('id', sql.Int, causeId).query("DELETE FROM [UserCause] WHERE cause_id = @id");
        return volunteeredCauses.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function deleteCause(causeId) {
    try {
        await deleteVolunteeredCause(causeId);
        let pool = await sql.connect(config);
        let deletedCause = await pool.request().input('id', sql.Int, causeId).query("DELETE FROM [Cause] WHERE cause_id = @id");
        return deletedCause.recordset;
    } catch (error) {
        console.log(error);
    }
}


async function addUser(user) {
    try {
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
            .input('first_name', sql.NVarChar, user.first_name)
            .input('last_name', sql.NVarChar, user.last_name)
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
            .input('name', sql.NVarChar, cause.name)
            .input('short_description', sql.NVarChar, cause.short_description)
            .input('long_description', sql.NVarChar, cause.long_description)
            .input('start_date', sql.Date, cause.start_date)
            .input('end_date', sql.Date, cause.end_date)
            .input('latitude', sql.Float, cause.latitude)
            .input('longitude', sql.Float, cause.longitude)
            .input('duration_id', sql.Int, cause.duration_id)
            .input('isUrgent', sql.Bit, cause.isUrgent)
            .input('image', sql.Int, cause.image)
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
            .input('text', sql.NVarChar, message.text)
            .input('time', sql.NVarChar, message.time) //TODO: not varCHar
            .input('room', sql.NVarChar, message.room)
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
        let messages = await pool.request().input('room', sql.NVarChar, room).query("SELECT * FROM [MESSAGES] WHERE room = @room ORDER BY message_id ");
        return messages.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers: getUsers,
    getCauses: getCauses,
    getFilteredCauses: getFilteredCauses,
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
    addCause: addCause,
    getCreatedCausesByUser: getCreatedCausesByUser,
    getVolunteeredCausesByUser: getVolunteeredCausesByUser,
    deleteVolunteeredCause: deleteVolunteeredCause,
    deleteCause: deleteCause
}