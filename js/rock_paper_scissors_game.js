const RoPaSci = ["Rock", "Paper", "Scissors"];

function getComputerChoice() {
   let choice = Math.floor(Math.random() * 3); // Rand. int 0 to 2, for Rock, Paper or Scissors
   return RoPaSci[choice];
}

function getPlayerChoice() {
   let choice = prompt("Rock, paper or scissors?");
   choice.toLowerCase();
   while (true) {
      if (choice === 'rock') {
         choice = 0;
         break;
      }
      else if (choice === 'paper') {
         choice = 1;
         break;
      }
      else if (choice === 'scissors') {
         choice = 2;
         break;
      }
      else {
         choice = prompt("Please, enter 'rock', 'paper' or 'scissors', don't invent your own game.");
         choice.toLowerCase();
      }
   }
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

function gameCycle() {
   let winner = whoWins(getComputerChoice(), getPlayerChoice());
   let players = ["Computer", "Player"];
   while (winner === 2) {
      winner = whoWins(getComputerChoice(), getPlayerChoice());
   }
   return players[winner];
}

function fiveRoundGame() {
   let player = 0;
   let computer = 0;
   for (let i = 0; i < 5; i++) {
      let winner = gameCycle();
      if (winner === "Player")
         player++;
      else
         computer++;
   }
   
   if (player > computer)
      console.log("Player wins with " + player + " out of 5!");
   else 
      console.log("Computer wins with " + computer + " out of 5!");
}

fiveRoundGame();
//console.log("Rock Paper Scissors Game V1.0");
//console.log(gameCycle() + " wins!");