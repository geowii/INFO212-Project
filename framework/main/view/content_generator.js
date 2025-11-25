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

    static #SYNTAX_CONTENT = "###CONTENT:";
    static SYNTAX_COMMENT_BOX_ID_PREFIX = "CX//";
    static SYNTAX_COMMENT_BUTTON_ID_PREFIX = "CB//";
    static SYNTAX_COMMENT_ID_PREFIX = "C//";
    static SYNTAX_CONTENT_MAIN_ID_PREFIX = "M//";

    static SYNTAX_MONTHES_SHORT = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "des"];



    static INITIAL_COMMENT_LOAD_MAX = 16;



    static #TEMPLATE_MAIN = new ContentTemplate(new TextFileYes(`
<div class="videoMain"id="
###CONTENT: ID
"><video class="videoSub" autoplay loop muted><source src="
###CONTENT: SOURCE
" type="video/mp4"></video><div class="info"><p class="viewCount">
###CONTENT: VIEWS
</p><p class="reaction">
###CONTENT: EMOJIS
</p><p class="description">
###CONTENT: DESCRIPTION_SHORT
</p></div><div class="commentSection"><div class="userComments">
###CONTENT: COMMENT_SHORT
</div></div><div class="commentPanelWrapper">
<button class="commentPanelToggle" type="button">
<span class="commentPanelIconOpen">←</span>
<span class="commentPanelIconClose">→</span></button>
<div class="commentPanel"><h3 class="commentsPanelTitle">
###CONTENT: ENTRY_COUNT
</h3><div class="commentsContainer"><div class="commentsContainerInner">
###CONTENT: COMMENT_FULL
</div></div><div class="newCommentContainer"><textarea class="newCommentTextBox" id="
###CONTENT: ID_COMMENT_BOX
" name="comment", placeholder="write your take"></textarea><input value="post" type="button" class="newCommentSubmitButton" id="
###CONTENT: ID_COMMENT_BOX_BUTTON
"></div></div></div></div>
    `));
    static #TEMPLATE_COMMENT = new ContentTemplate(new TextFileYes(`
<div class="userComment"><span class="profileName">
###CONTENT: USERNAME
</span><span class="commentText">
###CONTENT: COMMENT_CONTENT
</span></div>
    `));
    static #TEMPLATE_COMMENT_FULL = new ContentTemplate(new TextFileYes(`
<div class="userCommentFull" id="
###CONTENT: ID_COMMENT_FULL
"><div class="profileContainer"><div class="profilePicture"><img src="
###CONTENT: PROFILE_PICTURE
"></div>
<div class="profileContainerSub"><span class="profileName">
###CONTENT: USERNAME
</span><span class="commentDate">
###CONTENT: DATE
</span></div></div><span class="commentTextFull">
###CONTENT: COMMENT_CONTENT
</span></div>
    `));



    /** generate main content from content data
     * 
     * @param {DataContentMain} _dataContentMain
     * @retrun null if unsuccessful
     * @return String, html with content data
     */
    static genMainFrom( _dataContentMain ) {
        if( _dataContentMain == null ) return "";

        var _html = [];
        var _lines = ContentGenerator.#TEMPLATE_MAIN.getLines();
        for( var _i = 0; _i < _lines.length; _i ++ )
            if( _lines[_i].startsWith(ContentGenerator.#SYNTAX_CONTENT) )
                _html.push(ContentGenerator.#genContentHtml(_lines[_i].replaceAll(" ", "").slice(ContentGenerator.#SYNTAX_CONTENT.length), _dataContentMain));
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
            case "COMMENT_FULL": return this.genCommentsFrom(_dataContentMain.getComments());
            case "ID": return ContentGenerator.SYNTAX_CONTENT_MAIN_ID_PREFIX + _dataContentMain.getId();
            case "ID_COMMENT_BOX": return ContentGenerator.SYNTAX_COMMENT_BOX_ID_PREFIX + _dataContentMain.getId();
            case "ID_COMMENT_BOX_BUTTON": return ContentGenerator.SYNTAX_COMMENT_BUTTON_ID_PREFIX + _dataContentMain.getId();
            case "ENTRY_COUNT": return this.genCommentPanelTitle(_dataContentMain);
        }
        return "";
    }
    static genMainFrom( _dataContentMain ) {
        if( _dataContentMain == null ) return "";

        var _html = [];
        var _lines = ContentGenerator.#TEMPLATE_MAIN.getLines();
        for( var _i = 0; _i < _lines.length; _i ++ )
            if( _lines[_i].startsWith(ContentGenerator.#SYNTAX_CONTENT) )
                _html.push(ContentGenerator.#genContentHtml(_lines[_i].replaceAll(" ", "").slice(ContentGenerator.#SYNTAX_CONTENT.length), _dataContentMain));
            else _html.push(_lines[_i]);
        return _html.join("");
    }
    /** generate comments from comment set
     * 
     * @param {DataCommentSet} _dataCommentSet
     * @retrun null if unsuccessful
     * @return String, html with content data
     */
    static genCommentsFrom( _dataCommentSet ) {
        if( _dataCommentSet == null ) return "";
        
        var _comments = algorithmSelectComments(_dataCommentSet, ContentGenerator.INITIAL_COMMENT_LOAD_MAX);
        var _html = [];
        for( var _i = 0; _i < _comments.length; _i ++ )
            _html.push(ContentGenerator.genCommentFrom(_comments[_i]));
        return _html.join("");
    }
    /** generate comment from comment data
     * 
     * @param {DataComment} _dataComment
     * @retrun null if unsuccessful
     * @return String, html with content data
     */
    static genCommentFrom( _dataCommentMain ) {
        if( _dataCommentMain == null ) return "";

        var _html = [];
        var _lines = ContentGenerator.#TEMPLATE_COMMENT_FULL.getLines();
        for( var _i = 0; _i < _lines.length; _i ++ )
            if( _lines[_i].startsWith(ContentGenerator.#SYNTAX_CONTENT) )
                _html.push(ContentGenerator.#genCommentHtml(_lines[_i].replaceAll(" ", "").slice(ContentGenerator.#SYNTAX_CONTENT.length), _dataCommentMain));
            else _html.push(_lines[_i]);
        return _html.join("");
    }
    static #genCommentHtml( _type, _dataCommentMain ) {
        switch( _type ) {
            case "USERNAME": return _dataCommentMain.getAccount().getProfile().getName();
            case "COMMENT_CONTENT": return _dataCommentMain.getText();
            case "PROFILE_PICTURE": return _dataCommentMain.getAccount().getProfile().getPicture();
            case "DATE": return ContentGenerator.genDate(_dataCommentMain.getDate());
            case "ID_COMMENT_FULL": return ContentGenerator.SYNTAX_COMMENT_ID_PREFIX + _dataCommentMain.getId();
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
        var _lines = ContentGenerator.#TEMPLATE_COMMENT.getLines();
        for( var _i = 0; _i < _lines.length; _i ++ )
            if( _lines[_i].startsWith(ContentGenerator.#SYNTAX_CONTENT) )
                _html.push(ContentGenerator.#genCommentReducedHtml(_lines[_i].replaceAll(" ", "").slice(ContentGenerator.#SYNTAX_CONTENT.length), _dataCommentMain));
            else _html.push(_lines[_i]);
        return _html.join("");
    }
    static #genCommentReducedHtml( _type, _dataCommentMain ) {
        switch( _type ) {
            case "USERNAME": return _dataCommentMain.getAccount().getProfile().getName() + ": ";
            case "COMMENT_CONTENT": return _dataCommentMain.getText();
        }
        return "";
    }

    /** generate date text from date array
     * 
     * @param {[DAY, MONTH, YEAR]} _date
     */
    static genDate( _date ) {
        return ContentGenerator.SYNTAX_MONTHES_SHORT[_date[1] - 1] + " " + _date[0] + ", " + _date[2];
    }
    static genCommentPanelTitle( _dataContentMain ) {
        return "Comments (" + _dataContentMain.getCommentCount() + ")";
    }
}
