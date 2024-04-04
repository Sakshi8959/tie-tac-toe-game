let boxes = Array.from(document.getElementsByClassName("box"));
let resetBtn = document.querySelector("#reset-game");
let newGameBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // player X, player O
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  gameOver = false;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("Winner", pos1val);
        showWinner(pos1val);
        gameOver = true;
        return;
      }
    }
  }

  // Check for a draw (no empty boxes left)
  if (boxes.every((box) => box.innerText !== "") && !gameOver) {
    console.log("It's a draw!");
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameOver && box.innerText === "") {
      box.innerText = turnO ? "O" : "X";
      turnO = !turnO;
      checkWinner();
    }
  });
});

newGameBtn.addEventListener("click", () => {
  resetGame();
});

resetBtn.addEventListener("click", () => {
  resetGame();
});
