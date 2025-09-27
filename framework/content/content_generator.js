class ContentTemplate {
    #lines;

    /**
     * 
     * @param {TextFileYes} _source the string to make template from
     */
    constructor( _source ) {
        var _text = _source.getString();
        this.#lines = _text.split("\n");
    }
    getLines() {
        return this.#lines;
    }
}

class ContentGenerator {
    static #syntaxContent = "###CONTENT:"
    static #mainTemplate = new ContentTemplate(new TextFileYes("<div class=\"mainVideo\"> <div class=video> <img src=\"\n###CONTENT: SOURCE\n\" alt=\"\n###CONTENT: TITLE\n\"> </div> <div id=\"info\"> <p id=\"views\"></p>👁 \n###CONTENT: VIEWS\n</p> <p id=\"emoji\">\n###CONTENT: EMOJI\n</p> </div> <div class=\"descriptionDiv\"> <p id=\"description\"></p>\n###CONTENT: DESCRIPTION_SHORT\n</p> </p><div class=\"comment section\"><h2 id=\"comments\">Comments:</h2> <div class=\"comment_space\"> \n###CONTENT: COMMENT_SHORT\n</div> </div>"));
    static #commentTemplate = new ContentTemplate(new TextFileYes("<div class=\"comment\"> <span class=\"comment_username\">\n###CONTENT: USERNAME\n</span> <p class=\"comment_content\" id=\"comments\">\n###CONTENT: COMMENT_CONTENT\n</p></div>"));

    /** generate main content from content data
     * 
     * @param {DataContentMain} _dataContentMain
     * @retrun null if unsuccessful
     * @return String, html with content data
     */
    static genMainFrom( _dataContentMain ) {
        var _html = [];
        var _lines = ContentGenerator.#mainTemplate.getLines();
        for( var _i = 0; _i < _lines.length; _i ++ )
            if( _lines[_i].startsWith(ContentGenerator.#syntaxContent) )
                _html.push(ContentGenerator.#genContentHtml(_lines[_i].replaceAll(" ", "").slice(ContentGenerator.#syntaxContent.length), _dataContentMain));
            else _html.push(_lines[_i]);
        return _html.join("");
    }
    static #genContentHtml( _type, _dataContentMain ) {
        switch( _type ) {
            case "DESCRIPTION": return _dataContentMain.getDescription();
            case "DESCRIPTION_SHORT": return _dataContentMain.getDescription();
            case "ALT_TEXT": return _dataContentMain.getTitle();
            case "VIEWS": return _dataContentMain.getViews();
            case "EMOJIS": return _dataContentMain.getEmojis();
            case "SOURCE": return _dataContentMain.getSource();
            case "COMMENT_SHORT": return this.genCommentReducedFrom(algorithmSelectComment(_dataContentMain.getComments()));
        }
        return "";
    }
    /** generate comment from comment data
     * 
     * @param {DataCommentMain} _dataCommentMain
     * @retrun null if unsuccessful
     * @return String, html with content data
     */
    static genCommentFrom( _dataCommentMain ) {
        var _html = [];
        var _lines = ContentGenerator.#commentTemplate.getLines();
        for( var _i = 0; _i < _lines.length; _i ++ )
            if( _lines[_i].startsWith(ContentGenerator.#syntaxContent) )
                _html.push(ContentGenerator.#genCommentHtml(_lines[_i].replaceAll(" ", "").slice(ContentGenerator.#syntaxContent.length), _dataCommentMain));
            else _html.push(_lines[_i]);
        return _html.join("");
    }
    static #genCommentHtml( _type, _dataCommentMain ) {
        switch( _type ) {
            case "USERNAME": return _dataCommentMain.getAccount().getProfile().getName();
            case "COMMENT_CONTENT": return _dataCommentMain.getText();
        }
        return "";
    }
    /** generate reduced comment from comment data
     * 
     * @param {DataCommentMain} _dataCommentMain
     * @retrun null if unsuccessful
     * @return String, html with content data
     */
    static genCommentReducedFrom( _dataCommentMain ) {
        var _html = [];
        var _lines = ContentGenerator.#commentTemplate.getLines();
        for( var _i = 0; _i < _lines.length; _i ++ )
            if( _lines[_i].startsWith(ContentGenerator.#syntaxContent) )
                _html.push(ContentGenerator.#genCommentReducedHtml(_lines[_i].replaceAll(" ", "").slice(ContentGenerator.#syntaxContent.length), _dataCommentMain));
            else _html.push(_lines[_i]);
        return _html.join("");
    }
    static #genCommentReducedHtml( _type, _dataCommentMain ) {
        switch( _type ) {
            case "USERNAME": return _dataCommentMain.getAccount().getProfile().getName();
            case "COMMENT_CONTENT": return _dataCommentMain.getText();
        }
        return "";
    }
}