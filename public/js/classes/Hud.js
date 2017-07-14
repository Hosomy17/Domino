var Hud = function(table){
  this.turns   = table.turns;
  this.players = [];
  this.score   = [];
  this.group   = null;
}

Hud.prototype = {
  create : function(){
    this.group = Game.add.group();
    this.group.x = Game.world.centerX;
    this.group.y = Game.world.centerY;

    var turn = Link.player.turn;
    style = { font: "40px Arial", fill: "#ffffff", align: "center" };
    a=-400;
    b=0;

    for(i = 0;i < 4;i++){
      turn++;
      if(turn >= 4)
        turn = 0;

      text = null;
      if(turn != Link.player.turn){
        text = Game.add.text(a, b%2*(-500), 7, style);
        this.group.addChild(text);
      }
      a+= 400;
      b++;

      this.players[turn] = {id:turn, points : 0, ctn : 7, totalPieces : text, turn: this.turns[i]};
    }
    this.players[Link.match.turn].turn.visible=true;
    text = Game.add.text(450, -400, Link.match.score[0], style);
    text.anchor.set(0.5);
    text.addColor('#ff0000', 0);
    this.group.addChild(text);
    this.score[0] = {text:text,total:Link.match.score[1]};
    this.score[1] = {text:text,total:Link.match.score[0]};//<<<<<<<<<<<<<<<<<<<<<<<<<<<<posição errada?????

    text = Game.add.text(-450, 400, Link.match.score[1], style);
    text.anchor.set(0.5);
    text.addColor('#0000ff', 0);
    this.group.addChild(text);
    this.score[Link.player.team].text = text;
  }
};
