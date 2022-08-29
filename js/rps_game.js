const RoPaSci = ["Rock", "Paper", "Scissors"];

const rock = document.querySelector('#rock');
rock.value = 'Rock';
const paper = document.querySelector('#paper');
paper.value = 'Paper';
const scissors = document.querySelector('#scissors');
scissors.value = 'Scissors';
const restart = document.querySelector('#restart');

const player_score = document.querySelector('.player .score');
const comp_score   = document.querySelector('.comp .score');

const player_choice = document.querySelector('.choice.player');
const comp_choice   = document.querySelector('.choice.comp');

const state_display = document.querySelector('.match-state');

const gameState = {
   playerScore : 0,
   cpuScore    : 0
};

gameInit();

rock.addEventListener('click', gameCycle);
paper.addEventListener('click', gameCycle);
scissors.addEventListener('click', gameCycle);
restart.addEventListener('click', gameInit);

function getComputerChoice() {
   let choice = Math.floor(Math.random() * 3); // Rand. int 0 to 2, for Rock, Paper or Scissors
   return RoPaSci[choice];
}

function whoWins(hand1, hand2) {
   let rock_paper = {"Rock" : 0, "Paper" : 1};
   let paper_scissors = {"Paper" : 0, "Scissors" : 1};
   let scissors_rock = {"Scissors" : 0, "Rock" : 1};

   if (hand1 === hand2)
      return 2;

   if (hand1 in rock_paper && hand2 in rock_paper) {
      hand1 = rock_paper[hand1];
      hand2 = rock_paper[hand2];
   }
   else if (hand1 in paper_scissors && hand2 in paper_scissors) {
      hand1 = paper_scissors[hand1];
      hand2 = paper_scissors[hand2];
   }
   else {
      hand1 = scissors_rock[hand1];
      hand2 = scissors_rock[hand2];
   }
   if (hand1 < hand2)
      return 1;
   else
      return 0;
}

function gameInit() {
   gameState.playerScore = 0;
   gameState.cpuScore  = 0;
   updateScores();
   clearDeck();
}

function flashState(state) {
   state_display.textContent = state.msg;
   state_display.style.color = state.color;
   state_display.style.visibility = 'visible';
}

function clearDeck() {
   player_choice.style.visibility = 'hidden';
   comp_choice.style.visibility   = 'hidden';
   state_display.style.visibility = 'hidden';
}

function updateScores() {
   player_score.textContent = gameState.playerScore;
   comp_score.textContent = gameState.cpuScore;
}

function gameCycle(evt) {
   const plrChoice = evt.currentTarget.value;
   const cpuChoice = getComputerChoice();
   
   player_choice.textContent = plrChoice;
   player_choice.style.visibility = 'visible';
   comp_choice.textContent   = cpuChoice;
   comp_choice.style.visibility   = 'visible';
   switch (whoWins(plrChoice, cpuChoice)) {
      case 0: { // player wins
         flashState({msg: 'YOU WIN!', color: '#00e600'});
         gameState.playerScore++;
         updateScores();
         break;
      }
      case 1: { // computer wins
         flashState({msg: 'YOU LOSE!', color: '#e60000'});
         gameState.cpuScore++;
         updateScores();
         break;
      }
      case 2: { // tie
         flashState({msg: 'TIED!', color: '#e6e6e6'});
         break;
      }
      default: {
         console.log('Something went very wrong, winner is larger than 2!');
      }
   }
}