var wordList = ["space", "planet", "sun", "earth", "asteroid", "star"];
var wins = 0;
var guesses = 12;
var result=[];
var input="";
var inputArr=[];
var proceed = false;
var randomIndex;
var systemChoice;
var word;

/* Generating random system choice */
wordGen();

/*On key press*/
document.onkeyup = function(event) {
	input = (event.key).toLowerCase();
	proceed = checkLetter(event.keyCode);
	if(proceed){
		inputArr+=input;
		if(guesses>0){
			findChar(input,word,result);
			if(result.toString() === word.toString()){
				wins++;
				playMusic("success");
				wordGen();
				inputArr="";
				guesses = 12;
			}
		}
		else{
			alert("chance over");
			playMusic("failure");
			wordGen();
			inputArr="";
			guesses = 12;
		}
	}
	var html = "<p> Wins: " + wins +"</p>"+
	"<p> Current Word : " + result.join("") + "</p>" +
	"<p> Number of guesses remaining: "+ guesses+"</p>" +
	"<p> Letters already guessed : "+ inputArr +  "</p>";
	var imghtml = "<img src=\"assets/images/"+ systemChoice +".jpg\""+ "width=\"300\" height=\"300\">";
	document.querySelector("#main").innerHTML = html;
	document.querySelector("#image").innerHTML = imghtml;
}

/*--Generating random system choice---*/
function wordGen(){
	randomIndex = Math.floor((Math.random() * wordList.length));
	systemChoice = wordList[randomIndex];
	word = systemChoice.split('');
	result=[];
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

/*--For game sounds--*/ 
function playMusic(musicType){
	var music = document.getElementById(musicType);
	music.play();

}