var wordList = ["space", "planet", "sun", "earth", "asteroid", "star"];
var wins = 0;
var guesses = 12;
var result=[];
var input="";
var lettersGuessed="";
var proceed = false;
var randomIndex;
var systemChoice;
var word;

/* Generating random system choice and initialize the result[] with '-'*/
wordGen();

/*--On key up event--*/
document.onkeyup = function(event) {
	input = (event.key).toLowerCase();
	proceed = checkLetter(event.keyCode);
	if(proceed){
		if(!alreadyGuessed(lettersGuessed, input)){
			lettersGuessed+=input;
			if(guesses>0){
				findChar(input,word,result);
				if(result.toString() === word.toString()){
					wins++;
					playMusic("success");
					wordGen();
					lettersGuessed="";
					guesses = 12;
				}
			}
			else{
				alert("chance over");
				playMusic("failure");
				wordGen();
				lettersGuessed="";
				guesses = 12;
			}
		}
		else
			alert("Letter already guessed")
	}
	var html = "<p> Wins: " + wins +"</p>"+"<br>"+
	"<p> Current Word : " + result.join("") + "</p>" + "<br>"+
	"<p> Number of guesses remaining: "+ guesses+"</p>" + "<br>"+
	"<p> Letters already guessed : "+ lettersGuessed +  "</p>";
	/*--for the coressponding image display --*/
	var imghtml = "<img src=\"assets/images/"+ systemChoice +".jpg\""+ 
	"width=\"300\" height=\"300\">";
	/*--injecting into the html elements--*/			   
	document.querySelector("#main").innerHTML = html;
	document.querySelector("#image").innerHTML = imghtml;
}

/*--Generating random system choice---*/
function wordGen(){
	randomIndex = Math.floor((Math.random() * wordList.length));
	systemChoice = wordList[randomIndex];
	/*--Splitting the systemChoice string to char array for 
	comparison --*/
	word = systemChoice.split('');
	result=[];
	/*--initializing result [] with '-' equal to the number of char 
	of system choice--*/
	for (var i=0; i<systemChoice.length;i++){
		result[i] = '-';
	}
}

/*--Checking if user input char is present in the system choice --*/
function findChar(c, word, result){
	for(var i=0;i<word.length;i++){
		if(c== word[i]){
			result[i] = c;
		}
	}
	guesses--;
	return result;
}

/*--Checking if the user input is an alphabet --*/
function checkLetter(keyCode)  
{  
	if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32){
		alert("enter valid alphabet") 
		return false;
	}
	return true;
}  

/*check if the letter is already guessed--*/
function alreadyGuessed(str, c){
	if(str.indexOf(c) > -1){
		return true;
	}
	else{
		return false;
	}
}

/*--For game sounds--*/ 
function playMusic(musicType){
	var music = document.getElementById(musicType);
	music.play();
}