var Hud = function(table){
  this.turns   = table.turns;
  this.players = [];
  this.score   = [];
}

Hud.prototype = {
  create : function(){
    var turn = Link.player.turn;
    var style = { font: "40px Arial", fill: "#ffffff", align: "center" };
    var text;

    for(i = 0;i < 4;i++){
      turn = (turn + 1)%4;

      text = null;
      if(turn != Link.player.turn){
        text = Game.add.text(this.turns[i].x, this.turns[i].y, 7, style);
        text.anchor.set(0.5);
      }
      this.players[turn] = {id:turn, ctn : 7, totalPieces : text, turn: this.turns[i]};
    }
    console.log(this.players[Link.match.turn]);
    this.players[Link.match.turn].turn.visible=true;

    var pTeam = Link.player.team;
    var pScr = Link.match.score[pTeam];
    var eTeam = (pTeam == 0) ? 1 : 0;
    var eScr = Link.match.score[eTeam];

    //Config enemy team score
    text = Game.add.text(Game.world.width * 0.18, Game.world.height * (1 - 0.06), eScr, style);
    text.anchor.set(0.5);
    text.addColor('#FF0044', 0);
    this.score[eTeam] = {text:text,total:eScr};

    //Config player team score
    text = Game.add.text(Game.world.width * 0.06, Game.world.height * (1 - 0.06) ,pScr, style);
    text.anchor.set(0.5);
    text.addColor('#0095E9', 0);
    this.score[pTeam] = {text:text,total:pScr};
  },

  showScore : function(){
    var panel = Game.add.sprite(Game.world.centerX, Game.world.centerY, 'final');
    panel.anchor.set(0.5);

    this.score[0].text.x = 0;
    this.score[0].text.y = -50;
    this.score[1].text.x = 0;
    this.score[1].text.y = 50;

    panel.addChild(this.score[0].text);
    panel.addChild(this.score[1].text);
  }
};
