var Core = function(hand, hud, edges, table){
  this.hand        = hand;
  this.hud         = hud;
  this.cntSkip     = 0;
  this.maxPieceRow = 1;
  this.scaleTable  = 100;
  this.players     = hud.players;
  this.edges       = edges;
  this.score       = hud.score;
  this.table       = table.group;
  this.timer       = null;
}

Core.prototype = {

  create:function(){
    var key = Game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        key.onDown.add(function(){
          Link.leaveMacth();
          Game.state.start("MenuState");
        }, this);
  },
  update: function(){
    if(Game.time.events.events.length){
      this.hud.timer.text = Math.floor(this.timer.timer.duration);
    }
    else{
      this.hud.timer.text = 0;
    }

    this.table.sort('y', Phaser.Group.SORT_ASCENDING);
  },

  skipMove: function(){
    var skip=true;
    if(this.hand.turn != Link.player.turn)
      skip = false;
    else
      this.timer = Game.time.events.add(Phaser.Timer.SECOND * 0.1, this.autoPlay, this);
    var pcs = this.hand.pieces;
    var eds = [];
    eds[0] = {n:this.edges.up.open   ,d:"up"};
    eds[1] = {n:this.edges.down.open ,d:"down"};
    eds[2] = {n:this.edges.right.open,d:"right"};
    eds[3] = {n:this.edges.left.open ,d:"left"};
    for (var i=0;i < pcs.length;i++) {
      var piece = pcs[i].piece;
      for (var j=0;j < eds.length;j++) {
        //If there is piece to place
        if((piece[0] == eds[j].n || piece[1] == eds[j].n)){
          this.hand.autoPiece = {p:pcs[i],d:eds[j].d};
          skip=false;
        }
      }
      //If there is carroça to place in center
      if(this.edges.noPiece){
        //If have to be a sena
        if(Link.match.sena){
          if(piece[2] == 27){
            this.hand.autoPiece = {p:pcs[i],d:"center"};
            skip=false;
          }
        }
        else if(piece[0] == piece[1]){
          this.hand.autoPiece = {p:pcs[i],d:"center"};
          skip=false;
        }
      }
    }

    if(skip){
      Game.time.events.removeAll();
      this.hand.selected = null;
      this.finishSelect(null);
    }
    return skip;
  },

  doMove: function(d){
    if(d.move.piece == null){
      if(this.cntSkip == 0){
        this.gainPoints(STATIC.POINT_SKIP, (d.player.team == 0) ? 1 : 0);
      }
      this.cntSkip++;
      if(this.cntSkip == 4){
        if(d.sum[0] < d.sum[1])
          this.gainPoints(Math.floor(d.sum[1]/5) * 5,0);
        else if(d.sum[1] < d.sum[0])
          this.gainPoints(Math.floor(d.sum[0]/5) * 5,1);

        Link.match.score = [this.score[0].total, this.score[1].total];
        Link.match.turn = d.player.turn;
        Link.match.sena = true;
        this.endRound();
      }
      else{
        this.nextTurn();
        this.skipMove();
      }
      return 0;
    }
    else{
      if(this.cntSkip == 3)
        this.gainPoints(STATIC.POINT_GALO,d.player.team);
      this.cntSkip = 0;
    }

    this.drawMove(d);
    this.players[d.player.turn].ctn--;
    var points = this.calculatePoints();
    if(points % 5 == 0)
      this.gainPoints(points,d.player.team);

    if(Link.player.turn != d.player.turn)
      this.players[d.player.turn].totalPieces.text = this.players[d.player.turn].ctn;

    if(this.edges.noPiece){
      this.edges.noPiece = false;
      this.edges.up.open     = d.move.piece[0];
      this.edges.down.open   = d.move.piece[0];
      this.edges.left.open   = d.move.piece[0];
      this.edges.right.open  = d.move.piece[0];
      this.edges.center.open = d.move.piece[0];
    }

    var edge = this.edges[d.move.direction];
    //Zoom out
    this.zoomOut(edge.total);

    if(this.players[d.player.turn].ctn == 0){

      if(d.move.piece[0] == d.move.piece[1])
        this.gainPoints(STATIC.POINT_CARROCA,d.player.team);

      this.gainPoints(Math.floor(d.sum[d.player.team]/5) * 5,d.player.team);
      var score = [this.score[0].total, this.score[1].total];

      Link.match.score = score;
      Link.match.turn = d.player.turn;
      Link.match.sena = false;
      this.endRound();
    }
    else{
      this.nextTurn();
      this.skipMove();
    }
  },

  zoomOut: function(total){
    if(this.maxPieceRow < total){
      this.maxPieceRow = total;
      var tableScale = this.scaleTable;
      console.log(this.scaleTable);
      if(this.scaleTable > 45)
        this.scaleTable -= 55;
      Game.add.tween(this.table.scale).to( { x: this.scaleTable/100, y: this.scaleTable/100,}, Phaser.Timer.SECOND * 2, Phaser.Easing.Linear.None, true);
    }
  },

  nextTurn: function(){
    if(++this.hand.turn >= STATIC.TOTAL_PLAYERS)
      this.hand.turn = 0;

    for (var i = 0; i < this.players.length; i++) {
      this.players[i].turn.visible = false;
    }
    this.players[this.hand.turn].turn.visible = true;
  },

  drawMove: function(d){
    var ori = (d.move.piece[0] == d.move.piece[1] ) ? 'side' : 'normal';
    var edge = this.edges[d.move.direction];

    sprite = Game.add.sprite(edge.blank[ori].x,edge.blank[ori].y,'domino',d.move.piece[2]);
    sprite.angle = edge.blank[ori].angle;
    sprite.anchor.set(0.5);
    this.table.addChild(sprite);

    edge.total ++;
    if(edge.open == d.move.piece[0]){
      sprite.angle += 180;
      edge.open = d.move.piece[1];
      edge.points = d.move.piece[1];
    }
    else{
      edge.open = d.move.piece[0];
      edge.points = d.move.piece[0];
    }

    var shadow = (sprite.angle % 180 == 0) ? 'shadow' : 'shadow-s' ;
    sprite = Game.add.sprite(edge.blank[ori].x,edge.blank[ori].y,shadow,d.move.piece[2]);
    sprite.anchor.set(0.5);
    this.table.addChild(sprite);

    edge.points *= (d.move.piece[0]==d.move.piece[1]) ? 2 : 1;

    //Calc positions of edge
    this.calcPositionsEdges(edge,d.move.direction);
    // if(edge.total == 7 && (d.move.direction == 'right' || d.move.direction == 'left')){
    //   edge.blank.normal.angle += 90;
    //   edge.blank.side.angle += 90;
    //   switch (d.move.direction) {
    //     case 'right':
    //       edge.nextPos    = this.edges.newPosForm.down;
    //       edge.blank.normal.x += STATIC.WIDTH_PIECE/2;
    //       edge.blank.normal.y -= STATIC.WIDTH_PIECE/2;
    //       edge.blank.side.x   += STATIC.WIDTH_PIECE;
    //       edge.blank.side.y   -= STATIC.WIDTH_PIECE/2;
    //     break;
    //     case 'left':
    //       edge.nextPos    = this.edges.newPosForm.up;
    //       edge.blank.normal.x -= STATIC.WIDTH_PIECE/2;
    //       edge.blank.normal.y += STATIC.WIDTH_PIECE/2;
    //       edge.blank.side.x   -= STATIC.WIDTH_PIECE;
    //       edge.blank.side.y   += STATIC.WIDTH_PIECE/2;
    //     break;
    //   }
    // }
    // else if (edge.total == 5 &&  (d.move.direction == 'up' || d.move.direction == 'down')) {
    //   edge.blank.normal.angle += 90;
    //   edge.blank.side.angle   += 90;
    //   switch (d.move.direction) {
    //     case 'up':
    //       edge.nextPos    = this.edges.newPosForm.right;
    //       edge.blank.normal.x -= STATIC.WIDTH_PIECE/2;
    //       edge.blank.normal.y -= STATIC.WIDTH_PIECE/2;
    //       edge.blank.side.x   -= STATIC.WIDTH_PIECE/2;
    //       edge.blank.side.y   -= STATIC.WIDTH_PIECE;
    //     break;
    //     case 'down':
    //       edge.nextPos    = this.edges.newPosForm.left;
    //       edge.blank.normal.x += STATIC.WIDTH_PIECE/2;
    //       edge.blank.normal.y += STATIC.WIDTH_PIECE/2;
    //       edge.blank.side.x   += STATIC.WIDTH_PIECE/2;
    //       edge.blank.side.y   += STATIC.WIDTH_PIECE;
    //     break;
    //   }
    // }

    //Move blank to the next edge
    edge.nextPos[edge.idDir].f(edge.blank, ori);
  },

  calcPositionsEdges: function(edge,direction){
    var total = edge.total;
    var doit = false;
    if(((direction == "left" || direction == "right") && (total == 11 || total == 16))
    ||
      ((direction == "up" || direction == "down") && (total == 4 || total == 14 || total == 17))){
      edge.idDir++;
      edge.blank.normal.angle += 90;
      edge.blank.side.angle += 90;
      doit = true;
    }

    if(doit){
      switch (edge.nextPos[edge.idDir-1].d) {
        case 'right':
          edge.blank.normal.x += STATIC.WIDTH_PIECE/2;
          edge.blank.normal.y -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   += STATIC.WIDTH_PIECE;
          edge.blank.side.y   -= STATIC.WIDTH_PIECE/2;
        break;
        case 'left':
          edge.blank.normal.x -= STATIC.WIDTH_PIECE/2;
          edge.blank.normal.y += STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   -= STATIC.WIDTH_PIECE;
          edge.blank.side.y   += STATIC.WIDTH_PIECE/2;
        break;
        case 'up':
          edge.blank.normal.x -= STATIC.WIDTH_PIECE/2;
          edge.blank.normal.y -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.y   -= STATIC.WIDTH_PIECE;
        break;
        case 'down':
          edge.blank.normal.x += STATIC.WIDTH_PIECE/2;
          edge.blank.normal.y += STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   += STATIC.WIDTH_PIECE/2;
          edge.blank.side.y   += STATIC.WIDTH_PIECE;
        break;
      }
    }
    // if(edge.total == 7 && (direction == 'right' || direction == 'left')){
    //   edge.blank.normal.angle += 90;
    //   edge.blank.side.angle += 90;
    //   switch (direction) {
    //     case 'right':
    //       edge.nextPos    = this.edges.newPosForm.down;
    //       edge.blank.normal.x += STATIC.WIDTH_PIECE/2;
    //       edge.blank.normal.y -= STATIC.WIDTH_PIECE/2;
    //       edge.blank.side.x   += STATIC.WIDTH_PIECE;
    //       edge.blank.side.y   -= STATIC.WIDTH_PIECE/2;
    //     break;
    //     case 'left':
    //       edge.nextPos    = this.edges.newPosForm.up;
    //       edge.blank.normal.x -= STATIC.WIDTH_PIECE/2;
    //       edge.blank.normal.y += STATIC.WIDTH_PIECE/2;
    //       edge.blank.side.x   -= STATIC.WIDTH_PIECE;
    //       edge.blank.side.y   += STATIC.WIDTH_PIECE/2;
    //     break;
    //   }
    // }
    // else if (edge.total == 5 &&  (direction == 'up' || direction == 'down')) {
    //   edge.blank.normal.angle += 90;
    //   edge.blank.side.angle   += 90;
    //   switch (direction) {
    //     case 'up':
    //       edge.nextPos    = this.edges.newPosForm.right;
    //       edge.blank.normal.x -= STATIC.WIDTH_PIECE/2;
    //       edge.blank.normal.y -= STATIC.WIDTH_PIECE/2;
    //       edge.blank.side.x   -= STATIC.WIDTH_PIECE/2;
    //       edge.blank.side.y   -= STATIC.WIDTH_PIECE;
    //     break;
    //     case 'down':
    //       edge.nextPos    = this.edges.newPosForm.left;
    //       edge.blank.normal.x += STATIC.WIDTH_PIECE/2;
    //       edge.blank.normal.y += STATIC.WIDTH_PIECE/2;
    //       edge.blank.side.x   += STATIC.WIDTH_PIECE/2;
    //       edge.blank.side.y   += STATIC.WIDTH_PIECE;
    //     break;
    //   }
    // }
  },

  calculatePoints: function(){
    this.edges.center.points *= (this.edges.left.total > 0 && this.edges.right.total > 0) ? 0 : 1;

    var points = this.edges.center.points + this.edges.up.points + this.edges.right.points + this.edges.down.points + this.edges.left.points;
    return points;
  },

  gainPoints: function(pts, team){
    this.score[team].total += pts;
    this.score[team].text.text = this.score[team].total;
  },

  finishSelect : function(direction){
    Game.time.events.removeAll();
    this.edges.hideBlanks();

    var piece = this.edges.selected;
    if(piece){
      piece.visible = false;
      piece = piece.piece;
      for(i = 0; i < this.hand.pieces.length; i++){
        // if(this.hand.pieces[i].piece[2] == piece[2])
        //   this.hand.pieces.splice(i,1);
      }
    }
    var move = {piece:piece, direction:direction};
    Link.sendMove(move);
    this.edges.selected = null;
  },

  autoPlay: function(){
    this.edges.selected = this.hand.autoPiece.p;
    this.finishSelect(this.hand.autoPiece.d);
  },

  endRound: function(){
    if(this.score[0].total >= STATIC.POINT_GOAL && this.score[0].total > this.score[1].total)
      this.hud.showScore();
    else if(this.score[1].total >= STATIC.POINT_GOAL && this.score[1].total > this.score[0].total)
      this.hud.showScore();
    else
      Game.state.start("GameoverState");
  }
}
