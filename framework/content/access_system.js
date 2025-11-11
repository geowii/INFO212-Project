import * as conDB from '../database_con/js_tofrom_db.js';

class Account {
    #profile
    #accountId;
    #accountName;
    #accountKey;

    constructor( _accountId, _accountKey ) {
        this.#profile = new Profile(this, _accountId, null, "");
        this.#accountId = _accountId;
        this.#accountName = conDB.getFromDB(['users', _accountId])[0];
        this.#accountKey = _accountKey;
    }

    verify( _verificaionKey ) {
        return true;
    }

    getProfile() {
        return this.#profile;
    }
}