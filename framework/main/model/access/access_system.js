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
}