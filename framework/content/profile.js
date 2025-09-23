class Profile {
    #name;
    #picture;
    #description;
    #account;
    #comments;

    /** constructor for new profile
     * 
     * @param {Account} _account
     * @param {String} _name 
     * @param {ActualImage} _image 
     * @param {String} _description 
     */
    constructor( _account, _name, _image, _description ) {
        this.#name = _name;
        this.#picture = _picture;
        this.#description = _description;
        this.#account = _account;
        this.#comments = new CommentSet();
    }

    getName() {
        return this.#name;
    }
    getPicture() {
        return this.#picture;
    }
    getDescription() {
        return this.#description;
    }
    getComments() {
        return this.#comments;
    }

    /**  updates profile name
     * 
     * @param {String} _name 
     * @param {String} _verificaionKey 
     * @returns true if successful
     * @returns false if unsuccessful
     */
    setName( _name, _verificaionKey ) {
        if( !this.#account.verify(_verificaionKey) )
            return false;
        this.#name = _name;
        return true;
    }
    /** updates profile description
     * 
     * @param {String} _description 
     * @param {String} _verificaionKey 
     * @returns true if successful
     * @returns false if unsuccessful
     */
    setDescription( _description, _verificaionKey ) {
        if( !this.#account.verify(_verificaionKey) )
            return false;
        this.#description = _description;
        return true;
    }
    /** updates profile picture
     * 
     * @param {ActualImage} _image 
     * @param {String} _verificaionKey 
     * @returns true if successful
     * @returns false if unsuccessful
     */
    setPicture( _image, _verificaionKey ) {
        if( !this.#account.verify(_verificaionKey) )
            return false;
        this.#picture = _image;
        return true;
    }



    /** registers a comment as being made by this user
     * 
     * @param {DataComment} _comment
     * @return true, if successful
     * @return false, if unsuccessful
     */
    addComment( _comment ) {
        return this.#comments.addComment(_comment);
    }
}