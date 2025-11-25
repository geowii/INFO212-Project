conDB = new DatabaseToFrom();

class Account {
    #profile
    #accountId;
    #accountName;
    #accountKey;
    #init = false;

    constructor( _accountId, _accountKey ) {
        this.#accountId = _accountId;
        this.#accountName = undefined;
        this.#profile = undefined;
        this.#accountKey = _accountKey;
    }

    async init() {
        if(this.#init) return this;

        let tempName = await conDB.getFromDB(['users', [this.#accountId]]);

        this.#accountName = tempName[0];
        this.#profile = new Profile(this, this.#accountName, null, "");
        this.#init = true;
        return this;
    }

    getAccountId() {
        return this.#accountId;
    }

    verify( _verificaionKey ) {
        return true;
    }

    getProfile() {
        return this.#profile;
    }

    getId() {
        return this.#accountId;
    }

    getKey() {
        return this.#accountKey;
    }
}

class LoginHandler {
    #usernameInput;
    #passwordInput;
    #registerButton;
    #loginButton;

    #userList = [];

    constructor() {
        this.#userList.push(new Account("user1", "pass1"));
        this.#userList.push(new Account("user2", "pass2"));
    }

    attemptLogin( _accountId, _accountKey ) {
        const accountId = this.#usernameInput.value;
        const accountKey = this.#passwordInput.value;

        const loginAttempt = new Account(accountId, accountKey);

        if (loginAttempt.verify(accountKey)) {
            console.log("Verified:", loginAttempt.getProfile());
        } else {
            console.log("Not verified");
        }
    }


    handleLogin() {
        const username = this.#usernameInput.value;
        const password = this.#passwordInput.value;

        let verifiedAccount = null;

        for (let i = 0; i < this.#userList.length; i++) {
            const account = this.#userList[i];

            if (account.getId() === username && account.verify(password)) {
                verifiedAccount = account;
                break; 
            }
        }

        if (verifiedAccount) {
            this.view.showMessage("Login successful!");
            console.log("Logged in profile:", verifiedAccount.getProfile());
            this.redirectToMainPage();
        } else {
            this.view.showMessage("Invalid credentials.");
        }
    }


    redirectToRegister() {
        window.location.href = "./register.html";
    }
    redirectToMainPage() {
        window.location.href = "user_interface/page/feed.html"
    }
}


