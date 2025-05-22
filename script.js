let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let head1 = document.querySelector("#head1");
let head2 = document.querySelector("#head2");

let turnO = true;
let count = 0;
let h1 = 0;
let h2 = 0;

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    h1 = 0;
    h2 = 0;
    head1.innerText = `Player O`;
    head2.innerText = `Player X`;
    msgContainer.classList.add("hide");
};

let showCount = (cou) => {
    if(cou === "O"){
        h1++;
        head1.innerText = `Player O: ${h1}`;
    }else{
        h2++;
        head2.innerText = `Player X: ${h2}`;
    }
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO == true){
            box.innerText = "O";
            box.style.color = "green";
            turnO = false;
            showCount("O");
        }else{
            box.innerText = "X";
            box.style.color = "red";
            turnO = true;
            showCount("X");
        }
        box.disabled = true;
        count++;
        let isD = checkWinner();

        if(count === 9 && !isD){
            gameDraw();
        }
    
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
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

let checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);