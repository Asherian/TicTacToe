//Javascript for TicTacToe game - starts pg 250

window.onload = function() {watch()};
function watch() {
    var btn= document.getElementById("btnStop");
    btnDisabled(btn); //disable stop button until game started.
}

//function to roll the random number twice - aka the dice roll
function rollForTurn() {
    var xArray = [];
    var ranNum = "";
    var minium = 1;
    var maximum = 11;
    var first = "";
    var txt1 = "";
    for (var i=0; i < 1; i++) {
        //random whole number between 1-10.
        ranNum = Math.floor(Math.random()*(maximum-minimum)+minimum);
        xArray.push(ranNum);
    }
    diceRoll(); //play dice sound during the roll
    for (i=0;i<xArray.length;i++) {
        var result= i+ 1;
        var pOne = xArray[0];
        var pTwo = xArray[1];
        if (pOne == pTwo) { //rigging roll on tie to avoid bug in code.boxLeft
            pOne=1;
            pTwo=2;
        }
        txt1 = "Player 1 rolled ["+pOne+"]<br>";
        writeMsg(txt1);
        txt1 = txt1 + "Player 2 rolled ["+pTwo+"]<br>";
        setTimeout(function() {writeMsg(txt1);}, 1000); //set time delay
    }
//determine  and concatenate string showing player won.boxLeft
    if (pOne > pTWo) {
        first = "Player 1"
        setTimeout(function() {txt1 = txt1 +"Player 1 wins, please choose a square.";}, 2000);
    } else if (pOne < pTwo) {
        first = "Player 2";
        setTimeout(function() {txt1 = txt1+"Player 2 wins, please choose a square.";}, 2000);
    }
    // pass which player won the roll
    return first;
}

//Initiate the game, roll for turn and determine the active player.
function startGame() {
    var xTurn= 0;
    activePlayer = rollForTurn();
    if (activePlayer =="") {//if it was a tie then reroll (it can"t tie due to "fix" above
        activePlayer= rollForTurn();    
    }
    setTimeout(function() {hideGameMsg();}, 4000);

    //assign state of the control buttons.
    var btn = document.getElementById("btnStart");
    btnDisabled(btn); //disable start button since game is now afoots.
    var btn= docuemnt.getElementById("btnStop");
    stopEnabled(btn); //enables the stop button since now in session.
}

//function styles game buttons while disabled - 
function btnDisabled(btn) {
    btn.style.color="fff";
    btn.style.border="2px solid rgb(153,153,102)";
    btn.style.backgroundColor= "rgb(214,214,194)";
    btn.disabled = true;
}
//function styles game buttons while disabled 2
function stopEnabled(btn) {
    btn.style.color="#fff";
    btn.style.border="2px solid rgb(204,0,0)";
    btn.style.backgroundColor="rgb(255,51,51)";
    btn.disabled= false;
}
function startEnabled(btn) {
    btn.style.color="#FFF";
    btn.style.border = "2px solid rgb(204,0,0)";
    btn.style.backgroundColor= "rgb(255,51,51)";
    btn.disabled = false;
}// when user stops the game - will reset game.
function stopGame() {
    hideGameMsg();
    var btn= document.getElementById("btnStart");
    startEnabeld(btn); //enable the start button.
    var btn= document.getElementById("btnStop");
    btnDisabled(btn); //disable the stop button.
    var showPlayer = document.getElementById("showPlayer")
    showPlayer.innerHTML = "Game Stopped.";
    showPlayer.style.color="red";
}
//reset all squares to blank state.
var arrayO = document.getElementsByClassName("O");
var arrayX = document.getElementsByClassName("X");
for (var i=0; i<arrayO.length;i++) {
    arrayO[i].style.transform = "translateY(-100%)";
}
for (var i=0;i<arrayX.length;i++) {
    arrayX[i].style.transform = "translateY(100%)";
}
//clears the running log of all game moves:
document.getElementById("boardState").innerHTML = "";

function showGameMsg() {
    document.getElementById("gameMsgBox").style.disaply = "block";
}

function hideGameMsg() {
    clearMsg() //clear text from message console
    document.getElementById("gameMsg").innerHTML = txt;
}
//function is for player config panel and checks proposed avatar assigns
function saveSettings() {
    var p1Index = document.getElementById("player1").selectedIndex;
    var p1Selected = document.getElementById("player1").options;
    var p2Index = document.getElementById("player2").selctedIndex;
    var p2Selected = document.getElementById("player2").options;
    if (p1Selected[p1Index].text == p2Selected[p2Index].text) {
        alert("Error - Player 1 and Player 2 cannot both be assigned as: "+p1Selected[p1Index].text)
    }
    else {
        document.getElementById("p1Display").innerHTML=p1Selected[p1Index].text;
        document.getElementById("p2Display").innerHTML=p2Selected[p2Index].text;
    }
}
//currently assigned avatar for each player
function getAvatars() {
    var p1Avatar = document.getElementById("p1Display").innerHTML;
    var p2Avatar = docuemnt.getElementById("p2Display").innerHTML;
    var avatarArray = [p1Avatar,p2Avatar];
    return avatarArray;
}
//function to return the active player"s avatar
function determineAvatar() {
    var avatarArray= getAvatars();//return an array of both avatars.
    var active = document.getElementById("showPlayer").innerHTML;
    p1Avatar = avatarArray[0];
    p2Avatar = avatarArray[1];
    if (active == "Player 1") {
        var paintAvatar = p1Avatar;
    }
    else if (active == "Player 2") {
        var paintAvatar = p2Avatar;
    }
    return paintAvatar;
}
//change active player over to other player
function avatarPlaced() {
    var parseText = document.getElementsByID("gameMsg").innerHTML;
    var showPlayer = document.getElementById("showPlayer"); //select the current element to memory check if there is a winner, if there is then don't continue the game
    if (parseText == "That's three in a row, Player 1 wins!" || parseText == "That's three in a row, Player 2 wins!") {
        showPlayer.innerHTML = "Game Stopped";
        showPlayer.style.color="red";
    }
    activePlayer = showPlayer.innerHTML;//get current player from element
    if (activePlayer == "Player 1") {
        showPlayer.innerHTML = "Player 2";
    }
    else {
        showPlayer.innerHTML = "Player 1";
    }
    check4Tie(); //call the function to make sure if all squares filled but no winner
}
//functino to get current array of board and check if move is valid
function check(info,square) {
    for (var i in info) {
        var tempInfo = info[i].charAt(0);//comparing index of square
        if (tempInfo == square) {
            return tempInfo;
        }
    }
}

//as squares are selected function checks if this square has already been assigned or not previously. Record new square with current assigned avatar.
function recordMoves(square) {
    var proposedMove = square;
    var boardState = document.getElementById("boardState").innerHTML;
    var info = boardState.split(","); //separate the string by command to create array
    verdict = check(info,square);//call function to check if proposed suqare unused.
    return verdict;
}
//function to get list of previous moves, then concatenate to current move.
function recordMove(currentMove) {
    var target = document.getElementById("boardState");
    var info = target.innerHTML;//raw array with squares and avatars
    info = info.substring(1);//remove leading comma
    info = info.split(",");//separate the string by commas.
    info.sort()
        for (var i in info) {
            squareArray.push(info[i].charAt(0));//new array with only squares no avatars.
        }
        //call following array of functions to check for possible win-cons
        checkWinCon1(info,squareArray);
        checkWinCon2(info,squareArray);
        checkWinCon3(info,squareArray);
        checkWinCon4(info,squareArray);
        checkWinCon5(info,squareArray);
        checkWinCon6(info,squareArray);
        checkWinCon7(info,squareArray);
        checkWinCon8(info,squareArray);
        //console.log("New CHECK:"+document.getElementById("GameMsg").innerHTML); --leaving comment in place from video as reference
        check4Tie();
    }

//functino to check board state for ties and act on it if so
function check4Tie() {
    var boardState = document.getElementById("boardState").innerHTML;
    boardState = boardState.substring(1);//remove leading comma
    boardState = boardState.split(",");//separate string by comma into array
    var check= document.getElementById("gameMsg").innerHTML;
    if(boardState.length >= 9 && check != "That's three in a row, Player 1 wins!" && check != "That's three in a row, Player 2 wins!") {
        var txt1 = "Oh no! Nobody wins, it was a tie.";
        tieSound();//play the tie sound
        writeMsg(txt1);
        setTimeout(function() {stopGame();}, 3000);
    }
}
//when a win is detected corresponding function will call this function to produce the winning process of the game
function winner(winDetected,winCon) {
    if (winDetected =="win") {
        var showme = winDetected;
        var activePlayer = document.getElementById("showPlayer").innerHTML;
        var txt2 = "That's three in a row, "+activePlayer+" wins!";
        writeMsg(txt2);
        var btn= document.getElementById("btnStart");
        startEnabled(btn);//enable the start button now that the game is over
        var btn = document.getElementById("showPlayer").innerHTML="Game Stopped";
        glowBoard(winCon); //call function to make gameboard pulse with color
    }
}
//function to make all winning squares light up
function glowBoard(pos) {
    var index0 = pos[0];
    var index1 = pos[1];
    var index2 = pos[2];
    var squares = document.getElementsByClassName("square")
    for (var i=0;i<squares.length;i++) {
        if (i ==index0) {
            var bg1 = squares[i];
            blink();
            winSound();
            setTimeout(function() {bg1.style.backgroundColor = "rgb(244,179,66)";}, 100);
            setTimeout(function() {bg1.style.backgroundColor="rgb(244,238,66)";}, 200);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(244,179,66)";}, 300);
            setTimeout(function() {bg1.style.backgroundColor="rgb(244,238,66)";}, 400);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(244,179,66)";}, 500);
            setTimeout(function() {bg1.style.backgroundColor="rgb(244,238,66)";}, 600);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(244,179,66)";}, 700);
            setTimeout(function() {bg1.style.backgroundColor="rgb(244,238,66)";}, 800);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(244,179,66)";}, 900);
            setTimeout(function() {bg1.style.backgroundColor="rgb(244,238,66)";}, 1000);
            setTimeout(function() {bg1.style.backgroundColor="#d7f3f7";}, 1000);
        } else if (i== index1) {
            var bg2 = squares[i];
            setTimeout(function() {bg2.style.backgroundColor = "rgb(66,244,235)";}, 100);
            setTimeout(function() {bg2.style.backgroundColor="rgb(122,244,66)";}, 200);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(66,244,235)";}, 300);
            setTimeout(function() {bg2.style.backgroundColor="rgb(122,244,66)";}, 400);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(66,244,235)";}, 500);
            setTimeout(function() {bg2.style.backgroundColor="rgb(122,244,66)";}, 600);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(66,244,235)";}, 700);
            setTimeout(function() {bg2.style.backgroundColor="rgb(122,244,66)";}, 800);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(66,244,235)";},900);
            setTimeout(function() {bg2.style.backgroundColor="rgb(122,244,66)";}, 1000);
            setTimeout(function() {bg2.style.backgroundColor="#d7f3f7";}, 1000);
        } else if (i == index2) {
            var bg3 = squares[i];
            setTimeout(function() {bg3.style.backgroundColor="#00ff00";}, 100);
            setTimeout(function() {bg3.style.backgroundColor="#ff00ff";}, 200);
            setTimeout(function() {bg3.style.backgroundColor="#00ff00";}, 300);
            setTimeout(function() {bg3.style.backgroundColor="#ff00ff";}, 400);
            setTimeout(function() {bg3.style.backgroundColor="#00ff00";}, 500);
            setTimeout(function() {bg3.style.backgroundColor="#ff00ff";}, 600);
            setTimeout(function() {bg3.style.backgroundColor="#00ff00";}, 700);
            setTimeout(function() {bg3.style.backgroundColor="#ff00ff";}, 800);
            setTimeout(function() {bg3.style.backgroundColor="#00ff00";}, 900);
            setTimeout(function() {bg3.style.backgroundColor="#ff00ff";}, 1000);
            setTimeout(function() {bg3.style.backgroundColor="#d7f3f7";}, 1000);
        }
    }
    setTimeout(function() {stopGame();}, 1200);
} 

//sound functions to follow
function squareSound() {
    var sound = document.getElementById("placeAvatar");
    sound.play();
    setTimeout(function() {sound.onpause();}, 400);//add delay to keep sound short
    setTimeout(function() {sound.currentTime = 0;}, 500);
}
function tieSound() {
    var sound=document.getElementById("tieGame");
    var check= document.getElementById("gameMsg").innerHTML;
    setTimeout(function() {sound.play();}, 500);
}
function winSound() {
    var sound = document.getElementById("winGame");
    setTimeout(function() {sound.play();}, 500);
    setTimeout(function() {sound.pause();}, 2700);//add delay to keep sound short
    setTimeout(function() {sound.currentTime=0;}, 2800);
}
function diceRoll() {
    var sound=document.getElementById("diceRoll");
    sound.play();
}
function blink() {
    var body=document.getElementById("body");
    setTimeout(function() {body.style.backgroundColor = "#94f7ed";}, 100);
    setTimeout(function() {body.style.backgroundColor = "#94cef7";}, 200);
    setTimeout(function() {body.style.backgroundColor = "#94a6f7";}, 300);
    setTimeout(function() {body.style.backgroundColor = "#b094f7";}, 400);
    setTimeout(function() {body.style.backgroundColor = "#cc94f7";}, 500);
    setTimeout(function() {body.style.backgroundColor = "#e894f7";}, 600);
    setTimeout(function() {body.style.backgroundColor = "#f794d9";}, 700);
    setTimeout(function() {body.style.backgroundColor = "#f73881";}, 800);
    setTimeout(function() {body.style.backgroundColor = "#c6034e";}, 900);
    setTimeout(function() {body.style.backgroundColor = "#e00202";}, 1000);
    setTimeout(function() {body.style.backgroundColor = "#fff";}, 1100);
}
//Functions to check win conditions
//Checks wincon 012
function checkWinCon1(info,squareAarray) {
    var winDetected = "on";
    var winCon1 = [0,1,2];
    //iterate through growing array during gametime, search for index 0, 1 and 2, and once they appear in the array record their avatars and compare all 3 for wincon
    for (var i in info) {
        if (info[i].charAt(0) =="0") {
            var match0Avatar = info[i].charAt(1);//only in recording avatar
        }
        if (info[i].charAt(0) =="1") {
            var match1Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) =="2") {
            var match2Avatar = info[i].charAt(1);
        }
    }
    //this will trigger only if there is a match for index0, 1 and 2
    if (match0Avatar != undefined && match1Avatar != undefined && match2Avatar != undefined) {
        if (match0Avatar == match1Avatar && match0Avatar == match2Avatar) {
            winDetected = "win"; //flag will pass when win has been detected
            winner(winDetected,winCon1);
            return;
        }
    }
    winner(winDetected,winCon1); //winCon1 is the array of win combo
}
//checking win on squares 345
function checkWinCon2(info,squareArray) {
    var winCon2 = [3,4,5];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) =="3") {
            var match3Avatar = info[i].charAt(1);//only recording avatar
        }
        if (info[i].charAt(0)=="4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0)=="5") {
            var match5Avatar = info[i].charAt(1);
        }
    }
    if (match3Avatar != undefined && match4Avatar != undefined && match5Avatar != undefined) {//triggers only if there was match for index 3, 4, 5
        if (match3Avatar == match4Avatar && match3Avatar == match5Avatar) {
            winDetected ="win";
        }
    }
    winner(winDetected,winCon2);
}
//check for wincon squares 678
function checkWinCon3(info,squareArray) {
    var winCon2 = [6,7,8];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) =="6") {
            var match6Avatar = info[i].charAt(1);//only recording avatar
        }
        if (info[i].charAt(0)=="7") {
            var match7Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0)=="8") {
            var match8Avatar = info[i].charAt(1);
        }
    }
    if (match6Avatar != undefined && match7Avatar != undefined && match8Avatar != undefined) {//triggers only if there was match for index 3, 4, 5
        if (match6Avatar == match7Avatar && match6Avatar == match8Avatar) {
            winDetected ="win";
        }
    }
    winner(winDetected,winCon3);
}
//check wincon squares 036
function checkWinCon4(info,squareArray) {
    var winCon2 = [0,3,6];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) =="0") {
            var match0Avatar = info[i].charAt(1);//only recording avatar
        }
        if (info[i].charAt(0)=="3") {
            var match3Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0)=="6") {
            var match6Avatar = info[i].charAt(1);
        }
    }
    if (match0Avatar != undefined && match3Avatar != undefined && match6Avatar != undefined) {//triggers only if there was match for index 0, 3, 6
        if (match0Avatar == match3Avatar && match0Avatar == match6Avatar) {
            winDetected ="win";
        }
    }
    winner(winDetected,winCon4);
}
//check for wincon squares 147
function checkWinCon5(info,squareArray) {
    var winCon2 = [1,4,7];
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
    var winCon2 = [2,5,8];
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
//functions for clicks on corresponding square elements
function square1Animate() {
    var activatePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") { //if game has not yet started prevents avatar placement
        var square = "0";//identify square selected
        var verdict = recordMoves(square);
        if (verdict == undefined) { //if verdict is empty than the square is unoccupied
            var paintAvatar = determineAvatar(); //get the correct avatar
            var selcted = document.getElementsByClassName(paintAvatar)[0];//paint avatar
            if (paintAvatar =="O") {//change all to ternary statements instead
                AnimationEffect(selected);//call function to animate o
            } else if (paintAvatar == "X") {
                animateX(selected);//call function to pull X
            }
            //build new array adding newly selected square and assigned avatar
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();//call functiont o check if current move completes a wincon
            avatarPlaced(square,paintAvatar);//end turn and pass to next player
            squareSound();//play game sound
        }
    }
}
function square2Animate() {
    var activePlayer = document.getElementsByID("showPlayer").innerHTML;
    if (activatePlayer !="Game Stopped") {
        var square = "1";
        var verdict = recordMoves(square);
        if (verdict ==undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[1];
            if (paintAvatar =="O") {
                animateO(selected);
            } else if (paintAvatar == "X") {
                animateX(selected);
            }
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square3Animate() {
    var activatePlayer = document.getElementById("showPlayer").innerHTML;
    if (activatePlayer != "Game Stopped") {
        var square = "2";
        var verdict = recordMoves(square);
        if (verdict ==undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[2];
            if (paintAvatar =="O") {
                animateO(selected);
            } else if (paintAvatar =="X") {
                animateX(selected);
            }
        }
        var currentMove = ","+square+paintAvatar;
        recordMove(currentMove);
        checkForWinCon();
        avatarPlaced(square,paintAvatar);
        squareSound();
    }
}
function square4Animate() {
    var activatePlayer = document.getElementById("showPlayer").innerHTML;
    if (activatePlayer != "Game Stopped") {
        var square = "3";
        var verdict = recordMoves(square);
        if (verdict ==undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[3];
            if (paintAvatar =="O") {
                animateO(selected);
            } else if (paintAvatar =="X") {
                animateX(selected);
            }
        }
        var currentMove = ","+square+paintAvatar;
        recordMove(currentMove);
        checkForWinCon();
        avatarPlaced(square,paintAvatar);
        squareSound();
    }
}
function square5Animate() {
    var activatePlayer = document.getElementById("showPlayer").innerHTML;
    if (activatePlayer != "Game Stopped") {
        var square = "4";
        var verdict = recordMoves(square);
        if (verdict ==undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[4];
            if (paintAvatar =="O") {
                animateO(selected);
            } else if (paintAvatar =="X") {
                animateX(selected);
            }
        }
        var currentMove = ","+square+paintAvatar;
        recordMove(currentMove);
        checkForWinCon();
        avatarPlaced(square,paintAvatar);
        squareSound();
    }
}
function square6Animate() {
    var activatePlayer = document.getElementById("showPlayer").innerHTML;
    if (activatePlayer != "Game Stopped") {
        var square = "5";
        var verdict = recordMoves(square);
        if (verdict ==undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[5];
            if (paintAvatar =="O") {
                animateO(selected);
            } else if (paintAvatar =="X") {
                animateX(selected);
            }
        }
        var currentMove = ","+square+paintAvatar;
        recordMove(currentMove);
        checkForWinCon();
        avatarPlaced(square,paintAvatar);
        squareSound();
    }
}
function square7Animate() {
    var activatePlayer = document.getElementById("showPlayer").innerHTML;
    if (activatePlayer != "Game Stopped") {
        var square = "6";
        var verdict = recordMoves(square);
        if (verdict ==undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[6];
            if (paintAvatar =="O") {
                animateO(selected);
            } else if (paintAvatar =="X") {
                animateX(selected);
            }
        }
        var currentMove = ","+square+paintAvatar;
        recordMove(currentMove);
        checkForWinCon();
        avatarPlaced(square,paintAvatar);
        squareSound();
    }
}
function square8Animate() {
    var activatePlayer = document.getElementById("showPlayer").innerHTML;
    if (activatePlayer != "Game Stopped") {
        var square = "7";
        var verdict = recordMoves(square);
        if (verdict ==undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[7];
            if (paintAvatar =="O") {
                animateO(selected);
            } else if (paintAvatar =="X") {
                animateX(selected);
            }
        }
        var currentMove = ","+square+paintAvatar;
        recordMove(currentMove);
        checkForWinCon();
        avatarPlaced(square,paintAvatar);
        squareSound();
    }
}
function square9Animate() {
    var activatePlayer = document.getElementById("showPlayer").innerHTML;
    if (activatePlayer != "Game Stopped") {
        var square = "8";
        var verdict = recordMoves(square);
        if (verdict ==undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName(paintAvatar)[8];
            if (paintAvatar =="O") {
                animateO(selected);
            } else if (paintAvatar =="X") {
                animateX(selected);
            }
        }
        var currentMove = ","+square+paintAvatar;
        recordMove(currentMove);
        checkForWinCon();
        avatarPlaced(square,paintAvatar);
        squareSound();
    }
}
//function wil perform animation on O avatar
function animateO(selected) {
    selected.style.transform = (selected.style.transform == "translateY(0%)"||null) ? "translateY(0%)":"translateY(0%)";
}
//function will perform animation for X Avatar
function animateX(selecteD) {
    selected.style.transform = (selected.style.transform == "translateY(-100%)" ||null) ? "translateY(0%)":"translateY(-100%)";
}