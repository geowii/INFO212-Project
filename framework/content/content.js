class ActualImage {

}
class ActualVideo {

}

class DataContentMain {
    #account;
    #video;
    #title;
    #description;
    #comments;

    /** constructor for base content
     * 
     * @param {Account} _account 
     * @param {ActualVideo} _video 
     * @param {String} _title
     * @param {String} _description
     */
    constructor( _account, _video, _title, _description ) {
        this.#account = _account;
        this.#video = _video;
        this.#title = _title;
        this.#description = _description;
        this.#comments = new CommentSet();
    }

    getProfile() {
        return this.#account;
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
     * @param {DataComment} _comment
     * @return true, if successful
     * @return false, if unsuccessful
     */
    addComment( _comment ) {
        return this.#comments.addComment(_comment);
    }
}

class DataCommentSet {
    #list;

    constructor() {
        this.#list = [];
    }

    addComment( _comment ) {
        if( !sensorshipCheck(_comment) )
            return false;
        this.#list.push(_comment);
        return true;
    }
    sensorshipCheck( _comment ) {
        // check for stuff like
        // anime profile picture
        // liberal politics
        // american nationality
        // etc
        if( /*any of those checks*/true )
            return false;
        return true;
    }

    /** new comment list
     * 
     * @param {int} _start 
     * @param {int} _end 
     * @returns new list of comments, from comments, in descending order, from _start to _end
     */
    getComments( _start, _end ) {
        if( _start < 0 || _end >= this.#list.length )
            return null;
        _list = [];

        for( var _i = _end; _i >= _start; _i -- )
            _list.push(this.#list[_i]);

        return _list;
    }
}

class DataComment {
    #account;
    #text;

    constructor( _account, _verificationKey, _text ) {
        if( !_account.verify(_verificationKey) )
            throw new Error("failed to verify");

        this.#account = _account;
        this.#text = _text;
        this.#account.getProfile().addComment(this);
    }

    getAccount() {
        return this.#account;
    }
    getText() {
        return this.#text;
    }

    setText( _verificationKey, _text ) {
        if( !this.#account.verify(_verificationKey) )
            return false;

        this.#text = _text;
        return true;
    }
}