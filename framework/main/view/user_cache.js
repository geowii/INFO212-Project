class ContentCache {
    static #VIEW_DISTANCE_UP = 1;
    static #VIEW_DISTANCE_DOWN = 1;
    #viewDistanceUp;
    #viewDistanceDown;
    #algorithm;
    #contentCached;
    #contentActive;
    #currentIdFillup;

    constructor( _algorithm ) {
        this.#viewDistanceUp = ContentCache.#VIEW_DISTANCE_UP;
        this.#viewDistanceDown = ContentCache.#VIEW_DISTANCE_DOWN;

        this.#algorithm = _algorithm;
        this.#contentCached = new DualSequence();
        this.#contentActive = new ModularSpiral(this.#viewDistanceUp + this.#viewDistanceDown + 1, this.#viewDistanceDown);
    
        this.#currentIdFillup = 0;
    }

    start() {
        for( var _i = 0; _i < this.#viewDistanceUp + this.#viewDistanceDown + 1; _i ++ )
            this.#contentCached.enqueue(this.#fetchNext());
        
        for( var _i = 0; _i < this.#viewDistanceDown; _i ++ ) {
            var _next = this.#contentCached.dequeue();
            this.#contentActive.increase(_next);
        }
    }
    #fetchNext() {
        return [this.#algorithm.genForRandom(), this.#newId()];
    }
    #newId() {
        this.#currentIdFillup ++;
        this.#currentIdFillup %= 4294967296;
        return this.#currentIdFillup;
    }

    moveDown() {
        if( this.#contentCached.emptyDown() )
            this.#contentCached.enqueue(this.#fetchNext());
        
        var _unload = this.#contentActive.unread();
        if( _unload != null )
            this.#contentCached.stack(_unload);
        var _load = this.#contentCached.dequeue();
        this.#contentActive.increase(_load);
        return [_load, _unload];
    }
    moveUp() {
        if( this.#contentCached.emptyUp() )
            return;
        
        var _unload = this.#contentActive.unread();
        if( _unload != null )
            this.#contentCached.requeue(_unload);
        var _load = this.#contentCached.unstack();
        this.#contentActive.decrease(_load);
        return [_load, _unload];
    }
    current() {
        return this.#contentActive.read();
    }
}

class ModularSpiral {
    #list;
    #current;
    #modulo;
    #horizon;

     constructor( _modulo, _horizon ) {
        this.#list = [];
        for( var _i = _modulo; _i > 0; _i -- )
            this.#list.push(null);
        this.#current = 0;
        this.#modulo = _modulo;
        this.#horizon = _horizon;
    }

    read() {
        return this.#list[this.#current];
    }
    unread() {
        return this.#list[(this.#current + this.#horizon) % this.#modulo];
    }
    increase( _entry ) {
        this.#list[(this.#current + this.#horizon) % this.#modulo] = _entry;
        this.#current ++;
        this.#current %= this.#modulo;
    }
    decrease( _entry ) {
        this.#list[(this.#current + this.#horizon) % this.#modulo] = _entry;
        this.#current += this.#modulo - 1;
        this.#current %= this.#modulo;
    }
}

class DualSequence {
    #stackUp;
    #queueDown;

    constructor() {
        this.#stackUp = [];
        this.#queueDown = [];
    }
    
    enqueue( _object ) {
        this.#queueDown.unshift(_object);
    }
    requeue( _object ) {
        this.#queueDown.push(_object);
    }
    dequeue() {
        var _object = this.#queueDown.pop();
        if( _object == undefined ) return null;
        return _object;
    }
    stack( _object ) {
        this.#stackUp.push(_object);
    }
    unstack() {
        var _object = this.#stackUp.pop();
        if( _object == undefined ) return null;
        return _object;
    }

    emptyUp() {
        return (this.#stackUp.length == 0);
    }
    emptyDown() {
        return (this.#queueDown.length == 0);
    }
}

class ContentViewer {
    static #scrollDelay = 1000;
    static #scrollThreshold = 0;
    static #scrollResetThreshold = 40;

    #htmlContext;
    #cache;
    #algorithm;
    #loaded;
    #scrollTimer;

    constructor( _htmlContext, _algorithm ) {
        this.#htmlContext = _htmlContext;
        this.#cache = new ContentCache(_algorithm);
        this.#algorithm = _algorithm;
        this.#loaded = false;
        this.#scrollTimer = 0;
    }
    start() {
        this.#cache.start();
    }
    loadInitial() {
        if( this.#loaded )
            return;
        this.moveDown();
        this.moveDown();
        this.moveDown();
        this.#loaded = true;
    }

    scroll( _event ) {
        if( this.#scrollTimer + ContentViewer.#scrollDelay > Date.now() ) {
            this.#htmlContext.style.scrollSnapType = "none";
            this.scrollReset();
            _event.preventDefault();
            _event.stopPropagation();
        }
        else {
            this.#htmlContext.style.scrollSnapType = "y mandatory";
            if( this.scrolledBottom() )
                this.moveDown();
            else if( this.scrolledTop() )
                this.moveUp();
            else if( this.scrolledMiddle() )
                this.scrollReset();
        }
    }
    scrolledBottom() {
        return this.#htmlContext.scrollTop >= this.#htmlContext.scrollHeight - this.#htmlContext.clientHeight - ContentViewer.#scrollThreshold;
    }
    scrolledTop() {
        return this.#htmlContext.scrollTop <= ContentViewer.#scrollThreshold;
    }
    scrolledMiddle() {
        return Math.abs(this.#htmlContext.scrollTop - (this.#htmlContext.scrollHeight / 3)) <=  ContentViewer.#scrollResetThreshold;
    }
    scrollReset() {
        this.#htmlContext.scrollTo(0, (this.#htmlContext.scrollHeight / 3));
    }
    #scrollTimerReset() {
        this.#scrollTimer = Date.now();
        this.#htmlContext.style.scrollSnapType = "none";
    }

    moveUp() {
        this.#scrollTimerReset();
        var _ids = this.#cache.moveUp();
        if( _ids == null )
            return console.log("reached top");
        this.#addElementUp(_ids[0][0], _ids[0][1]);
        if( _ids[1] != null )
            this.#removeElement(_ids[1][1]);
        this.scrollReset();
    }
    moveDown() {
        this.#scrollTimerReset();
        var _ids = this.#cache.moveDown();
        if( _ids == null )
            return console.log("reached bottom");
        this.#addElementDown(_ids[0][0], _ids[0][1]);
        if( _ids[1] != null )
            this.#removeElement(_ids[1][1]);
        this.scrollReset();
    }

    #addElementUp( _algoId, _instanceId ) {
        if( _algoId == null || _instanceId == null ) return;
        var _content = this.#algorithm.getContent(_algoId);
        _content.setId(_instanceId);
        var _element = document.createElement("div");
        _element.innerHTML = ContentGenerator.genMainFrom(_content);
        _element = _element.firstChild;
        this.#bindFunctions(_element);
        this.#htmlContext.insertBefore(_element, this.#htmlContext.firstChild);
    }
    #addElementDown( _algoId, _instanceId ) {
        if( _algoId == null || _instanceId == null ) return;
        var _content = this.#algorithm.getContent(_algoId);
        _content.setId(_instanceId);
        var _element = document.createElement("div");
        _element.innerHTML = ContentGenerator.genMainFrom(_content);
        _element = _element.firstChild;
        this.#bindFunctions(_element);
        this.#htmlContext.appendChild(_element);
    }
    #removeElement( _instanceId ) {
        var _element = document.getElementById(_instanceId);
        if( _element == null ) return;
        this.#htmlContext.removeChild(_element);
    }

    #bindFunctions( _element ) {
        var _wrapper = _element.querySelector(".wrapper");
        _wrapper.querySelector(".side-panel-toggle").addEventListener("click", function() {
            _wrapper.classList.toggle("side-panel-open");
        });
    }
}