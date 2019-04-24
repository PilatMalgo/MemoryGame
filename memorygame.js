const cardsColor = ["purple", "yellow", 
"green", "white","navy","red", 
"magenta","cyan", "orange"];

let cardsNumber; 

let cards = ""; 

const startTime = new Date().getTime();

let activeCard = "";

const activeCards = []; 

let gameResult = 0;

const init = function(x){
    cardsNumber = x; 
    const $container = document.getElementById("main");
    const chosenCards = chooseCards(shuffle(cardsColor), cardsNumber);
    const finalChosen = shuffle([...chosenCards, ...chosenCards])
    finalChosen.forEach((currentElement ) => {
        generateCard(currentElement, $container);
    })
    $container.addEventListener('click', boardClickManager);
}

function clickCard(activeCard) {

	if (!activeCard.classList.contains("off")){
		console.log("clickCard");
			

		activeCard.classList.remove("hidden");

		console.log(activeCard);
		
	
		if(activeCards.length === 0) {
				activeCards [0] = activeCard;
				console.log("1");
				return;
		}
		
		else {
			
			console.log("2");
			document.getElementById("main").removeEventListener("click", clickCard);
			activeCards[1] = activeCard;
			
		
			setTimeout(function (){
				if(activeCards[0].className === activeCards[1].className ){
					console.log('wygrana');
					
					activeCards.forEach(card => card.classList.add("off"))
					gameResult++;

					if (gameResult == cardsNumber) { 
						const endTime = new Date().getTime();
						const gameTime = (endTime - startTime) / 1000
						alert(`Great Job! Time: ${gameTime} sec`)
						
					}
				 }
				 
				else{
					console.log("przegrana")
					activeCards.forEach(card => card.classList.add("hidden"));
				}
					activeCards.forEach(card => card.classList.remove("visible"));
					activeCard ="";
					activeCards.length = 0;
					document.getElementById("main").addEventListener('click', boardClickManager);
				}, 500)
		}
		
	}		
};

function boardClickManager(event) {
    if(event.target.classList.contains('visible') || event.target.classList.contains('off') || activeCards.length > 1 ){
		console.log("active cards:"+activeCards.length);
        return;
    } else {
		event.target.classList.add("visible");
		clickCard(event.target);
    }
}

function generateCard(card, container) {
    var div = document.createElement("div");
	div.setAttribute("class", "hidden");
    div.classList.add(card);
    container.appendChild(div);
}

const generateTable = function(n, m){
    var cos = document.getElementById ("main");
    for (i = 0; i< n*m; i++){
        //console.log ("dodaje div");
        var div = document.createElement("div");
		div.setAttribute("class", "hidden");

        cos.appendChild(div);
    }
}

function chooseCards(array, number) {
    return array.splice(0, number);
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function start_game(e){
  
  var sel = document.getElementById("game_level");
  var level = sel.options[sel.selectedIndex];
	  
	
	var cardsNumber = 6;
	
	config = {easy: 3, medium: 6, hard: 9}
	cardsNumber = config[level.value]

	init(cardsNumber);
	  
	 
	
	  var menu = document.getElementById("menu");
	  menu.style.display = 'none';
}



window.onload = function () {	
	
	document.getElementById("start_game").addEventListener("click", function(){
		start_game();
	});
};

