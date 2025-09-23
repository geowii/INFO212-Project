contentSpace = document.getElementById("content");
generateButton = document.getElementById("generate");



BaseContentStructure = {
    HTML_START          : "<div> <div>",
    HTML_PFP            : "<image src =\"",
    HTML_NAME           : "\" style=\"width: 40px; height: 40px;\"> <span>",
    HTML_MEDIA          : "</span> </div> <div>",
    HTML_DESCRIPTION    : "<br> <p>",
    HTML_CLOSE          : "</p> </div> </div>",
};


class Content {
    data;

    constructor( _contentData ) {
        this.data = _contentData;
    }

    generate() {
        var _html = [];
        _html.push(BaseContentStructure.HTML_START);
        _html.push(BaseContentStructure.HTML_PFP);
        _html.push(this.data.getAccountPicture());
        _html.push(BaseContentStructure.HTML_NAME);
        _html.push(this.data.getAccountName());
        _html.push(BaseContentStructure.HTML_MEDIA);
        _html.push(this.data.getContentMedia());
        _html.push(BaseContentStructure.HTML_DESCRIPTION);
        _html.push(this.data.getContentDescription());
        _html.push(BaseContentStructure.HTML_CLOSE);
        return _html.join("");
    }
}


class ContentMain {

}
class ContentComment {
    
}



post0 = new Content(new BaseContentData("your mother", "test/pfp.jpeg", "<image src=\"test/media.jpeg\" style=\"width: 256px; height: 320px;\">", "my hot bod. dm for OF."));



function generate() {
    contentSpace.innerHTML += post0.generate();
}

generateButton.addEventListener("click", generate);