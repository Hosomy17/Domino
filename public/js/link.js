Link = (function(){
	var _socket = io();
	var _status = 'Created';
	var _player = {
		id     : _socket.id,
		name   : 'Player',
		turn   : 0,
		team   : 0,
		pieces : [],
		status : 'connneted',
		room 	 : null
	};
	var _score = [0,0];

	var _round = 1;

	var _turn = 0;

	var _players;

	var _lastMoves = [];

	var _doublesSix = true;

	_socket.on('newMove', function(data){
		_lastMoves.unshift(data);
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
		_player.team = (_player.turn == 1 || _player.turn == 3) ? 1 : 0;
		_player.room = data.match;
		_status = 'Ready';
	});

	_socket.on('updateMatch', function(data){
		_players = data.players;
		_status = 'Update';
	});

	function getLastMove(){
		move = _lastMoves.pop();
		return move;
	}

	function getStatus(){
		return _status;
	}

	function setStatus(status){
		_status = status;
	}

	function setScore(score){
		_score = score;
	}

	function getScore(){
		return _score;
	}

	function getPlayer(){
		return _player;
	}

	function getPlayers(){
		_status = 'Ready';
		return _players;
	}

	function getRound(){
		return _round;
	}

	function getTurn(){
		return _turn
	}

	function setTurn(turn){
		_turn = turn;
	}

	function setRound(round){
		_round = round;
	}

	function getDoublesSix(){
		return _doublesSix;
	}

	function setDoublesSix(doublesSix){
		_doublesSix = doublesSix;
	}

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
				getLastMove  :getLastMove,
				getPlayer	   :getPlayer,
				getStatus    :getStatus,
				requestMatch :requestMatch,
				sendMove     :sendMove,
				newRound     :newRound,
				getScore		 :getScore,
				setScore		 :setScore,
				setStatus    :setStatus,
				getRound		 :getRound,
				setRound		 :setRound,
				setTurn			 :setTurn,
				getTurn			 :getTurn,
				setDoublesSix :setDoublesSix,
				getDoublesSix :getDoublesSix
	};
})();
