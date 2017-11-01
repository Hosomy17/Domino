exports.randomPiece = function(pieces, hand, start) {
	var table  =   [];
	var indexPlay  = [];
	var indexHand  = [];
	var play  = {"piece":null,"direction":null};
	var wasPlayed = true;
	var v0 = [0,0,0,0,0,0,0];
	var v1 = [0,0,0,0,0,0,0];
	var v2 = [0,0,0,0,0,0,0];
	var v3 = [0,0,0,0,0,0,0];
	var vPlay = [];
	var turno;
	var cont = 0;

	var a1 = 30.6476;
	var a2 = -20.7642;
	var a3 = 22.6558;
	var a4 = 13.9483;
	var a5 = 1.9962;
	var a6 = 14.8605;
	var a7 = 3.4247;

	var E1 = 0, E2 = 0, Tp = 0, Tf = -10000;
	var teste = -1;

	for (var x in pieces)
	{
	   indexPlay.push(x);
	}
	for (var x in hand)
	{
	   indexHand.push(x);
	}

	///Montagem das pecas na mesa

	for(var i = 0; i < Object.keys(pieces).length;i++)
	{
		if (pieces[indexPlay[i]].direction == "center")
		{
			table.center = pieces[indexPlay[i]].piece[0];
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

	if (table.center == null)
	{
		if (start)
		{
			for(var i = 0; i < Object.keys(hand).length;i++)
			{
				if (hand[i][2] == 27)
				{
					return {piece:hand[i],direction:"center"};
				}
			}
			return null;
		}
		else
		{
			for(var i = 0; i < Object.keys(hand).length;i++)
			{
				if (hand[i][0] == hand[i][1])
				{
					return {piece:hand[i],direction:"center"};
				}
			}
			return null;
		}
	}

	// logica para saber quais sao as jogadas possiveis

	for(var i = 0; i < Object.keys(hand).length;i++)
	{
		play = {"piece":null,"direction":null};
		if (hand[i][0] == table.right || hand[i][1] == table.right){
			for(var j = 0; j < Object.keys(pieces).length;j++)
			{
				if (pieces[indexPlay[j]].piece)
				{
					if (pieces[indexPlay[j]].piece[2] == hand[i][2])
					{
						wasPlayed = false;
						break;
					}
				}
			}
			if (wasPlayed == true)
			{
				play.piece = hand[i];
				play.direction = "right";
				vPlay.push(play);
				cont++;
			}
			wasPlayed = true;
		}
		play = {"piece":null,"direction":null};
		if (hand[i][0] == table.left || hand[i][1] == table.left){
			for(var j = 0; j < Object.keys(pieces).length;j++)
			{
				if (pieces[indexPlay[j]].piece)
				{
					if (pieces[indexPlay[j]].piece[2] == hand[i][2])
					{
						wasPlayed = false;
						break;
					}
				}
			}
			if (wasPlayed == true)
			{
				play.piece = hand[i];
				play.direction = "left";
				vPlay.push(play);
				cont++;
			}
			wasPlayed = true;
		}
		play = {"piece":null,"direction":null};
		if (hand[i][0] == table.up || hand[i][1] == table.up){
			for(var j = 0; j < Object.keys(pieces).length;j++)
			{
				if (pieces[indexPlay[j]].piece)
				{
					if (pieces[indexPlay[j]].piece[2] == hand[i][2])
					{
						wasPlayed = false;
						break;
					}
				}
			}
			if (wasPlayed == true)
			{
				play.piece = hand[i];
				play.direction = "up";
				vPlay.push(play);
				cont++;
			}
			wasPlayed = true;
		}
		play = {"piece":null,"direction":null};
		if (hand[i][0] == table.down || hand[i][1] == table.down){
			for(var j = 0; j < Object.keys(pieces).length;j++)
			{
				if (pieces[indexPlay[j]].piece)
				{
					if (pieces[indexPlay[j]].piece[2] == hand[i][2])
					{
						wasPlayed = false;
						break;
					}
				}
			}
			if (wasPlayed == true)
			{
				play.piece = hand[i];
				play.direction = "down";
				vPlay.push(play);
				cont++;
			}
			wasPlayed = true;
		}
	}
	// Montagem dos vetores de cauculo


	// Montagem v0, quantidade de pecas de cada naipe jogadas
	for(var i = 0; i < Object.keys(pieces).length;i++)
	{
		if (pieces[indexPlay[i]].piece)
		{
			v0[pieces[indexPlay[i]].piece[0]]++;
			if (pieces[indexPlay[i]].piece[1] != pieces[indexPlay[i]].piece[0])
				v0[pieces[indexPlay[i]].piece[1]]++;
		}

	}

	// Montagem v1
	// quantidade de pecas de cada naipe na sua mao
	for(var i = 0; i < Object.keys(hand).length;i++)
	{
		for(var j = 0; j < Object.keys(pieces).length;j++)
		{
			if (pieces[indexPlay[j]].piece)
			{
				if (pieces[indexPlay[j]].piece[2] == hand[i][2])
				{
					wasPlayed = false;
					break;
				}
			}
		}
		if (wasPlayed == true)
		{
			v1[hand[i][0]]++;
			if (hand[i][0]!= hand[i][1])
				v1[hand[i][1]]++;
		}
		wasPlayed = true;
	}
	// Quantidade de pecas de cada naipe nas maos dos demais jogadores
	for(var i = 0; i < 7;i++)
	{
		v1[i] = 7 - v0[i] - v1[i];
	}


	//Montagem v2, quantidade de pecas de cada naipe nas estremidades da mesa
	v2[table.right]++;
	v2[table.up]++;
	v2[table.left]++;
	v2[table.down]++;

	// Montando V3, qunatidade de pecas de cada naipe jogada pelo meu parceiro
	turno = Object.keys(pieces).length%4;
	if (turno == 3 || turno == 2)
	{
		turno-=2;
	}

	for(var i = turno; i < Object.keys(pieces).length;i=i+4)
	{
		if (pieces[indexPlay[i]].piece)
		{
			v3[pieces[indexPlay[i]].piece[0]]++;
			if (pieces[indexPlay[i]].piece[0] != pieces[indexPlay[i]].piece[1])
				v3[pieces[indexPlay[i]].piece[1]]++;
		}
	}

    // Calculo para saber qual será a jogada selecionada
	for(var i = 0; i < Object.keys(vPlay).length;i++)
	{
		if (vPlay[i].direction == "right")
		{
			if (table.right == vPlay[i].piece[0] )
			{
				L1 = vPlay[i].piece[0];
				L2 = vPlay[i].piece[1];
			}
			else
			{
				L1 = vPlay[i].piece[1];
				L2 = vPlay[i].piece[0];
			}
		}
		if (vPlay[i].direction == "left")
		{
			if (table.left == vPlay[i].piece[0] )
			{
				L1 = vPlay[i].piece[0];
				L2 = vPlay[i].piece[1];
			}
			else
			{
				L1 = vPlay[i].piece[1];
				L2 = vPlay[i].piece[0];
			}
		}
		if (vPlay[i].direction == "up")
		{
			if (table.up == vPlay[i].piece[0] )
			{
				L1 = vPlay[i].piece[0];
				L2 = vPlay[i].piece[1];
			}
			else
			{
				L1 = vPlay[i].piece[1];
				L2 = vPlay[i].piece[0];
			}
		}
		if (vPlay[i].direction == "down")
		{
			if (table.down == vPlay[i].piece[0] )
			{
				L1 = vPlay[i].piece[0];
				L2 = vPlay[i].piece[1];
			}
			else
			{
				L1 = vPlay[i].piece[1];
				L2 = vPlay[i].piece[0];
			}
		}
		E1 = a1 * v0[L1] + a2 * v1[L1] + a3 * v2[L1]
		E2 = a4 * v0[L2] + a5 * v1[L2] +a6 * v2[L2] + a7*v3[L2];
		Tp = E2 - E1;
		if (Tp > Tf)
		{
			Tf = Tp;
			teste = i;
		}
		Tp = 0;
		L1 = -1;
		L2 = -1;
	}

	if ( Object.keys(vPlay).length == 0)
		return null;

	return  vPlay[teste];
}

// formulas a serem implementadas

//return Math.random() * (max - min) + min;
// Dificultar jogada do oponente
// E1 = a1.V0(L1) +a2.V1(L1) +a3.V2(L1)
// Ajudar parceiro
// E2 = a4.V0(L2) +a5.V1(L2) +a6.V2(L2) +a7.V3(L2)
// Estrategista
// Tp=−E1+E2
