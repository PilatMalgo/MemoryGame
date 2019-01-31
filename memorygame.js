const cardsColor = ["purple", "purple", "yellow", "yellow", 
"green", "green", "white", "white", "black", "black", "red", "red", 
"magenta", "magenta", "cyan", "cyan", "orange", "orange"];

let cards = document.querySelectorAll ("div")
cards = [...cards]; //tablica z wszystkimi divami
//cards = [rozwija listę osiemnastu div i zamienia je na tablice]

//tworze funkcje nadajace kolory wywolanym divom
const init = function(){
    cards.forEach(function(card){
        const position = Math.floor(Math.random() *
        cardsColor.length); //wulosuje 0,12,3,4,...17
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position,1);
    })
}

init()
