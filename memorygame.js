const generateTable = function(n, m){
    for (i = 0; i< n*m; i++){
        //console.log ("dodaje div");
        var div = document.createElement("div");
        document.getElementById ("main").appendChild(div);
    }
}

const cardsColor = ["purple", "purple", "yellow", "yellow", 
"green", "green", "white", "white", "navy", "navy", "red", "red", 
"magenta", "magenta", "cyan", "cyan", "orange", "orange"];



let cards = "";

const startTime = new Date().getTime();
//console.log(startTime)

//aktywny element 
let activeCard = "";
//zmienna przechowująca parę kart będąca tablicą
const activeCards = []; 


let gameResult = 0;

//funkcja clickCard, która będzie uruchamiana każdorazowo 
 //po kliknięciu w jeden kwadrat
const clickCard = function() {
    activeCard = this;

    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden");

//jeśli pierwsze klikniecie
if(activeCards.length === 0) {
        activeCards [0] = activeCard;
        console.log("1");
        return;
}

//jeśli drugie klikniecie
else {
    console.log("2");
    cards.forEach(card => card.removeEventListener("click", clickCard))
    activeCards[1] = activeCard;
    //console.log(activeCards)
    
    setTimeout(function (){

        if(activeCards[0].className === activeCards[1].className ){
            console.log('wygrana')
            activeCards.forEach(card => card.classList.add("off"))
            gameResult++;
            cards = cards.filter(card => !card.classList.contains("off"));
            if(gameResult == gamePairs) {
                const endTime = new Date().getTime();
                const gameTime = (endTime - startTime)/1000
                alert(`Brawo! Twój wynik to: ${gameTime} sekund`)
                location.reload();
            } 
        }

        else{
            console.log("przegrana")
            activeCards.forEach(card => card.classList.add("hidden"))
        }
        activeCard ="";
        activeCards.length = 0;
        cards.forEach(card => card.addEventListener("click", clickCard))
    }, 500)

    }
    

};
//tworze funkcje nadajace kolory wywolanym divom
const init = function(){
    generateTable(3,6);
    cards = document.querySelectorAll ("div");
    cards = [...cards]; //tablica z wszystkimi divami
    //cards = [rozwija listę osiemnastu div i zamienia je na tablice]
    gamePairs = cards.length/2;

    cards.forEach(card =>{
        const position = Math.floor(Math.random() *
        cardsColor.length); //wulosuje 0,12,3,4,...17
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position,1);
    })

    setTimeout(function(){
        cards.forEach(card =>{
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
    }, 2000)
}

window.onload = function () {
    init();
};

