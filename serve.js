express = require('express'),
app     = express(),
http    = require('http').Server(app),
io      = require('socket.io')(http),
//$       = require('jquery');

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

//Routes

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
	res.sendFile('/index.html');
});

//Socket
matchs =
{
	avaliable : [],//match
	progress  : [],//match
	disable   : [],//match
	total	  : 0
}

io.on('connection', function(socket){

	console.info('New player: ' + socket.id);

	socket.on('findMatch', function(data){

		//Search an avaiable match
		match = matchs.avaliable.shift();

		if(!match){
			match = {
				id		: 'Room ' + matchs.total++,
				players : []
			}

			console.info('New match: ' + match.id);
		}

		//Put player in the match
		player = data.player;
		player.id = socket.conn.id;//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<problema com o '/#' dos ids
		socket.player = player;

		match.players.push(player);
		socket.join(match.id);

		socket.to(match.id).emit('newMatch', match);
		console.info('Player: ' + data.player.id + ' enter: ' + match.id);

		//Check if game already to start
		if(match.players.length == STATIC.MAX_PLAYERS) {
			//Shuffle domino
			shufflePieces = [];
			pieces = STATIC.DOMINO.slice();

			while(pieces.length > 0)
			{
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

      match.players[0].pieces = shufflePieces[0];
			match.players[1].pieces = shufflePieces[1];
			match.players[2].pieces = shufflePieces[2];
			match.players[3].pieces = shufflePieces[3];

			//Turn each player
			match.players[0].turn = 0;
			match.players[1].turn = 1;
			match.players[2].turn = 2;
			match.players[3].turn = 3;

			matchs.progress.push(match);
			io.to(match.id).emit('startMatch', {players:match.players});

			console.info('Start game: ' + match.id);
		}
		else {
			matchs.avaliable.push(match);
		}

		socket.match = match;
	});

	socket.on('sendMove', function(data){
		//verificar<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< se ta tudo ok
		console.info('Player: ' + data.id + ' send new move: ' + data.move);
		io.to(socket.match.id).emit('newMove',data);
	});

	socket.on('leaveMatch', function(data){
		if(socket.match)
			//socket.unjoin(match.id);//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
			socket.player.status = 'disconnect';
			io.to(socket.match.id).emit('updateMatch',socket.player);
			console.info('Player: ' + socket.id + ' left: ' + socket.match.id);

	});

	socket.on('disconnect', function(data){
		if(socket.match)
		{
			socket.player.status = 'disconnect';
			io.to(socket.match.id).emit('updateMatch',socket.player);
			console.info('Player: ' + socket.id + ' left: ' + socket.match.id);
		}
	});
});

http.listen(3000, function()
{
	console.log('Server on port 3000');
});
