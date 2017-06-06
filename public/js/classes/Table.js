var Table = function(game){
  this.game = game;
  this.group = null;
}

Table.prototype = {
  create : function(){
    this.group = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'table');
    this.group.anchor.set(0.5);
    this.group.scale.set(1);

    s = this.game.add.sprite(0,0,'blank');
    s.anchor.set(0.5);
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        //_selectedPiece.visible = false;
        //finishSelect(_selectedPiece.piece, "center");
    });
    this.group.addChild(s);
    //_edges.center.blank.normal = sprite;
    //_edges.center.blank.side = sprite;

    s = this.game.add.sprite(0,-STATIC.HEIGHT_PIECE,'blank');
    s.anchor.set(0.5);
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        //_selectedPiece.visible = false;
        //finishSelect(_selectedPiece.piece, "up");
    });
    this.group.addChild(s);
    //_edges.up.blank.normal = sprite;

    s = this.game.add.sprite(0,- (STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,'blank');
    s.anchor.set(0.5);
    s.angle = 90;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        //_selectedPiece.visible = false;
        //finishSelect(_selectedPiece.piece, "up");
    });
    this.group.addChild(s);
    //_edges.up.blank.side = sprite;

    s = this.game.add.sprite(0,STATIC.HEIGHT_PIECE,'blank');
    s.anchor.set(0.5);
    s.angle = 180;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        //_selectedPiece.visible = false;
        //finishSelect(_selectedPiece.piece, "down");
    });
    this.group.addChild(s);
    //_edges.down.blank.normal = sprite;

    s = this.game.add.sprite(0,(STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,'blank');
    s.anchor.set(0.5);
    s.angle = 270;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        //_selectedPiece.visible = false;
        //finishSelect(_selectedPiece.piece, "down");
    });
    this.group.addChild(s);
    //_edges.down.blank.side = sprite;


    s = this.game.add.sprite((STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,0,'blank');
    s.anchor.set(0.5);
    s.angle = 90;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        //_selectedPiece.visible = false;
        //finishSelect(_selectedPiece.piece, "right");
    });
    this.group.addChild(s);
    //_edges.right.blank.normal = sprite;

    s = this.game.add.sprite(STATIC.WIDTH_PIECE,0,'blank');
    s.anchor.set(0.5);
    s.angle = 180;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        //_selectedPiece.visible = false;
        //finishSelect(_selectedPiece.piece, "right");
    });
    this.group.addChild(s);
    //_edges.right.blank.side = sprite;

    s = this.game.add.sprite(-(STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,0,'blank');
    s.anchor.set(0.5);
    s.angle = 270;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        //_selectedPiece.visible = false;
        //finishSelect(_selectedPiece.piece, "left");
    });
    this.group.addChild(s);
    //_edges.left.blank.normal = sprite;

    s = this.game.add.sprite(-STATIC.WIDTH_PIECE,0,'blank');
    s.anchor.set(0.5);
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        //_selectedPiece.visible = false;
        //finishSelect(_selectedPiece.piece, "left");
    });
    this.group.addChild(s);
    //_edges.left.blank.side = sprite;
  }
}
