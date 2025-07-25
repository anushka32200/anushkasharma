const output=document.getElementById("output");
const boardEl=document.getElementById("board");
const gamestatus=document.getElementById("gamestatus");
const tictactoe = document.getElementById("tictactoe");
const ludodiv = document.getElementById("ludo");
const stonepaperscissordiv= document.getElementById("stonepaperscissor")
const diceresult = document.getElementById("diceresult")
const stonepaperscissorresult=document.getElementById("stonepaperscissor");

let currentplayer="anushka";
let board=array(9).fill(null);


function startlistening(){
    const recognisation=new(window.SpeechRecognition|| window.webkitspeechrecognisation)();
    recognisation.lang="hi-IN";
    recognisation.start();

}

recognisation.onresult=(event)=>{
    const command=event.result[0][0].transcript.tolowercase();
    output.innertext='you said:${command}';
    handlecommand(command);
    
};

recognisation.onerror=(err)=>{
    output.innertext="error:"+err.error;

};





function speak(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "hi-IN";
  synth.speak(utter);
}

function handleCommand(cmd) {
  hideAll()


    if (cmd.includes("tic tac toe")) {
    speak("Tic Tac Toe khelna start kar rahe hain.");
    startTicTacToe();
  } else if (cmd.includes("ludo")) {
    speak("Ludo dice roll karte hain.");
    startLudo();
  } else if (cmd.includes("stone paper scissors")) {
    speak(" chalo Stone Paper Scissors khelte hain.");
    startSPS();
  } else if (cmd.includes("tum kya kar rahe ho")) {
    speak("Main aapka intezaar kar raha hoon.");
  } else {
    speak("Yeh command mujhe samajh nahi aayi.");
  }
}

function hideall() {
    tictactoediv.classlist.add("hidden");
    ludodiv.classlist.add("hidden");
    stonepaperscissordiv.classlist.add("hidden");
    
}

function startTicTacToe() {
  ticTacToeDiv.classList.remove("hidden");
  board = Array(9).fill(null);
  currentPlayer = "anushka";
  renderBoard();
  gameStatus.innerText = "your turn (anushka )";
}

function renderBoard() {
  boardEl.innerHTML = "";
  board.forEach((cell, index) => {
    const cellEl = document.createElement("div");
    cellEl.className = "cell";
    cellEl.innerText = cell ? cell : "";
    cellEl.addEventListener("click", () => handleMove(index));
    boardEl.appendChild(cellEl);
  });
}

function handleMove(index) {
  if (board[index] || checkWinner()) return;
  board[index] = currentPlayer;
  renderBoard();

  const winner = checkWinner();
  if (winner) {
    gamestatus.innertext='${winner}jeet gaya!';
    speak('${winner}jeet gaya');

  }else if (board.every(cell=>cell)){
    gamestatus.innertext="match draw ho gya";
    speak("match draw ho gya.");
  }else{
      currentPlayer = currentPlayer === "anushka" ? "O" : "anushka";
    gameStatus.innerText = '${currentPlayer === "anushka" ? "Aapki" : "Meri"}  aapkibaari (${currentPlayer})';
    if (currentPlayer === "O") {
      setTimeout(aiMove, 1000);
    }
}
}

  function aiMove() {
  const empty = board.map((v, i) => v ? null : i).filter(i => i !== null);
  const move = empty[Math.floor(Math.random() * empty.length)];
  handleMove(move);
}

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a, b, c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  return null;
}

function startLudo() {
  ludoDiv.classList.remove("hidden");
}

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceResult.innerText =' aapkadicenumberhai: ${roll}';
  speak('Aapkadicenumberhai ${roll}');
}


function startSPS() {
  spsDiv.classList.remove("hidden");
}

function playStonePaperScissors() {
  const options = ["stone", "paper", "scissors"];
  const user = options[Math.floor(Math.random() * 3)];
  const ai = options[Math.floor(Math.random() * 3)];

  let result = "";
  if (user === ai) result = "Match draw!";
  else if (
    (user === "stone" && ai === "scissors") ||
    (user === "paper" && ai === "stone") ||
    (user === "scissors" && ai === "paper")
  ) result = "Aap jeet gaye!";
  else result = "Main jeet gaya!";

stonepaperscissorresult.innertext='aap:${user},javis:${ai}→${result}';
speak('aapne chuna ${user},maina chuna ${ai},${result}');
}