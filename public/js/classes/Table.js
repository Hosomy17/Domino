var Table = function(edges,hand){//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<melhorar
  this.edges = edges;
  this.hand = hand;
  this.group = null;
  this.turns = [];
}

Table.prototype = {
  create : function(){
    this.group = Game.add.sprite(Game.world.centerX,Game.world.centerY,'table');
    //this.group.scale.set(20,20);
    var up = Game.add.sprite(Game.world.centerX,0,'turn');//<<<<<<<<<<<<<<<<<<<<<posição
    var down = Game.add.sprite(Game.world.centerX,Game.world.height,'turn');//<<<<<<<<<<<<<<<<<<<<<posição
    var left = Game.add.sprite(0,Game.world.centerY,'turn');//<<<<<<<<<<<<<<<<<<<<<posição
    var right = Game.add.sprite(Game.world.width,Game.world.centerY,'turn');//<<<<<<<<<<<<<<<<<<<<<posição

    this.turns[0] = left;
    this.turns[1] = up;
    this.turns[2] = right;
    this.turns[3] = down;

    up.tint = 0x0095E9;
    up.visible = false;
    up.angle = 180;
    up.anchor.set(0.5,1);

    down.tint = 0x0095E9;
    down.visible = false;
    down.anchor.set(0.5,1);

    left.tint = 0xFF0044;
    left.visible = false;
    left.angle = 90;
    left.anchor.set(0.5,1);

    right.tint = 0xFF0044;
    right.visible = false;
    right.angle = 270;
    right.anchor.set(0.5,1);

    this.group.anchor.set(0.5);
    this.group.scale.set(1);
    var edges = this.edges;
    var hand  = this.hand;//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<????????????????????????????pq
    var s = Game.add.sprite(0,0,'blank');
    s.anchor.set(0.5);
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        hand.finishSelect("center");
    });
    this.group.addChild(s);
    edges.center.blank.normal = s;
    edges.center.blank.side = s;

    s = Game.add.sprite(0,-STATIC.HEIGHT_PIECE,'blank');
    s.anchor.set(0.5);
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        hand.finishSelect("up");
    });
    this.group.addChild(s);
    edges.up.blank.normal = s;

    s = Game.add.sprite(0,- (STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,'blank');
    s.anchor.set(0.5);
    s.angle = 90;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        hand.finishSelect("up");
    });
    this.group.addChild(s);
    edges.up.blank.side = s;

    s = Game.add.sprite(0,STATIC.HEIGHT_PIECE,'blank');
    s.anchor.set(0.5);
    s.angle = 180;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        hand.finishSelect("down");
    });
    this.group.addChild(s);
    edges.down.blank.normal = s;

    s = Game.add.sprite(0,(STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,'blank');
    s.anchor.set(0.5);
    s.angle = 270;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        hand.finishSelect("down");
    });
    this.group.addChild(s);
    edges.down.blank.side = s;


    s = Game.add.sprite((STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,0,'blank');
    s.anchor.set(0.5);
    s.angle = 90;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        hand.finishSelect("right");
    });
    this.group.addChild(s);
    edges.right.blank.normal = s;

    s = Game.add.sprite(STATIC.WIDTH_PIECE,0,'blank');
    s.anchor.set(0.5);
    s.angle = 180;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        hand.finishSelect("right");
    });
    this.group.addChild(s);
    edges.right.blank.side = s;

    s = Game.add.sprite(-(STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,0,'blank');
    s.anchor.set(0.5);
    s.angle = 270;
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        hand.finishSelect("left");
    });
    this.group.addChild(s);
    edges.left.blank.normal = s;

    s = Game.add.sprite(-STATIC.WIDTH_PIECE,0,'blank');
    s.anchor.set(0.5);
    s.visible = false;
    s.inputEnabled = true;
    s.events.onInputDown.add(function(obj){
        hand.finishSelect("left");
    });
    this.group.addChild(s);
    edges.left.blank.side = s;
  }
}
