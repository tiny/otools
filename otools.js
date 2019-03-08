
  var ticker = 10 ;

  function rbetween(a,b) {
    return Math.floor(Math.random() * (b-a)) + a ;
  }

  class oArray extends Array {
    constructor() {
      super() ;
    }
    push( o ) {
      o.create() ;
      super.push( o ) ;
    }
  }

  class Panel {
    constructor( parent_ = null, classname = null ) {
      ticker   = ticker + 1 ;
      this.name = classname ;
      this.parent = parent_ ;
      this.id = "ot_" + ticker ;
      this.cx = 5 ;
      this.cy = 5 ;
      this.x  = 5 ;
      this.y  = 5 ; 
      this.elem = null ;
    }

    create() {
      console.log( this.constructor.name + " created.  id: " + this.id ) ;
      this.elem = document.createElement("DIV") ;
      if (this.name == null) {
        this.name = "ot-" + this.constructor.name ;
      }
      this.elem.classList.add( this.name ) ;
      this.elem.setAttribute( 'id', this.id);

      if (this.parent == null) {
        document.body.appendChild( this.elem );
      } else {
        this.parent.elem.appendChild( this.elem );
      }
      this.on_create() ;
    }

    on_create() {
      this.render() ;
    }

    render() {
      this.elem.setAttribute( 'style', 
                              'top: '    + this.y + 'px; ' +
                              'left: '   + this.x + 'px; ' +
                              'width: '  + this.cx + 'px; ' +
                              'height: ' + this.cy + 'px; ' 
                            ) ;
    }
  }

  const Draggable = (Draggable) => class extends Draggable {
    constructor( parent_, classname ) {
      super( parent_, classname ) ;
      this._down = false ;
    }
    on_create() {
      super.on_create() ;

      // hook up for events
      document.getElementById(this.id).addEventListener("mousedown", this.onMouseDown.bind(this)) ;
      document.getElementById(this.id).addEventListener("mouseup"  , this.onMouseUp  .bind(this)) ;
      document.getElementById(this.id).addEventListener("mousemove", this.onMouseMove.bind(this)) ;
    }
    
    onMouseDown(e) {
      this._down = true ;
      this._offx = e.pageX - this.x ;
      this._offy = e.pageY - this.y ;
      e.target.setCapture() ;
    }
    onMouseUp(e) {
      this._down = false ;
    }
    onMouseMove(e) {
      if (this._down == false) return ;

      this.x = e.pageX - this._offx ;
      this.y = e.pageY - this._offy ;
      this.render() ;
    }
  }

