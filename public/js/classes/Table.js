var Table = function(edges){
  this.edges = edges;
  this.group = null;
  this.turns = [];
}

Table.prototype = {
  create : function(){
    this.group = Game.add.sprite(Game.world.centerX,Game.world.centerY,'table');
    var up = Game.add.sprite(Game.world.centerX,0,'turn');//<<<<<<<<<<<<<<<<<<<<<posição
    var down = Game.add.sprite(Game.world.centerX,Game.world.height,'turn');//<<<<<<<<<<<<<<<<<<<<<posição
    var left = Game.add.sprite(0,Game.world.centerY,'turn');//<<<<<<<<<<<<<<<<<<<<<posição
    var right = Game.add.sprite(Game.world.width,Game.world.centerY,'turn');//<<<<<<<<<<<<<<<<<<<<<posição

    this.turns[0] = left;
    this.turns[1] = up;
    this.turns[2] = right;
    this.turns[3] = down;

    up.tint = 0x0000FF;
    up.visible = false;
    up.angle = 180;
    up.anchor.set(0.5,1);

    down.tint = 0x0000FF;
    down.visible = false;
    down.anchor.set(0.5,1);

    left.tint = 0xFF0000;
    left.visible = false;
    left.angle = 90;
    left.anchor.set(0.5,1);

    right.tint = 0xFF0000;
    right.visible = false;
    right.angle = 270;
    right.anchor.set(0.5,1);

    this.group.anchor.set(0.5);
    this.group.scale.set(1);
    var edges = this.edges;

    s = Game.add.sprite(0,0,'blank');
    s.anchor.set(0.5);
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.finishSelect("center");
    });
    this.group.addChild(s);
    edges.edges.center.blank.normal = s;
    edges.edges.center.blank.side = s;

    s = Game.add.sprite(0,-STATIC.HEIGHT_PIECE,'blank');
    s.anchor.set(0.5);
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.finishSelect("up");
    });
    this.group.addChild(s);
    edges.edges.up.blank.normal = s;

    s = Game.add.sprite(0,- (STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,'blank');
    s.anchor.set(0.5);
    s.angle = 90;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.finishSelect("up");
    });
    this.group.addChild(s);
    edges.edges.up.blank.side = s;

    s = Game.add.sprite(0,STATIC.HEIGHT_PIECE,'blank');
    s.anchor.set(0.5);
    s.angle = 180;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.finishSelect("down");
    });
    this.group.addChild(s);
    edges.edges.down.blank.normal = s;

    s = Game.add.sprite(0,(STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,'blank');
    s.anchor.set(0.5);
    s.angle = 270;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.finishSelect("down");
    });
    this.group.addChild(s);
    edges.edges.down.blank.side = s;


    s = Game.add.sprite((STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,0,'blank');
    s.anchor.set(0.5);
    s.angle = 90;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.finishSelect("right");
    });
    this.group.addChild(s);
    edges.edges.right.blank.normal = s;

    s = Game.add.sprite(STATIC.WIDTH_PIECE,0,'blank');
    s.anchor.set(0.5);
    s.angle = 180;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.finishSelect("right");
    });
    this.group.addChild(s);
    edges.edges.right.blank.side = s;

    s = Game.add.sprite(-(STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,0,'blank');
    s.anchor.set(0.5);
    s.angle = 270;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.finishSelect("left");
    });
    this.group.addChild(s);
    edges.edges.left.blank.normal = s;

    s = Game.add.sprite(-STATIC.WIDTH_PIECE,0,'blank');
    s.anchor.set(0.5);
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        edges.finishSelect("left");
    });
    this.group.addChild(s);
    edges.edges.left.blank.side = s;
  }
}
