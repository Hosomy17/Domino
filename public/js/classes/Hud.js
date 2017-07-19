var Hud = function(table){
  this.turns   = table.turns;
  this.players = [];
  this.score   = [];
}

Hud.prototype = {
  create : function(){
    this.group = Game.add.group();
    this.group.x = Game.world.centerX;
    this.group.y = Game.world.centerY;

    var turn = Link.player.turn;
    var style = { font: "40px Arial", fill: "#ffffff", align: "center" };
    var a=-400;
    var b=0;
    var text;

    for(i = 0;i < 4;i++){//<<<<<<<<<<<<<<<<<<<<diminuir para 3
      turn++;//<<<<<<<<<<<<<<<<<<<<<mudar para divisão???????????
      if(turn >= 4)
        turn = 0;

      text = null;
      if(turn != Link.player.turn){
        text = Game.add.text(a, b%2*(-500), 7, style);
        text.anchor.set(0.5);
        this.group.addChild(text);
      }
      a+= 400;
      b++;

      this.players[turn] = {id:turn, ctn : 7, totalPieces : text, turn: this.turns[i]};
    }
    this.players[Link.match.turn].turn.visible=true;

    var pTeam = Link.player.team;
    var pScr = Link.match.score[pTeam];
    var eTeam = (pTeam == 0) ? 1 : 0;
    var eScr = Link.match.score[eTeam];

    //Config enemy team score
    text = Game.add.text(450, -400, eScr, style);
    text.anchor.set(0.5);
    text.addColor('#ff0000', 0);
    this.group.addChild(text);
    this.score[eTeam] = {text:text,total:eScr};//<<<<<<<<<<<<<<<<<<<<<<<total não devia estar em hud que é so grafico

    //Config player team score
    text = Game.add.text(-450, 400,pScr, style);
    text.anchor.set(0.5);
    text.addColor('#0000ff', 0);
    this.group.addChild(text);
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
