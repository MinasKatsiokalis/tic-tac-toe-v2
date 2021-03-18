var Game = (function(){
	var Game =function(){
		thisGame = this;
		
		var startPanel = document.getElementById('startPanel');
		var name1 = startPanel.getElementsByTagName('input')[0].value;
		var name2 = startPanel.getElementsByTagName('input')[1].value;
		thisGame.checkedBox = [[0,0,0],[0,0,0],[0,0,0]];
		
		
		if(name1==null || name1.replace(" ","")==""){
			name1 = "Player 1";
		}
		if(name2==null || name2.replace(" ","")=="") {
			name2 = "Player 2";
		}
		thisGame.players = [name1,name2];
		startPanel.style.display = "none";
		var resetButton = document.getElementById('reset');
		resetButton.style.visibility='visible';
		
		var player = 1;
		document.getElementsByTagName("h2")[0].innerHTML = "It's "+thisGame.players[0]+"'s turn to play";
		
		//get the click point
		thisGame.clickMe = function(event){
			var x = event.x-(document.body.clientWidth-490)/2+document.body.scrollLeft;
			var y = event.y-90+document.body.scrollTop;
			
			thisGame.findBox(x,y);
		}
		
		//function that draws the boxes
		thisGame.drawBoard = function(){
			var canvas = document.getElementsByTagName('canvas')[0];
			var context = canvas.getContext('2d');
			
			//create the boxes
			context.fillStyle = "#FFF";
			context.fillRect(0,0,150,150);//0-150 170-320 340-490
			context.fillRect(0,170,150,150);
			context.fillRect(0,340,150,150);
			context.fillRect(170,0,150,150);
			context.fillRect(170,170,150,150);
			context.fillRect(170,340,150,150);
			context.fillRect(340,0,150,150);
			context.fillRect(340,170,150,150);
			context.fillRect(340,340,150,150);
			//event click on canvas
			canvas.addEventListener("click",thisGame.clickMe,false);
			// canvas.addEventListener('mouseover', function(e) {alert(e.type + ' on ' + this.id);}, false); 	
		};
		thisGame.drawBoard();

		//change the header(that tell whose turn is to play) and sets the playr that must play
		thisGame.toPLay = function(){
			
			if(player == 1){
				player = 2;
				document.getElementsByTagName("h2")[0].innerHTML = "It's "+thisGame.players[1]+"'s turn to play";
			}
			else if(player == 2){
				player = 1; 
				document.getElementsByTagName("h2")[0].innerHTML = "It's "+thisGame.players[0]+"'s turn to play";
			}
		}
		
		//function that draw X
		thisGame.drawX = function(x,y,color){
			
			if((x<0 || x>2 ) || (y<0 || y>2)) return;

			var offset = 15;
			var canvas = document.getElementsByTagName('canvas')[0];
			var context = canvas.getContext('2d');
			
			context.lineWidth = 10;
			context.strokeStyle =(color == null) ? "black" : color;;
			context.beginPath();
			context.moveTo(170*x+offset,170*y+offset);
			context.lineTo(170*(x+1)-offset-20,170*(y+1)-offset-20);
			context.stroke();
			context.beginPath();
			context.moveTo(170*(x+1)-offset-20,170*y+offset);
			context.lineTo(170*x+offset,170*(y+1)-offset-20);
			context.stroke();
		}
		
		//function that draw O
		thisGame.drawO = function(x,y,color){
			
			if((x<0 || x>2 ) || (y<0 || y>2)) return;

			var radius = 65;
			var canvas = document.getElementsByTagName('canvas')[0];
			var context = canvas.getContext('2d');
			
			context.beginPath();
			context.strokeStyle = (color == null) ? "black" : color;;
			context.fill();
			context.lineWidth = 10;
			context.fillStyle = 'white';
			context.arc(75+170*x,75+170*y,radius,0, 2 * Math.PI, false);
			context.stroke();
		}
		
		//find  which box has the user click on
		thisGame.findBox = function(x,y){
			
			if(!(Math.floor((x+20)/170)==Math.floor((x-20)/170) && Math.floor((y+20)/170)==Math.floor((y-20)/170)))return;
			var posx = Math.floor(x/170);
			var posy = Math.floor(y/170);
			
			if(thisGame.checkStatus())return; 

			if(thisGame.checkedBox[posx][posy] != 0) return;
			
			thisGame.checkedBox[posx][posy] = (player ==1)?"x":"o";
			
			if(player == 1){ 
				thisGame.drawX(posx,posy);
			}else if(player == 2){ 
				thisGame.drawO(posx,posy); 
			}
			if(thisGame.checkStatus())return; 
			thisGame.toPLay();	
		}
		
		thisGame.checkStatus = function(){
			var notfull = false;
			for(i=0;i<3;i++){
				for(j = 0;j<3; j++) {
					console.log(thisGame.checkedBox[i][j]+"/n");
				}
			}
			
			for(i = 0;i < 3;i++){
				if(thisGame.checkedBox[i][0] != 0 && thisGame.checkedBox[i][0] == thisGame.checkedBox[i][1] && thisGame.checkedBox[i][1] == thisGame.checkedBox[i][2]){
					//change row color
					if(thisGame.checkedBox[i][0] == "o"){
						thisGame.drawO(i,0,"red");
						thisGame.drawO(i,1,"red");
						thisGame.drawO(i,2,"red");
						document.getElementsByTagName("h2")[0].innerHTML = thisGame.players[1]+" is the winner!";
					}else{
						thisGame.drawX(i,0,"red");
						thisGame.drawX(i,1,"red");
						thisGame.drawX(i,2,"red");
						document.getElementsByTagName("h2")[0].innerHTML = thisGame.players[0]+" is the winner!";
					}

					return true;
				} 
				if(thisGame.checkedBox[0][i] != 0 && thisGame.checkedBox[0][i] == thisGame.checkedBox[1][i] && thisGame.checkedBox[1][i] == thisGame.checkedBox[2][i] ){
					//change column color
					if(thisGame.checkedBox[0][i] == "o"){
						thisGame.drawO(0,i,"red");
						thisGame.drawO(1,i,"red");
						thisGame.drawO(2,i,"red");
						document.getElementsByTagName("h2")[0].innerHTML = thisGame.players[1]+" is the winner!";
					}else{
						thisGame.drawX(0,i,"red");
						thisGame.drawX(1,i,"red");
						thisGame.drawX(2,i,"red");
						document.getElementsByTagName("h2")[0].innerHTML = thisGame.players[0]+" is the winner!";
					}

					return true;
				}
			}	
			//check for diagonals
			if(thisGame.checkedBox[0][0] != 0 && thisGame.checkedBox[0][0] == thisGame.checkedBox[1][1] && thisGame.checkedBox[1][1] == thisGame.checkedBox[2][2]){
				//change diagonals color
				if(thisGame.checkedBox[0][0] == "o"){
						thisGame.drawO(0,0,"red");
						thisGame.drawO(1,1,"red");
						thisGame.drawO(2,2,"red");
						document.getElementsByTagName("h2")[0].innerHTML = thisGame.players[1]+" is the winner!";
					}else{
						thisGame.drawX(0,0,"red");
						thisGame.drawX(1,1,"red");
						thisGame.drawX(2,2,"red");
						document.getElementsByTagName("h2")[0].innerHTML = thisGame.players[0]+" is the winner!";
					}

					return true;
			}

			if(thisGame.checkedBox[0][2] != 0 && thisGame.checkedBox[0][2] == thisGame.checkedBox[1][1] && thisGame.checkedBox[1][1] == thisGame.checkedBox[2][0]){
				//change diagonals color
				if(thisGame.checkedBox[0][2] == "o"){
						thisGame.drawO(0,2,"red");
						thisGame.drawO(1,1,"red");
						thisGame.drawO(2,0,"red");
						document.getElementsByTagName("h2")[0].innerHTML = thisGame.players[1]+" is the winner!";
					}else{
						thisGame.drawX(0,2,"red");
						thisGame.drawX(1,1,"red");
						thisGame.drawX(2,0,"red");
						document.getElementsByTagName("h2")[0].innerHTML = thisGame.players[0]+" is the winner!";
					}

					return true;
			}


			for(i = 0;i < 3;i++){
				for(j = 0;j < 3;j++){
					if(thisGame.checkedBox[i][j] == 0) notfull = true; 
				}
			}
			if(notfull == false){
				document.getElementsByTagName("h2")[0].innerHTML = "It's a draw";
				return true;
			}
			return false;
		}
	}
	//Return the game object(create new game)
	return Game;	
})();

//Events on buttons(start,reset)
var game;
document.getElementById('start').addEventListener('click',function(){game = new Game();},false);
document.getElementById('reset').addEventListener('click',function(){game = new Game();},false);





