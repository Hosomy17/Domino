express = require('express');
ia_antonio  = require('./modules/ai');
app     = express();

app.set('port', (process.env.PORT || 8080));
server  = app.listen(app.get('port'), function() {
  console.log('Server on port', app.get('port'));
});
io      = require('socket.io')(server);

//Routes
app.use(express.static(__dirname + '/public'));

//Socket
STATIC = {
	MAX_PLAYERS : 4,
	DOMINO 		: [
								[0,0,0], [0,1,1], [0,2,2], [0,3,3], [0,4,4], [0,5,5], [0,6,6],
								[1,1,7], [1,2,8], [1,3,9], [1,4,10], [1,5,11], [1,6,12],
								[2,2,13], [2,3,14], [2,4,15], [2,5,16], [2,6,17],
								[3,3,18], [3,4,19], [3,5,20], [3,6,21],
								[4,4,22], [4,5,23], [4,6,24],
								[5,5,25], [5,6,26],
								[6,6,27]
              ]
}

matchs = {
	avaliable : [],//match
	progress  : [],//match
	disable   : [],//match
	total	  : 0
}

io.on('connection', function(socket){

	console.info('New player: ' + socket.conn.id);

	socket.on('findMatch', function(data){
		//Search an avaiable match
		var match = matchs.avaliable.shift();
		if(!match){
			match = {
				id		  : 'Room ' + matchs.total++,
				players : [],
				sum     : [0,0],
        log     : []
			}
			console.info('New match created: ' + match.id);
		}
		//Put player in the match
		var player = data.player;
		player.id = socket.conn.id;
    player.ia = false;
		socket.player = player;
		match.players.push(player);
		socket.join(match.id);

		socket.to(match.id).emit('newMatch', match);
		console.info('Player: ' + data.player.id + ' enter: ' + match.id);

		//Check if game already to start
		if(match.players.length == STATIC.MAX_PLAYERS - 2) {
      var ia = {turn:0, team:0, name: "ia 1", ia:true};
      match.players.push(ia);

      var ia = {turn:0, team:0, name: "ia 2", ia:true};
      match.players.push(ia);


			var shufflePieces = drawPieces();
			match.players[0].pieces = shufflePieces[0];
			match.players[1].pieces = shufflePieces[1];
			match.players[2].pieces = shufflePieces[2];
			match.players[3].pieces = shufflePieces[3];

      match.players[0].turn = 0;
      match.players[1].turn = 2;
      match.players[2].turn = 1;
      match.players[3].turn = 3;

      match.players[0].team = 0;
      match.players[1].team = 0;
      match.players[2].team = 1;
      match.players[3].team = 1;

			var sum = [0,0,0,0];
			for(var i=0; i < 4; i++){
				for(var j=0; j < shufflePieces[i].length; j++){
					sum[i] += shufflePieces[i][j][0] + shufflePieces[i][j][1];
				}
			}
      match.sum = [0,0];
  		for(var i=0; i < STATIC.MAX_PLAYERS; i++){
  			match.sum[match.players[i].team] += sum[i];
  		}

      var gamb = match.players[1];
      match.players[1] = match.players[2];
      match.players[2] = gamb;

			//Turn each player
			// 0 1 2 3
			// var nextTurn = 1;
			// for(var i = 0; i < STATIC.MAX_PLAYERS; i++){
			// 	match.players[i].team = 0;
			// 	if(searchPiece(match.players[i].pieces, 27)){
			// 		match.players[i].turn = 0;
			// 		match.sum[0] += sum[i];
			// 	}
			// 	else{
			// 		if(nextTurn == 2){
			// 			match.sum[0] += sum[i];
			// 		}
			// 		else{
			// 			match.players[i].team = 1;
			// 			match.sum[1] += sum[i];
			// 		}
			// 		match.players[i].turn = nextTurn++;
			// 	}

      var aux = 0;
      for(var i=0;i < STATIC.MAX_PLAYERS; i++)
      {
        if(searchPiece(match.players[i].pieces, 27))
            aux = match.players[i].turn;
      }


      matchs.progress.push(match);
			io.to(match.id).emit('startRound', {players:match.players,room:match.id,turn:aux});
			console.info('Start game: '      + match.id);
			console.info('Start new match: ' + match.id);

      //Call IA
      if(match.players[aux].ia)
      {
        var move = ia_antonio.randomPiece(match.log,match.players[aux].pieces,true);

    		match.sum[1] -= move.piece[0] + move.piece[1];
    		data.sum = match.sum;
        data.move = move;
        data.player = {"turn":aux,"team":1};

        var log = {"piece":move.piece, "direction":move.direction,"player":{"turn":aux,"team":1}};
        match.log.push(log);

    		console.info('Player: ' + match.players[aux].name + ' send new move: ' + move.piece +' '+move.direction);
    		io.to(match.id).emit('newMove',data);
      }

		}
		else
			matchs.avaliable.push(match);

		socket.match = match;
	});

	socket.on('newRound', function(data){
		var shufflePieces = drawPieces();
		socket.match.players[0].pieces = shufflePieces[0];
		socket.match.players[1].pieces = shufflePieces[1];
		socket.match.players[2].pieces = shufflePieces[2];
		socket.match.players[3].pieces = shufflePieces[3];
    data.players = socket.match.players;
		var sum = [0,0,0,0];
		for(var i=0; i < 4; i++){
			for(var j=0; j < shufflePieces[i].length; j++){
				sum[i] += shufflePieces[i][j][0] + shufflePieces[i][j][1];
			}
		}
		socket.match.sum = [0,0];
		for(var i=0; i < STATIC.MAX_PLAYERS; i++){
			socket.match.sum[data.players[i].team] += sum[i];
		}

    var aux = socket.match.log[socket.match.log.length-1].player.turn;
    if(data.sena)
    {
      for(var i=0;i < STATIC.MAX_PLAYERS; i++)
      {
        if(searchPiece(socket.match.players[i].pieces, 27))
          aux = socket.match.players[i].turn;
      }
    }

		io.to(socket.match.id).emit('startRound', {players:data.players,room:socket.match.id,turn:aux});
		console.info('Start new round: ' + socket.match.id);

    //Call IA
    socket.match.log = [];
    if(socket.match.players[aux].ia)
    {
      var move = ia_antonio.randomPiece(socket.match.log, socket.match.players[aux].pieces,data.sena);

      if(move)
        socket.match.sum[1] -= move.piece[0] + move.piece[1];
      else
        move = {"piece":null,"direction":null};

      data.sum = socket.match.sum;
      data.move = move;
      data.player = {"turn":aux,"team":1};

      var log = {"piece":move.piece, "direction":move.direction,"player":{"turn":aux,"team":1}};
      socket.match.log.push(log);

      console.info('Player: ' + socket.match.players[aux].name + ' send new move: ' + move.piece +' '+move.direction);
      io.to(socket.match.id).emit('newMove',data);
    }

	});

	socket.on('sendMove', function(data){
		if(data.move.piece != null)
			socket.match.sum[data.player.team] -= data.move.piece[0] + data.move.piece[1];

		data.sum = socket.match.sum;

    var log = {"piece":data.move.piece, "direction":data.move.direction,"player":{"turn":data.player.turn,"team":data.player.team}};
    socket.match.log.push(log);

		console.info('Player: ' + data.player.name + ' send new move: ' + data.move.piece +' '+data.move.direction);
		io.to(socket.match.id).emit('newMove',data);

    //Call IA
    var aux = (data.player.turn+1) % 4;
    if(!data.forceBreak){

      var move = ia_antonio.randomPiece(socket.match.log, socket.match.players[aux].pieces,data.sena);
      if(move)
        socket.match.sum[1] -= move.piece[0] + move.piece[1];
      else
        move = {"piece":null,"direction":null};

      data.sum = socket.match.sum;
      data.move = move;
      data.player = {"turn":aux,"team":1};

      var log = {"piece":move.piece, "direction":move.direction,"player":{"turn":aux,"team":1}};
      socket.match.log.push(log);

      console.info('Player: ' + socket.match.players[aux].name + ' send new move: ' + move.piece +' '+move.direction);
      io.to(socket.match.id).emit('newMove',data);
    }
	});

	socket.on('leaveMatch', function(){
		if(socket.match){
			socket.leave(socket.match.id);
			removePlayer(socket.match,socket.conn.id);
			socket.player.status = 'disconnect';
			//io.to(socket.match.id).emit('updateMatch',socket.player);
			//console.info('Player: ' + socket.id + ' left: ' + socket.match.id);}
		}
	});

	socket.on('disconnect', function(){
		if(socket.match){
			socket.leave(socket.match.id);
			removePlayer(socket.match,socket.conn.id);
			socket.player.status = 'disconnect';
			//io.to(socket.match.id).emit('updateMatch',socket.player);
			console.info('Player: ' + socket.conn.id + ' left: ' + socket.match.id);
		}
	});
});

function removePlayer(match,idPlayer){
	var index;
	for(var i=0; i < match.length; i++){
		if(match.players[i].id == idPlayer)
			index = i;
	}
	match.players.splice(index, 1);
};

function drawPieces(){
	var shufflePieces = [];
	var pieces = STATIC.DOMINO.slice();

	while(pieces.length > 0){
			var piecesPlayer = [];

			for(var i=0; i<7; i++)
			{
				var index = Math.floor(Math.random() * pieces.length);
				if(index < 0)
					index *= -1;

					piecesPlayer.push(pieces[index]);
					pieces.splice(index, 1);
			}

			shufflePieces.push(piecesPlayer);
	}

	return shufflePieces;
}

function searchPiece(array, value){
	result = null;
	for(i = 0; i < array.length; i++)	{
		if(array[i][2] == value)
			result = array[i];
	}
	return result;
}
