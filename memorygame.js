const cardsColor = ["purple", "yellow", 
"green", "white","navy","red", 
"magenta","cyan", "orange"];

let cardsNumber;

let cards = "";

const startTime = new Date().getTime();
//console.log(startTime)

//aktywny element 
let activeCard = "";
//zmienna przechowująca parę kart będąca tablicą
const activeCards = []; 

let gameResult = 0;

//tworze funkcje nadajace kolory wywolanym divom
const init = function(x){
    cardsNumber = x;
    const $container = document.getElementById ("main")
    const chosenCards = chooseCards(shuffle(cardsColor), cardsNumber);
    const finalChosen = shuffle([...chosenCards, ...chosenCards])
    finalChosen.forEach((currentElement ) => {
        generateCard(currentElement, $container);
    })
    $container.addEventListener('click', boardClickManager);


    // generateTable(3,6);
    // cards = document.querySelectorAll ("div");
    // cards = [...cards]; //tablica z wszystkimi divami
    // //cards = [rozwija listę osiemnastu div i zamienia je na tablice]
    // gamePairs = cards.length/2;

    // cards.forEach(card =>{

    // })

    //  setTimeout(function(){
    //      cards.forEach(card =>{
    //        card.classList.add("hidden")
    //       card.addEventListener("click", clickCard)
    //      })
    //  }, 2000)
}

function boardClickManager(event) {

    if(event.target.classList.contains('matched') || "visible"){
        return;
    } else {
        console.log(event);
    }
}

function generateCard(card, container) {
    var div = document.createElement("div");
    div.classList.add(card);

    container.appendChild(div);
}

const generateTable = function(n, m){
    var cos = document.getElementById ("main");
    for (i = 0; i< n*m; i++){
        //console.log ("dodaje div");
        var div = document.createElement("div");
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

window.onload = function () {
    init(20);
};

