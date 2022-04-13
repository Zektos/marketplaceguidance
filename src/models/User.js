class User {
    constructor(id, username, password, email, userlevel, followedads) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.userlevel = userlevel;
        this.followedads = followedads;
    }
}

module.exports = User;