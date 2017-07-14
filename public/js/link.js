Link = (function(){
	var _socket = io();

	//Info about player in the current match
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
		doublesSix: true,
		status    : 'Created'
	};

	//Received Messages//
	_socket.on('newMove', function(data){
		_player.lastMoves.unshift(data);
	});

	_socket.on('startRound', function(data){
		_players = data.players;
		switch (_socket.id){
			case _players[0].id:
				_player = _players[0];
			break;
			case _players[1].id:
				_player = _players[1];
			break;
			case _players[2].id:
				_player = _players[2];
			break;
			case _players[3].id:
				_player = _players[3];
			break;
		}
		_player.room = data.match;
		_match.status = 'Ready';
	});

	_socket.on('updateMatch', function(data){
		_players = data.players;
		_status = 'Update';
	});

	function requestMatch(){
		msg = {player: _player};
		_socket.emit('findMatch', msg);
	}

	function sendMove(move){
		msg = {player:_player,move:move};
		_socket.emit('sendMove',msg);
	}

	function newRound(){
		msg = {players:_players,room:_player.room};
		_socket.emit('newRound',msg);
	}

	return {
		player : {
			get pieces(){return _player.pieces}, set pieces(v){_player.pieces = v},
			get turn(){return _player.turn},     set turn(v){_player.turn = v},
			get team(){return _player.team},     set team(v){_player.team = v},
			get lastMove(){return _player.lastMoves.pop()}

		},
		match  : {
			get doublesSix(){return _match.doublesSix}, set doublesSix(v){_match.doublesSix = v},
			get status(){return _match.status},         set status(v){_match.status = v},
			get score(){return _match.score},           set score(v){_match.score = v},
			get round(){return _match.round},           set round(v){_match.round = v},
			get turn(){return _match.turn},             set turn(v){_match.turn = v}
		},
		requestMatch :requestMatch,
		sendMove     :sendMove,
		newRound     :newRound
	};
})();
