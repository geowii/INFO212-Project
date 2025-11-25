class LoginModel {

    newLogin(username, password) {
        if (!this.usernameValid(username)) return false;
        if (!this.passwordValid(password)) return false;

        return true;
    }

    usernameValid(username) {
        return username && username.length > 0;
    }

    passwordValid(password) {
        return password && password.length > 0;
    }
}

class LoginCandidate {
    #username;
    #password;

    constructor(username, password) {
        this.#username = username;
        this.#password = password;
    }

    getUsername() { return this.#username; }
    getPassword() { return this.#password; }
}

class LoginView {
    static users = []; 

    static newLogin(username, password) {
        if (this.isUsernameTaken(username)) return null;

        const newUser = new LoginView(username, password);
        this.users.push(newUser);
        return newUser;
    }

    static isUsernameTaken(username) {
        return this.users.some(user => user.username === username);
    }

    showMessage(message) {
        alert(message);
    }
}
