class ActualImage {

}
class ActualVideo {

}

conDB = new DatabaseToFrom();

class DataContentMain {
    #account;
    #video;
    #title;
    #description;
    #comments;
    #views;
    #emojis;
    #source;
    #contentId;
    #init = false;
    #instanceId;

    /** constructor for base content
     * 
     * @param {Account} _account 
     * @param {ActualVideo} _video 
     * @param {String} _title
     * @param {String} _description
     */
    /*constructor( _account, _video, _title, _description ) {
        this.#account = _account;
        this.#video = _video;
        this.#title = _title;
        this.#description = _description;
        this.#comments = new DataCommentSet();
    }*/

    constructor( _contentId ) {
        this.#contentId = _contentId;
        this.#account = undefined;
        this.#source = undefined;
        this.#title = undefined;
        this.#description = undefined;
        this.#views = undefined;
        this.#emojis = undefined;
        this.#comments = null;
        this.#instanceId = Math.random() * 1<<16;
    }

    async init() {
        if(this.#init) return this;

        let tempContent = await conDB.getFromDB(['content', [this.#contentId]]);

        if (!tempContent || tempContent.length === 0) {
            console.error(`Content with ID ${this.#contentId} not found.`);
            return this; // Exit initialization gracefully
        }

        let tempAccount = await conDB.getFromDB(['users', [tempContent[0][0]]])
        let tempEmojis = await conDB.getAllCorI(['user_interactions', this.#contentId]);
        let emojis = '';
        for(let i=0; i<tempEmojis.length; i++) {
            emojis += tempEmojis[i][3];
        }
        let tempCommentData = await conDB.getAllCorI(['user_comment', this.#contentId]);
        console.log("temp comments: ", tempCommentData);

        this.#account = new Account(tempAccount[1], tempAccount[2]);
        await this.#account.init();
        this.#source = tempContent[0][2];
        this.#title = tempContent[0][3];
        this.#description = tempContent[0][4];
        this.#views = tempContent[0][5];
        this.#emojis = emojis;
        this.#comments = new DataCommentSet(tempCommentData);
        console.log(this.#comments);

        this.#init = true;
        return this;
    }

    getProfile() {
        return this.#account.getProfile();
    }
    getVideo() {
        return this.#video;
    }
    getTitle() {
        return this.#title
    }
    getDescription() {
        return this.#description;
    }
    getComments() {
        return this.#comments;
    }
    getViews() {
        return this.#views;
    }
    getEmojis() {
        return this.#emojis;
    }
    getSource() {
        return this.#source;
    }
    getId() {
        return this.#instanceId;
    }
    getCommentCount() {
        return this.#comments.getSize();
    }

    setId( _instanceId ) {
        this.#instanceId = _instanceId;
    }
    setTitle( _verificaionKey, _title ) {
        if( !this.#account.verify(_verificationKey) )
            return false;

        this.#title = _title;
        return true;
    }
    setDescription( _verificaionKey, _description ) {
        if( !this.#account.verify(_verificationKey) )
            return false;

        this.#description = _description;
        return true;
    }


    /** adds a comment to this post
     * 
     * @param _account
     * @param _verificationKey
     * @param {DataComment} _comment
     * @return true, if successful
     * @return false, if unsuccessful
     */
    addComment( _comment ) {
        conDB.insertIntoDB(['user_comment', [this.#account[0], this.#account[1], this.#contentId, _comment, 0, 0]])
        return this.#comments.addComment(_comment);
    }
}

class DataCommentSet {
    #list;

    constructor( _dbComments ) {
        this.#list = [];
        if(_dbComments.length != 0) {
            for(let i=0; i<_dbComments.length; i++) {
                this.#list.push(_dbComments[i][3]);
            }
        }
    }

    addComment( _comment ) {
        this.#list.push(_comment);
        return true;
    }

    /** new comment list
     * 
     * @param {int} _start 
     * @param {int} _end 
     * @returns new list of comments, from comments, in descending order, from _start to _end
     */
    getComments( _startInclusive, _endExclusive ) {
        if( _startInclusive < 0 ) _startInclusive = 0;
        if( _endExclusive > this.#list.length ) _endExclusive = this.#list.length;

        var _list = [];

        for( var _i = _endExclusive - 1; _i >= _startInclusive; _i -- )
            _list.push(this.#list[_i]);

        return _list;
    }
    getSize() {
        return this.#list.length;
    }

    isEmpty() {
        return this.#list.length == 0;
    }
}

class DataComment {
    #account;
    #text;
    #shadowbanned;
    #date;
    #algoId;

    constructor( _account, _text, _algoId, _date ) {
        this.#shadowbanned = !this.passesSensorshipCheck(_account, _text);
        this.#account = _account;
        this.#text = _text;
        this.#account.getProfile().addComment(this);
        this.#date = [1, 1, 1984];
        if( _date != undefined )
            this.#date = _date;
        this.#algoId = _algoId;
    }
    
    /** censorship test
     * 
     * @param {Account} _account 
     * @param {String} _text 
     * @return true if not censored
     * @return false if censored
     */
    passesSensorshipCheck( _account, _text ) {
        // check for stuff like
        // anime profile picture
        // liberal politics
        // american nationality
        // etc
        if( /*any of those checks*/true )
            return false;
        return true;
    }
    isShadowBanned() {
        return this.#shadowbanned == true;
    }

    getAccount() {
        return this.#account;
    }
    getText() {
        return this.#text;
    }
    getDate() {
        return this.#date;
    }
    getId() {
        return this.#algoId;
    }

    setText( _verificationKey, _text ) {
        if( !this.#account.verify(_verificationKey) )
            return false;
        if( !this.passesSensorshipCheck(this.#account, _text) )
            return false;

        this.#text = _text;
        return true;
    }
}

class TextFileYes {
    #string;
    constructor( _string ) {
        this.#string = _string;
    }
    getString() {
        return this.#string;
    }
}