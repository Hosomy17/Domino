exports.randonPiece = function(pieces, hand) {
	var table  =   [];
	var indexPlay  = [];
	var indexHand  = [];
	var play  = [];
	var wasPlayed = true;
	for (var x in pieces)
	{
	   indexPlay.push(x);
	}
	for (var x in hand)
	{
	   indexHand.push(x);
	}
	for(var i = 0; i < Object.keys(pieces).length;i++)
	{
		if (pieces[indexPlay[i]].direction == "center")
		{
			table.up = pieces[indexPlay[i]].piece[0];
			table.right = pieces[indexPlay[i]].piece[0];
			table.left = pieces[indexPlay[i]].piece[0];
			table.down = pieces[indexPlay[i]].piece[0];
		}
		if (pieces[indexPlay[i]].direction == "right")
		{
			if (table.right != pieces[indexPlay[i]].piece[0])
			{
				table.right = pieces[indexPlay[i]].piece[0];
			}
			else
			{
				table.right = pieces[indexPlay[i]].piece[1];
			}
		}
		if (pieces[indexPlay[i]].direction == "left")
		{
			if (table.left != pieces[indexPlay[i]].piece[0])
			{
				table.left = pieces[indexPlay[i]].piece[0];
			}
			else
			{
				table.left = pieces[indexPlay[i]].piece[1];
			}
		}
		if (pieces[indexPlay[i]].direction == "down")
		{
			if (table.down != pieces[indexPlay[i]].piece[0])
			{
				table.down = pieces[indexPlay[i]].piece[0];
			}
			else
			{
				table.down = pieces[indexPlay[i]].piece[1];
			}
		}
		if (pieces[indexPlay[i]].direction == "up")
		{
			if (table.up != pieces[indexPlay[i]].piece[0])
			{
				table.up = pieces[indexPlay[i]].piece[0];
			}
			else
			{
				table.up = pieces[indexPlay[i]].piece[1];
			}
		}
	}
	for(var i = 0; i < Object.keys(hand).length;i++)
	{
		if (hand[i].piece[0] == table.right || hand[i].piece[1] == table.right){
			for(var j = 0; j < Object.keys(pieces).length;j++)
			{
				if (pieces[indexPlay[j]].piece[2] == hand[i].piece[2])
				{
					wasPlayed = false;
					break;
				}
			}
			if (wasPlayed == true)
			{
				play.piece = hand[i].piece;
				play.place = "right"
				return  play;
			}
			wasPlayed = true;
		}
		if (hand[i].piece[0] == table.up || hand[i].piece[1] == table.up){
			for(var j = 0; j < Object.keys(pieces).length;j++)
			{
				if (pieces[indexPlay[j]].piece[2] == hand[i].piece[2])
				{
					wasPlayed = false;
					break;
				}
			}
			if (wasPlayed == true)
			{
				play.piece = hand[i].piece;
				play.place = "up"
				return  play;
			}
			wasPlayed = true;
		}
		if (hand[i].piece[0] == table.left || hand[i].piece[1] == table.left){
			for(var j = 0; j < Object.keys(pieces).length;j++)
			{
				if (pieces[indexPlay[j]].piece[2] == hand[i].piece[2])
				{
					wasPlayed = false;
					break;
				}
			}
			if (wasPlayed == true)
			{
				play.piece = hand[i].piece;
				play.place = "left"
				return  play;
			}
			wasPlayed = true;
		}
		if (hand[i].piece[0] == table.down || hand[i].piece[1] == table.down){
			for(var j = 0; j < Object.keys(pieces).length;j++)
			{
				if (pieces[indexPlay[j]].piece[2] == hand[i].piece[2])
				{
					wasPlayed = false;
					break;
				}
			}
			if (wasPlayed == true)
			{
				play.piece = hand[i].piece;
				play.place = "down"
				return  play;
			}
			wasPlayed = true;
		}
	}
	//return Math.random() * (max - min) + min;
	return  null;
}
