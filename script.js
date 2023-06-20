var cells = document.getElementsByClassName("bingoCell");

var cellTextOptions = [
    "Top",
    "Bottom",
    "Overly Sexual",
    "Verified X",
    "Bisexual",
    "Cuddling",
    "Poly",
    "Constantly Flirting",
    "Mommy",
    "Daddy",
    "Mental Illness",
    "Femboy",
    "Weird Sexualities",
    "Good Boy",
    "Pronouns in Bio",
    "Pride Flag",
    "Gay",
    "Infantile Speech",
    "Overly Long Bio",
    "Trauma Dump",
    "Fursicution",
    "Bear",
    "Princess",
    "Computer Science",
    "Minor",
    "Kink Avatar",
    "Phantom Sense",
    "Phantom Pain",
    "Sparkle Dog",
    "Internet Psychologist",
    "VRC Family",
    "Mute",
    "Narcissistic",
    "Licking",
    "Sniffing",
    "RP Noises",
    "Goo / Latex / Pool Toy",
    "Harness / BDSM",
    "Leash",
    "Jockstrap",
    "Bulge",
    "Large Breasts",
    "Physbones Too Strong",
    "DPS Enabled",
    "Gay as Personality",
    "Trans as Personality",
    "Edgy Character",
    "Headpats",
    "Repping Horny Group",
    "Role Play",
    "Horrible Grammar",
    "uwu / owo / :3",
    "Talking About Porn",
    "Invading Personal Space",
    "\"Shy\"",
    "Hypnotization",
    "Oversharing",
    "Constant Chatbox Popups",
    "Feet Stuff",
    "Beans",
]

var freeSpaceOptions = [
    "Mirror Dweller",
    "Daddy Issues",
    "Drama",
    "Cringe",
    "Weird",
]

var clickedCells = new Array(25).fill(false);
var score = 0;

var gotBingo = false;
var rowScores = [0, 0, 0, 0, 0];
var columnScores = [0, 0, 0, 0, 0];
var diagonalScores = [0, 0];

//Shuffles the array of cell text options
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

//Randomizes the text in each cell and removes the "clicked" class
function randomizeCells() {
    shuffle(cellTextOptions);
    shuffle(freeSpaceOptions);
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = cellTextOptions[i];
        cells[i].classList.remove("clicked");
    }
    cells[12].innerHTML = freeSpaceOptions[0] + "<br/>(Free Space)";
}

//Resets the game by randomizing and deselecting all cells
function resetGame() {
    gotBingo = false;
    clickedCells.fill(false);
    rowScores.fill(0);
    columnScores.fill(0);
    diagonalScores.fill(0);
    randomizeCells();
}

//Updates the score and displays it on the page
function updateScore(newScore) {
    if (newScore < 0) {
        newScore = 0;
    }

    score = newScore;
    document.getElementById("score").innerHTML = "Score: " + score;
}

//Checks if the player has a bingo and updates the score accordingly.
//If the player unchecks a cell and no longer has a bingo, the score will be updated to remove the point.
function checkBingo() {
    if (rowScores.includes(5) || columnScores.includes(5) || diagonalScores.includes(5)) {
        if (gotBingo) {
            return;
        }
        gotBingo = true;
        updateScore(score + 1);
    } else {
        if (!gotBingo) {
            return;
        }
        gotBingo = false;
        updateScore(score - 1);
    }
}

//Hooks up the "New Card" button to the function "resetGame"
document.getElementById("newCardButton").addEventListener("click", resetGame);

//Hooks up the "Add Point" button to the function "updateScore"
document.getElementById("addPointButton").addEventListener("click", function() { updateScore(score + 1); });

//Hooks up the "Remove Point" button to the function "updateScore"
document.getElementById("removePointButton").addEventListener("click", function() { updateScore(score - 1); });

//Loops through each cell and adds an event listener to each one
const backgroundColors = ["#F0F8FF", "#B0E0E6"];
for (var i = 0; i < cells.length; i++) {
    const index = i;
    cells[index].addEventListener("click", function() {
        //When the cell is clicked, it will toggle the class "clicked"
        this.classList.toggle("clicked");
        clickedCells[index] = !clickedCells[index];

        //Adds or removes a point from the row, column, and diagonal that the cell is in
        var row = Math.floor(index / 5);
        var column = index % 5;
        var scoreDifference = clickedCells[index] ? 1 : -1;
        
        rowScores[row] += scoreDifference;
        columnScores[column] += scoreDifference;
        if (row == column) {
            diagonalScores[0] += scoreDifference;
        }
        if (row + column == 4) {
            diagonalScores[1] += scoreDifference;
        }

        checkBingo();
    });

    cells[index].style.backgroundColor = backgroundColors[index % 2];
}

resetGame();