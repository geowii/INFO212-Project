
class FeedAlgorithm {
    #list;
    #commentAlgoIdLimit;

    constructor() {
        this.#list = [];
        this.#commentAlgoIdLimit = -1;
    }

    /**
     * 
     * @param {DataContentMain} _content 
     */
    add( _content ) {
        this.#list.push(_content);
    }

    genForOpen() {
        return new DataContentMain();
    }
    genForUser( _abstractMysteryVerificationThing ) {
        return new DataContentMain();
    }
    /**
     * @return algo id of content
     */
    genForRandom() {
        return Math.floor(Math.random() * this.#list.length);
    }
    getContent( _algoId ) {
        if( _algoId >= this.#list.length || _algoId < 0 ) return null;
        return this.#list[_algoId];
    }
    getNextCommentId() {
        this.#commentAlgoIdLimit ++;
        return this.#commentAlgoIdLimit;
    }
}

/**
 * 
 * @param {DataCommentSet} _comments 
 * @return comment
 */
function algorithmSelectComment( _comments ) {
    if( _comments.isEmpty() ) return null;
    return _comments.getComments(0, 1)[0];
}

/**
 * 
 * @param {DataCommentSet} _comments 
 * @return list of comments
 */
function algorithmSelectComments( _comments, _entryCount ) {
    if( _comments == null ) return [];
    if( _comments.isEmpty() ) return [];
    return _comments.getComments(0, _entryCount);
}

class UserOutline {
    engagesWith;
    // etc

    constructor() {
        
    }
}