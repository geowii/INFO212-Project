class RegisterModel {

    newRegister(username, password) {
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

class RegisterCandidate {
    #username;
    #password;

    constructor(username, password) {
        this.#username = username;
        this.#password = password;
    }

    getUsername() { return this.#username; }
    getPassword() { return this.#password; }
}

class RegisterView {

    static newRegister(username, password) {
        if (this.isUsernameTaken(username)) return null;

        return new RegisterView(username, password);
    }

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static isUsernameTaken(username) {
        // Placeholder logic
        return false;
    }

    showMessage(message) {
        alert(message);
    }
}
