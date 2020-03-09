//Second type out of TicTacToe Game
window.onload = function() {this.watch()};
function watch() {
    var btn=document.getElementById("btnStop");
    btnDisabled(btn);
}

//function to roll the dice
function rollForTurn() {
    var xArray = [];
    var ranNum = "";
    var minimum = 1;
    var maximum = 11;
    var first = "";
    var txt1 = "";
    for (var i = 0; i < 2; i++) {
        //generate random whole number between one and ten
        ranNum= Math.floor(Math.random()*(maximum-minimum)+minimum);
        xArray.push(ranNum);
    }
    diceRoll() //play the dice sound
    //string to show which player rolled what
    for (i=0;i<xArray.length;i++) {
        var result = i + 1;
        var pOne= xArray[0];
        var pTwo = xArray[1];
        if (pOne == pTwo) {//rig roll to avoid tie
            pOne = 1;
            pTwo = 2;
        }
        txt1 = "Player One rolled ["+pOne+"]<br>";
        writeMsg(txt1);
        txt1 = txt1+"Player Two rolled ["+pTwo+"]<br><br>";
        setTimeout(function() {writeMsg(txt1);}, 1000); //time delay for effect
    }
    if (pOne > pTwo) {
        first = "Player 1";
        setTimeout(function(){txt1 = txt1 + "Player One wins, please choose a square";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    } else if (pOne < pTwo) {
        first = "Player 2";
        setTimeout(function(){ txt1 = txt1+"Player Two wins, please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    }
    return first;
}
//Initiate the gmae, roll for turn and determine active player
function startGame() {
    var xTurn = 0;
    activePlayer = rollForTurn();
    if (activePlayer == "") {
        activePlayer == rollForTurn();
    }
    setTimeout(function() {hideGameMsg();}, 4000);

    //assign proper state of control buttons
    var btn = document.getElementById("btnStart"); //disable the start button
    var btn = document.getElementById("btnStop");
    stopEnabled(btn);//enable the stop button

    //assign active player to the console
    var showPlayer = document.getElementById("showPlayer")
    showPlayer.innerHTML = activePlayer;
    showPlayer.style.color = "green";
}

//function to style game buttons while disabled
function btnDisabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(153, 153, 102)";
    btn.style.backgroundColor = "rgb(214, 214, 194)";
    btn.disabled = true;
}

//function to style the game buttons while disabled
function stopEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(204, 0, 0)";
    btn.style.backgroundColor = "rgb(255,51,51)";
    btn.disabled = false;
}

//function styles buttons 
function startEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(0,153,0)";
    btn.style.backgroundColor = "rgb(57,230,0)";
    btn.disabled = false;
}

//when indicates stop game and reset it
function stopGame() {
    hideGameMsg(); //clear text and hide message box
    var btn=document.getElementById("btnStart");
    startEnabled(btn);//enable the start button since game is stopped
    var btn = document.getElementById("btnStop");
    btnDisabled(btn);//disable stop button
    var showPlayer = document.getElementById("showPlayer")
    showPlayer.innerHTML = "Game Stopped";
    showPlayer.style.color= "red";

    //reset all squares to their starting empty state
    var arrayO = document.getElementsByClassName("O");
    var arrayX = document.getElementsByClassName("X");
    for (var i=0; i<arrayO.length;i++) {
        arrayO[i].style.transform = "translateY(-100%)";
    }
    for (var i=0; i<arrayX.length;i++) {
        arrayX[i].style.transform = "translateY(100%)";
    }
    //clear the running log of all game moves
    document.getElementsByClassName("boardState").innerHTML = "";
}

function showGameMsg() {
    document.getElementById("gameMsgBox").style.display= "block";
}

//function to conceal message console from view
function hideGameMsg() {
    clearMsg() //clear the text from the message console
    document.getElementById("gameMsgBox").style.display = "none"; //hides the div
}
//function to write text to the game message console
function writeMsg(txt) {
    showGameMsg();
    document.getElementById("gameMsg").innerHTML = txt;
}

//function to clear text from message console
function clearMsg() {
    document.getElementById("gameMsg").innerHTML = "";
}

//function is for player configuration fo panel to save settings
function saveSettings() {
    var p1Index = document.getElementById("player1").selectedIndex;
    var p1Selected = document.getElementById("player1").options;
    var p2Index = document.getElementById("player2").selectedIndex;
    var p2Selected = document.getElementById("player2").options;
    if (p1Selected[p1Index].text == p2Selected[p2Index].text) {
        alert("Error - Player One and Player Two cannot both be assigned as: "+p1Selected[p1Index].text)
    } else {
        document.getElementById("p1Display").innerHTML=p1Selected[p1Index].text;
        document.getElementById("p2Display").innerHTML=p2Selected[p2Index].text;
    }
}

//function returns currently assigned avatar for each player
function getAvatars() {
    var p1Avatar = document.getElementById("p1Display").innerHTML;
    var p2Avatar = document.getElementById("p2Display").innerHTML;
    var avatarArray = [p1Avatar,p2Avatar];
    return avatarArray;
}
//functino returns active players avatar
function determineAvatar() {
    //determine correct avatar to paint for active player
    var avatarArray = getAvatars();//return array of both players assigned avatar
    var active = document.getElementById("showPlayer").innerHTML;//get active player
    p1Avatar = avatarArray[0];
    p2Avatar = avatarArray[1];
    if (active =="player 1") {//check which player is active and their avatar
        var paintAvatar = p1Avatar;
    } else if (active == "player 2") {
        var paintAvatar = p2Avatar;
    }
    return paintAvatar;//return back correct avatar
}

//function to change active player to other player
function avatarPlaced() {
    var parseText = document.getElementById("gameMsg").innerHTML;
    var showPlayer = document.getElementById("showPlayer");//select current element to memory, check if there is already a winner if there is don't continue game
    if (parseText =="That's three in a row, Player One wins!" || parseText == "That's three in a row, Player Two wins!") {
        showPlayer.innerHTML = "Game Stopped";
        showPlayer.style.color = "red";
    }
    activePlayer = showPlayer.innerHTML;//get current player from element
    if (activePlayer == "Player 1") {// once active player selected a square change active player
        showPlayer.innerHTML = "Player 2";
    } else {
        showPlayer.innerHTML = "Player 1";
    }
    check4Tie();//call this function to inquire if a cat's game
}

//function will get array of the current board
function check(info,square) {
    for (var i in info) {
        var tempInfo = info[i].charAt(0);//comparing index of square
        if (tempInfo == square) {
            return tempInfo;
        }
    }
}

//squares are selected they check in with this function to see if that square has been assigned and if not record new square with current avatar
function recordMoves(square) {
    var proposedMove = square;
    var boardState = document.getElementById("boardState").innerHTML;//retrieve current boardState array
    var info = boardState.split(",");//separate the string by commas to create array
    verdict = check(info,square);//call function to check if square occupied
    return verdict;
}
//function will get list of previous moves then concatenate the current move to it
function recordMove(currentMove) {
    var target = document.getElementById("boardState");
    var previousMoves = target.innerHTML;
    target.innerHTML = previousMoves+currentMove;
}

function checkForWinCon() {
    var squareArray = [];
    var target = document.getElementById("boardState");
    var info= target.innerHTML;//raw array with squares and avatars
    info = info.substring(1); //remove leading comma
    info = info.split(",");//separate teh string by commas into an array
    info.sort(); //sort the square array into order despite actual gameplay sequence
    for (var i in info) {
        squareArray.push(info[i].charAt(0));//new array with old squares not avatars
    }
    //call the following array of functions to check if a win has happened
    checkWinCon1(info,squareArray);
    checkWinCon2(info,squareArray);
    checkWinCon3(info,squareArray);
    checkWinCon4(info,squareArray);
    checkWinCon5(info,squareArray);
    checkWinCon6(info,squareArray);
    checkWinCon7(info,squareArray);
    checkWinCon8(info,squareArray);
    //console.log("New Check: "+document.getElementById("gameMsg").innerHTML);
    check4Tie()
}
//call functiont o check state for ties and act accordingly
function check4Tie() {
    var boardState = document.getElementById("boardState").innerHTML;
    boardState = boardState.substring(1);//remove leading comma
    boardState = boardState.split(","); //separate by comma into an array
    var check = document.getElementById("gameMsg").innerHTML;
    if(boardState.length>=9 && check != "That's three in a row, Player One wins!" && check != "That's three in a row, Player Two wins!") {
        var txt1 = "Oh no! Nobody wins, it's a tie!";
        tieSound();
        writeMsg(txt1);
        setTimeout(function() {stopGame();}, 3000);
    }
}
//whenever a win is detected the corresponding function will call this function to produce the winning process of the game
function winner(winDetected,winCon) {
    if (winDetected == "win") {
        var showme = winDetected;
        var activePlayer = document.getElementById("showPlayer").innerHTML;
        var txt2 = "That's three in a row, "+activePlayer+" wins!";
        writeMsg(txt2);
        var btn= document.getElementById("btnStart");
        startEnabled(btn);//enable the start button since game is over
        var btn = document.getElementById("btnStop");
        btnDisabled(btn);//disable stop button since game is stopped
        document.getElementById("showPlayer").innerHTML = "Game Stopped";
        glowBoard(winCon);//call function to make pulse of colors for winning
    }
}
function glowBoard(pos) {
    var index0 = pos[0];
    var index1 = pos[1];
    var index2 = pos[2];
    var squares = document.getElementsByClassName("square")
    for (var i=0;i<squares.length;i++) {
        if (i == index0) {
            var bg1 = squares[i];
            blink();
            winSound()
            setTimeout(function() {bg1.style.backgroundColor = "rgb(244, 179, 66)";}, 100);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(244, 238, 66)";}, 200);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(197, 244, 66)";}, 300);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(122, 244, 66)";}, 400);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(66, 244, 235)";}, 500);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(244, 179, 66)";}, 600);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(244, 238, 66)";}, 700);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(197, 244, 66)";}, 800);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(122, 244, 66)";}, 900);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(66, 244, 235)";}, 1000);
            setTimeout(function() {bg1.style.backgroundColor = "#d7f3f7";}, 1100);
        } else if (i == index1) {
            var bg2 = squares[i];
            setTimeout(function() {bg2.style.backgroundColor = "rgb(66, 244, 235)";}, 100);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(122, 244, 66)";}, 200);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(197, 244, 66)";}, 300);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(244, 238, 66)";}, 400);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(244, 179, 66)";}, 500);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(66, 244, 235)";}, 600);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(122, 244, 66)";}, 700);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(197, 244, 66)";}, 800);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(244, 238, 66)";}, 900);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(244, 179, 66)";}, 1000);
            setTimeout(function() {bg2.style.backgroundColor = "#d7f3f7";}, 1100);
        } else if ( i == index2) {
            var bg3 = squares[i];
            setTimeout(function() {bg3.style.backgroundColor = "rgb(244, 179, 66)";}, 100);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(244, 238, 66)";}, 200);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(197, 244, 66)";}, 300);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(122, 244, 66)";}, 400);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(66, 244, 235)";}, 500);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(244, 179, 66)";}, 600);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(244, 238, 66)";}, 700);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(197, 244, 66)";}, 800);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(122, 244, 66)";}, 900);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(66, 244, 235)";}, 1000);
            setTimeout(function() {bg3.style.backgroundColor = "#d7f3f7";}, 1100);
        }
    }
    setTimeout(function() {stopGame();}, 1200);
}
// The functions to produce game sounds depending on trigger event
function squareSound() {
    var sound = document.getElementById("placeAvatar");
    sound.play();
    setTimeout(function() {sound.pause();}, 400);//add delay to keep sound short
    setTimeout(function() {sound.currentTime = 0;}, 500);
}
function tieSound() {
    var sound = document.getElementById("tieGame");
    var check = document.getElementById("gameMsg").innerHTML;
    setTimeout(function() {sound.play();}, 500);
}
function winSound() {
    var sound = document.getElementById("winGame");
    setTimeout(function() {sound.play();}, 500);
    setTimeout(function() {sound.pause();}, 2700);//add delay to keep sound shorter
    setTimeout(function() {sound.currentTime = 0;}, 2800);
}
function diceRoll() {
    var sound = document.getElementById("diceRoll");
    sound.play();
}
//function to make entire background color flash for a few seconds for win animation
function blink() {
    var body = document.getElementById("body");
    setTimeout(function() {body.style.backgroundColor = "#94f7ed";}, 100);
    setTimeout(function() {body.style.backgroundColor = "#94cef7";}, 200);
    setTimeout(function() {body.style.backgroundColor = "#94a6f7";}, 300);
    setTimeout(function() {body.style.backgroundColor = "#b094f7";}, 400);
    setTimeout(function() {body.style.backgroundColor = "#cc94f7";}, 500);
    setTimeout(function() {body.style.backgroundColor = "#8e94f7";}, 600);
    setTimeout(function() {body.style.backgroundColor = "#f794d9";}, 700);
    setTimeout(function() {body.style.backgroundColor = "#f73881";}, 800);
    setTimeout(function() {body.style.backgroundColor = "#c6034e";}, 900);
    setTimeout(function() {body.style.backgroundColor = "#e00202";}, 1000);
    setTimeout(function() {body.style.backgroundColor = "#ffffff";}, 1100);
}
//functions to find all win conditions!
//wincon squares 012
function checkWinCon1(info,squareArray) {
    var winDetected = "on";
    var winCon1 = [0,1,2];//iterate through growing array during gametime searching for existence of win
    for (var i in info) {
        if (info[i].charAt(0) =="0") {
            var match0Avatar = info[i].charAt(1);//only interested in recording avatar
        }
        if (info[i].charAt(0) == "1") {
            var match1Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "2") {
            var match2Avatar = info[i].charAt(1);
        }
    }
    //will trigger only if the match for index0, index1, and index2
    if (match0Avatar != undefined && match1Avatar != undefined && match2Avatar !=undefined) {
        if (match0Avatar == match1Avatar && match0Avatar == match2Avatar) {
            winDetected = "win";
            winner(winDetected,winCon1);
            return;
        }
    }
    winner(winDetected,winCon1); //winCon1 is the array of the win combo
}
//wincon squares 345
function checkWinCon2(info,squareArray) {
    var winDetected = "on";
    var winCon2 = [3,4,5];//iterate through growing array during gametime searching for existence of win
    for (var i in info) {
        if (info[i].charAt(0) =="3") {
            var match3Avatar = info[i].charAt(1);//only interested in recording avatar
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "5") {
            var match5Avatar = info[i].charAt(1);
        }
    }
    if (match3Avatar != undefined && match4Avatar != undefined && match5Avatar !=undefined) {
        if (match3Avatar == match4Avatar && match3Avatar == match5Avatar) {
            winDetected = "win";
        }
    }
    winner(winDetected,winCon2); //winCon1 is the array of the win combo
}
function checkWinCon3(info,squareArray) {
    var winCon3 = [6,7,8];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) == "6") {
            var match6Avatar = info[i].charAt(1);//only recording the avatar
        }
        if (info[i].charAt(0) == "7") {
			var match7Avatar = info[i].charAt(1);
		}
		if (info[i].charAt(0) == "8") {
			var match8Avatar = info[i].charAt(1);
		}
    }
    if (match6Avatar != undefined && match7Avatar != undefined && match8Avatar != undefined) {
        if (match6Avatar == match7Avatar && match6Avatar == match8Avatar) {
            winDetected = "win";
        }
    }
    winner(winDetected,winCon3);
}
//checking for squares 036
function checkWinCon4(info,squareArray) {
    var winCon4 = [0,3,6];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "3") {
            var match3Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "6") {
            var match6Avatar = info[i].charAt(1);
        }
    }
    if (match0Avatar != undefined && match3Avatar != undefined && match6Avatar != undefined) {
        if (match0Avatar == match3Avatar && match0Avatar == match6Avatar) {
            winDetected = "win";
        }
    }
    winner(winDetected,winCon4);
}
//checking for wincon squares 147

function checkWinCon5(info,squareArray) {
    var winCon5 = [1,4,7];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) =="1") {
            var match1Avatar = info[i].charAt(1);//only recording avatar
        }
        if (info[i].charAt(0)=="4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0)=="7") {
            var match7Avatar = info[i].charAt(1);
        }
    }
    if (match1Avatar != undefined && match4Avatar != undefined && match7Avatar != undefined) {//triggers only if there was match for index 1, 4, 7
        if (match1Avatar == match4Avatar && match1Avatar == match7Avatar) {
            winDetected ="win";
        }
    }
    winner(winDetected,winCon5);
}
//check for wincon squares 258
function checkWinCon6(info,squareArray) {
    var winCon6 = [2,5,8];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) =="2") {
            var match2Avatar = info[i].charAt(1);//only recording avatar
        }
        if (info[i].charAt(0)=="5") {
            var match5Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0)=="8") {
            var match8Avatar = info[i].charAt(1);
        }
    }
    if (match2Avatar != undefined && match5Avatar != undefined && match8Avatar != undefined) {
        if (match2Avatar == match5Avatar && match2Avatar == match8Avatar) {
            winDetected ="win";
        }
    }
    winner(winDetected,winCon6);
}
//check for wincon squares 642
function checkWinCon7(info,squareArray) {
    var winCon7 = [6,4,2];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) =="6") {
            var match6Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) =="4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) =="2") {
            var match2Avatar = info[i].charAt(1);
        }
    }
    if (match6Avatar != undefined && match4Avatar != undefined && match2Avatar != undefined) {
        if (match6Avatar == match4Avatar && match6Avatar == match2Avatar) {
            winDetected = "win";
        }
    }
    winner(winDetected,winCon7);
}
//check for wincon 048
function checkWinCon8(info,squareArray) {
    var winCon8 = [0,4,8];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) =="4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) =="8") {
            var match8Avatar = info[i].charAt(1);
        }
    }
    if (match0Avatar != undefined && match4Avatar != undefined && match8Avatar !=undefined) {
        if (match0Avatar == match4Avatar && match0Avatar == match8Avatar) {
            winDetected ="win";
        }
    }
    winner(winDetected,winCon8);
}

//This block of functions are for the click event of the corresponding square element
function square1Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {//if game is stopped no animation/set up of avatars to squares
        var square= "0"//identify the square this is animating
        var verdict = recordMoves(square);
        if (verdict == undefined) {//if verdict is empty the square is unoccupied
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[0];//paint avatar
            if (paintAvatar == "O") {
                animateO(selected);//call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected);//call function to animate X
            }
            //build array adding newly selected square and avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square2Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {//if game is stopped no animation/set up of avatars to squares
        var square= "1"//identify the square this is animating
        var verdict = recordMoves(square);
        if (verdict == undefined) {//if verdict is empty the square is unoccupied
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[0];//paint avatar
            if (paintAvatar == "O") {
                animateO(selected);//call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected);//call function to animate X
            }
            //build array adding newly selected square and avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square3Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {//if game is stopped no animation/set up of avatars to squares
        var square= "2"//identify the square this is animating
        var verdict = recordMoves(square);
        if (verdict == undefined) {//if verdict is empty the square is unoccupied
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[0];//paint avatar
            if (paintAvatar == "O") {
                animateO(selected);//call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected);//call function to animate X
            }
            //build array adding newly selected square and avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square4Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {//if game is stopped no animation/set up of avatars to squares
        var square= "3"//identify the square this is animating
        var verdict = recordMoves(square);
        if (verdict == undefined) {//if verdict is empty the square is unoccupied
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[0];//paint avatar
            if (paintAvatar == "O") {
                animateO(selected);//call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected);//call function to animate X
            }
            //build array adding newly selected square and avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square5Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {//if game is stopped no animation/set up of avatars to squares
        var square= "4"//identify the square this is animating
        var verdict = recordMoves(square);
        if (verdict == undefined) {//if verdict is empty the square is unoccupied
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[0];//paint avatar
            if (paintAvatar == "O") {
                animateO(selected);//call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected);//call function to animate X
            }
            //build array adding newly selected square and avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square6Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {//if game is stopped no animation/set up of avatars to squares
        var square= "5"//identify the square this is animating
        var verdict = recordMoves(square);
        if (verdict == undefined) {//if verdict is empty the square is unoccupied
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[0];//paint avatar
            if (paintAvatar == "O") {
                animateO(selected);//call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected);//call function to animate X
            }
            //build array adding newly selected square and avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square7Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {//if game is stopped no animation/set up of avatars to squares
        var square= "6"//identify the square this is animating
        var verdict = recordMoves(square);
        if (verdict == undefined) {//if verdict is empty the square is unoccupied
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[0];//paint avatar
            if (paintAvatar == "O") {
                animateO(selected);//call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected);//call function to animate X
            }
            //build array adding newly selected square and avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square8Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {//if game is stopped no animation/set up of avatars to squares
        var square= "7"//identify the square this is animating
        var verdict = recordMoves(square);
        if (verdict == undefined) {//if verdict is empty the square is unoccupied
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[0];//paint avatar
            if (paintAvatar == "O") {
                animateO(selected);//call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected);//call function to animate X
            }
            //build array adding newly selected square and avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square9Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {//if game is stopped no animation/set up of avatars to squares
        var square= "8"//identify the square this is animating
        var verdict = recordMoves(square);
        if (verdict == undefined) {//if verdict is empty the square is unoccupied
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[0];//paint avatar
            if (paintAvatar == "O") {
                animateO(selected);//call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected);//call function to animate X
            }
            //build array adding newly selected square and avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
//function to perform animation of O avatar
function animateO(selected) {
    selected.style.transform = (selected.style.transform == "translateY(0%)" || null) ? "translateY(0%)" : "translateY(0%)";
}
//function to perform animation of X avatar
function animateX(selected) {
    selected.style.transform = (selected.style.transform == "translateY(-100%)" || null) ? "translateY(0%)" : "translateY(-100%)";
}