class User {
    constructor(user_id, first_name, last_name, username, password, email) {
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

module.exports = User;