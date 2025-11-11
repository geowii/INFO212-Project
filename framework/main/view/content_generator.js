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
    static #mainTemplate = new ContentTemplate(new TextFileYes("<div class=\"video\"id=\"\n###CONTENT: ID\n\"><video autoplay loop muted><source src=\"\n###CONTENT: SOURCE\n\" type=\"video/mp4\"></video><div id=\"info\"><p class=\"viewCount\">\n###CONTENT: VIEWS\n</p><p class=\"reaction\">\n###CONTENT: EMOJIS\n</p><p class=\"description\">\n###CONTENT: DESCRIPTION_SHORT\n</p></div><div id=\"commentSection\"><div class=\"userComments\">\n###CONTENT: COMMENT_SHORT\n</div></div><!-- Comment Side Panel --><div class=\"wrapper\"><button class=\"side-panel-toggle\" type=\"button\"><span class=\"sp-icon-open\">←</span><span class=\"sp-icon-close\">→</span></button> <div class=\"side-panel\"><h3>Comments</h3><div>\n###CONTENT: COMMENT_SHORT\n</div></div></div></div>"));
    //static #mainTemplate = new ContentTemplate(new TextFileYes("<div id=\"\n###CONTENT: ID\n\"class=\"video\"><video autoplay><source src=\"\n###CONTENT: SOURCE\n\" type=\"video/mp4\"></video><div id=\"info\"><p class=\"viewCount\">\n###CONTENT: VIEWS\n</p><p class=\"reaction\">\n###CONTENT: EMOJIS\n</p><p class=\"description\">\n###CONTENT: DESCRIPTION\n</p></div><div id=\"commentSection\">\n###CONTENT: COMMENT_SHORT\n</div></div>"));
    static #commentTemplate = new ContentTemplate(new TextFileYes("<div class=\"userComments\"><span class=\"user\">\n###CONTENT: USERNAME\n</span><span class=\"comment\">\n###CONTENT: COMMENT_CONTENT\n</span></div>"));

    /** generate main content from content data
     * 
     * @param {DataContentMain} _dataContentMain
     * @retrun null if unsuccessful
     * @return String, html with content data
     */
    static genMainFrom( _dataContentMain ) {
        if( _dataContentMain == null ) return "";

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
            case "ID": return _dataContentMain.getId();
        }
        return "";
    }
    static genMainFrom( _dataContentMain ) {
        if( _dataContentMain == null ) return "";

        var _html = [];
        var _lines = ContentGenerator.#mainTemplate.getLines();
        for( var _i = 0; _i < _lines.length; _i ++ )
            if( _lines[_i].startsWith(ContentGenerator.#syntaxContent) )
                _html.push(ContentGenerator.#genContentHtml(_lines[_i].replaceAll(" ", "").slice(ContentGenerator.#syntaxContent.length), _dataContentMain));
            else _html.push(_lines[_i]);
        return _html.join("");
    }
    /** generate comment from comment data
     * 
     * @param {DataCommentMain} _dataCommentMain
     * @retrun null if unsuccessful
     * @return String, html with content data
     */
    static genCommentFrom( _dataCommentMain ) {
        if( _dataCommentMain == null ) return "";

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
        if( _dataCommentMain == null ) return "";
        
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
