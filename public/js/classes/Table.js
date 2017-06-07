var Table = function(game, edges){
  this.game = game;
  this.edges = edges;
  this.group = null;
}

Table.prototype = {
  create : function(){
    this.group = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'table');
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
