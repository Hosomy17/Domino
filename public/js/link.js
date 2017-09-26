Link = (function(){
	var _socket = io();

	//Info about player in the current match
	var _players = [];
	var _player = {
		id     : _socket.id,
		name   : 'Player1',
		turn   : 0,
		team   : 0,
		pieces : [],
		status : 'connneted',
		room 	 : null,
		lastMoves : []
	};

	//Info about match
	var _match = {
		score     : [0,0],
		round     : 1,
		turn      : 0,
		sena: true,
		status    : 'Created'
	};

	//Received Messages//
	_socket.on('newMove', function(data){
		_player.lastMoves.unshift(data);
	});

	_socket.on('startRound', function(data){
		var players = data.players;
		switch (_socket.id){
			case players[0].id:
				_player = players[0];
			break;
			case players[1].id:
				_player = players[1];
			break;
			case players[2].id:
				_player = players[2];
			break;
			case players[3].id:
				_player = players[3];
			break;
		}
		_players[0] = {name:players[0].name, team:players[0].team, pieces:[]};//<<<<<<<<<<<<<<<<<<<<<verificar se está certo
		_players[1] = {name:players[1].name, team:players[1].team, pieces:[]};
		_players[2] = {name:players[2].name, team:players[2].team, pieces:[]};
		_players[3] = {name:players[3].name, team:players[3].team, pieces:[]};

		_player.room = data.room;
		_match.status = 'Ready';
	});

	_socket.on('updateMatch', function(data){
		_players = data.players;
		_status = 'Update';
	});

	function requestMatch(){
		var msg = {player: _player};
		_socket.emit('findMatch', msg);
	}

	function sendMove(move){
		var player = {name:_player.name,turn:_player.turn,team:_player.team};
		var msg = {player:player,move:move};

		_socket.emit('sendMove',msg);
	}

	function newRound(){
		var msg = {players:_players};
		_socket.emit('newRound',msg);
	}

	function leaveMacth(){
		_socket.disconnect();
	}

	return {
		player : {
			get pieces(){return _player.pieces}, set pieces(v){_player.pieces = v},
			get turn(){return _player.turn},     set turn(v){_player.turn = v},
			get team(){return _player.team},     set team(v){_player.team = v},
			get lastMove(){return _player.lastMoves.pop()}

		},
		match  : {
			get sena(){return _match.sena},     set sena(v){_match.sena = v},
			get status(){return _match.status}, set status(v){_match.status = v},
			get score(){return _match.score},   set score(v){_match.score = v},
			get round(){return _match.round},   set round(v){_match.round = v},
			get turn(){return _match.turn},     set turn(v){_match.turn = v}
		},
		requestMatch :requestMatch,
		sendMove     :sendMove,
		newRound     :newRound,
		leaveMacth   :leaveMacth
	};
})();
