
class FeedAlgorithm {
    #list;

    constructor() {
        this.#list = [];
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
}

/**
 * 
 * @param {CommentSet} _comments 
 * @return comment
 */
function algorithmSelectComment( _comments ) {
    if( _comments.isEmpty() ) return null;
    return _comments.getComments(0, 1)[0];
}

class UserOutline {
    engagesWith;
    // etc

    constructor() {
        
    }
}
