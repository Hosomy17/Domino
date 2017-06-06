function loadHud(){
  _hud = game.add.sprite(game.world.centerX,game.world.centerY);
  turn = Link.getPlayer().turn;
  style = { font: "40px Arial", fill: "#ffffff", align: "center" };
  a=-400;
  b=0;

  for(i = 0;i < 4;i++){
    turn++;
    if(turn >= 4)
      turn = 0;

    text = null;
    if(turn != Link.getPlayer().turn){
      text = game.add.text(a, b%2*(-500), 7, style);
      _hud.addChild(text);
    }
    _totalPieces[turn] = text;
    a+= 400;
    b++;

    _players[turn] = {id:turn, points : 0, ctn : 7};
  }
  text = game.add.text(450, -400, turn, style);
  text.anchor.set(0.5);
  text.addColor('#ff0000', 0);
  _hud.addChild(text);
  _score[0] = {text:text,total:0};
  _score[1] = {text:text,total:0};

  text = game.add.text(-450, 400, turn, style);
  text.anchor.set(0.5);
  text.addColor('#0000ff', 0);
  _hud.addChild(text);
  _score[Link.getPlayer().team].text = text;

}
