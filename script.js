//card pairs
const cards = [
    "♔", "♕", "♖", "♗", "♘", "♙",
    "♔", "♕", "♖", "♗", "♘", "♙"
];
let matched = [];
let selected = [];

// function to check the pairs cards
function checkCards(index1, index2) {
  if (cards[index1] === cards[index2]) {
    matched.push(index1, index2);
    console.log("Matched:", cards[index1], cards[index2]);
    return true;
  } else {
    console.log("Not matched:", cards[index1], cards[index2]);
    return false;
  }
}

// shuffle the cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


    


document.addEventListener("DOMContentLoaded", function () {
    
    const resetButton = document.querySelector("#resetButton");
    const cardDivs = document.querySelectorAll(".card");
    const winnerMessage = document.querySelector("#winner");
    const welcomepage = document.querySelector("#welcome-page");  
    const maingame = document.querySelector("#main-game");

    function resetGame(){
    matched = [];
    selected = [];
   cardDivs.forEach((card, index) => {
    card.textContent = "";
    card.style.backgroundImage = `url(${cardBackImage})`; // restore the back image
    card.style.backgroundSize = "cover";
    card.style.backgroundPosition = "center";
  });
        
    };

    resetButton.addEventListener("click", resetGame);

  shuffle(cards);

  const cardBackImage = "media/card-back.png";

  cardDivs.forEach((card, index) => {
    card.dataset.index = index;
    card.style.backgroundImage = `url(${cardBackImage})`;
    card.style.backgroundSize = "cover"; 
    card.style.backgroundPosition = "center";

    card.addEventListener("click", (e) => {
      const idx = parseInt(e.target.dataset.index);

      if (matched.includes(idx) || selected.includes(idx)) return;

      card.style.backgroundImage = "none";
      card.textContent = cards[idx];
      selected.push(idx);

      if (selected.length === 2) {
        const [i1, i2] = selected;

        if (!checkCards(i1, i2)) {
          setTimeout(() => {
            cardDivs[i1].style.backgroundImage = `url(${cardBackImage})`;
            cardDivs[i2].style.backgroundImage = `url(${cardBackImage})`;
            cardDivs[i1].textContent = "";
            cardDivs[i2].textContent = "";
          }, 800);
        }

        selected = [];

        // optional win check
        if (matched.length === cards.length) {
            winnerMessage.style.display = "block";
        setTimeout(() => {
                winnerMessage.style.display = "none";
            }, 10000);
        }
      }
    })
  });
  setTimeout(() => {
  document.getElementById('welcome-page').style.display = 'none';
  document.getElementById('main-game').style.display = 'flex';
}, 10000);
});