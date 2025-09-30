
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
    genForRandom() {
        return this.#list[Math.floor(Math.random() * this.#list.length)];
    }
    genForSequence( _id ) {
        if( _id >= this.#list.length ) return null;
        return this.#list[_id];
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
