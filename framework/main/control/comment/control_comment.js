class CommentController {
    static submitComment(_account, _algo, _superAlgoId, _superInstanceId ) {
        var _commentBox = document.getElementById(ContentGenerator.SYNTAX_COMMENT_BOX_ID_PREFIX + _superInstanceId);
        CommentController.#addComment(_account, "", _algo, _commentBox.value, _superAlgoId);
        _commentBox.value = "";
    }
    static #addComment( _account, _verificationKey, _algo, _text, _superAlgoId ) {
        if( _text == "" || _text == null || _text == undefined ) return; 
        _algo.getContent(_superAlgoId).addComment(_account, _verificationKey, new DataComment(_account, _text, _algo.getNextCommentId()));
    }
}