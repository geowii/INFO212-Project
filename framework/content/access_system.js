class Account {
    #profile
    #accountId;
    #accountKey;

    constructor( _profile, _accountId, _accountKey ) {
        this.#profile = _profile;
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