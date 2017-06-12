var Table = function(game, edges){
  this.game = game;
  this.edges = edges;
  this.group = null;
  this.turns = [];
}

Table.prototype = {
  create : function(){
    this.group = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'table');
    up = this.game.add.sprite(0,0,'turn');
    down = this.game.add.sprite(0,0,'turn');
    left = this.game.add.sprite(0,0,'turn');
    right = this.game.add.sprite(0,0,'turn');

    this.turns[0] = down;
    this.turns[1] = left;
    this.turns[2] = up;
    this.turns[3] = right;

    up.tint = 0x0000FF;
    up.visible = false;
    up.angle = 180;
    up.anchor.set(0.5,0);
    up.y = -400;//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<ver isso
    this.group.addChild(up);

    down.tint = 0x0000FF;
    down.visible = false;
    down.anchor.set(0.5,0);
    down.y = 400;//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<ver isso
    this.group.addChild(down);

    left.tint = 0xFF0000;
    left.visible = false;
    left.angle = 90;
    left.anchor.set(0.5,0);
    left.x = -400;//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<ver isso
    this.group.addChild(left);

    right.tint = 0xFF0000;
    right.visible = false;
    right.angle = 270;
    right.anchor.set(0.5,0);
    right.x = 400;//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<ver isso
    this.group.addChild(right);

    this.group.anchor.set(0.5);
    this.group.scale.set(1);
    var edges = this.edges;

    s = this.game.add.sprite(0,0,'blank');
    s.anchor.set(0.5);
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.selectedPiece.visible = false;
        edges.finishSelect(edges.selectedPiece.piece, "center");
    });
    this.group.addChild(s);
    edges.edges.center.blank.normal = s;
    edges.edges.center.blank.side = s;

    s = this.game.add.sprite(0,-STATIC.HEIGHT_PIECE,'blank');
    s.anchor.set(0.5);
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.selectedPiece.visible = false;
        edges.finishSelect(edges.selectedPiece.piece, "up");
    });
    this.group.addChild(s);
    edges.edges.up.blank.normal = s;

    s = this.game.add.sprite(0,- (STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,'blank');
    s.anchor.set(0.5);
    s.angle = 90;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.selectedPiece.visible = false;
        edges.finishSelect(edges.selectedPiece.piece, "up");
    });
    this.group.addChild(s);
    edges.edges.up.blank.side = s;

    s = this.game.add.sprite(0,STATIC.HEIGHT_PIECE,'blank');
    s.anchor.set(0.5);
    s.angle = 180;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.selectedPiece.visible = false;
        edges.finishSelect(edges.selectedPiece.piece, "down");
    });
    this.group.addChild(s);
    edges.edges.down.blank.normal = s;

    s = this.game.add.sprite(0,(STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,'blank');
    s.anchor.set(0.5);
    s.angle = 270;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.selectedPiece.visible = false;
        edges.finishSelect(edges.selectedPiece.piece, "down");
    });
    this.group.addChild(s);
    edges.edges.down.blank.side = s;


    s = this.game.add.sprite((STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,0,'blank');
    s.anchor.set(0.5);
    s.angle = 90;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.selectedPiece.visible = false;
        edges.finishSelect(edges.selectedPiece.piece, "right");
    });
    this.group.addChild(s);
    edges.edges.right.blank.normal = s;

    s = this.game.add.sprite(STATIC.WIDTH_PIECE,0,'blank');
    s.anchor.set(0.5);
    s.angle = 180;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.selectedPiece.visible = false;
        edges.finishSelect(edges.selectedPiece.piece, "right");
    });
    this.group.addChild(s);
    edges.edges.right.blank.side = s;

    s = this.game.add.sprite(-(STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,0,'blank');
    s.anchor.set(0.5);
    s.angle = 270;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.selectedPiece.visible = false;
        edges.finishSelect(edges.selectedPiece.piece, "left");
    });
    this.group.addChild(s);
    edges.edges.left.blank.normal = s;

    s = this.game.add.sprite(-STATIC.WIDTH_PIECE,0,'blank');
    s.anchor.set(0.5);
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.selectedPiece.visible = false;
        edges.finishSelect(edges.selectedPiece.piece, "left");
    });
    this.group.addChild(s);
    edges.edges.left.blank.side = s;
  }
}
