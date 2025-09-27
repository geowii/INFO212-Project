class Account {
    #profile
    #accountId;
    #accountKey;

    constructor( _accountId, _accountKey ) {
        this.#profile = new Profile(this, _accountId, null, "");
        this.#accountId = _accountId;
        this.#accountKey = _accountKey;
    }

    verify( _verificaionKey ) {
        return true;
    }

    getProfile() {
        return this.#profile;
    }
}