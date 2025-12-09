currentFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

class Piece {

    constructor (piece) {
            this.node = piece;
            this.pieceName = piece.getAttribute("data-piece");
            this.row = parseInt(piece.getAttribute("data-row"));
            this.col = parseInt(piece.getAttribute("data-col"));
            this.color = this.pieceName ? this.pieceName[0] : null;
            this.pieceType = this.pieceName ? this.pieceName[1] : null;
            this.oppColor = this.color === "W" ? "B" : "W";
    }
}

function play(piece) {
    var item = new Piece(piece);

    const highlighted = document.querySelectorAll(".highlighted, .enemy, .highlightPiece");
    
    to_Play = currentFEN.split(" ")[1].toUpperCase();

    if (highlighted.length === 0 && (item.color === to_Play)) {
        if (!item.pieceName) return;
        Pieces(item, currentFEN);
    } 
    
    else {
        if ((item.pieceName && item.color === to_Play)) {
            Pieces(item, currentFEN);
        } else {
            const newFEN = Move(item, currentFEN);
            if (newFEN) {
                currentFEN = newFEN;
            }
        }
    }
    
    Checkmate(currentFEN);
}

function Promotion() {
    const button = document.getElementById("Promotion");
    const Promotion_box = document.getElementById("White_Promotion");
    button.addEventListener('click', () => {
        Promotion_box.style.display = 'block';
    })
}

function Checkmate(currentFEN) {
    const parts = currentFEN.split(" ");
    const board = parts[0].split("/");
    black = 0;
    white = 0;
    board.forEach(element => {
        for(i = 0; i < 9; i++) {
            if(element[i] === "k") {
                black = 1;
            }

            if(element[i] === "K") {
                white = 1;
            }            
        }
    });

    if(white === 0) {
        victoryBlack();
    }
    if(black === 0) {
        victoryWhite();
    }
}

function victoryBlack() {
    console.log("YEs");
    element = document.querySelector("#victory-B");
    element.style.display = "block";
}
function victoryWhite() {
    console.log("YEs");
    element = document.querySelector("#victory-W");
    element.style.display = "block";
}
function close_B() {
    console.log("YEs");
    element = document.querySelector(".close");
    element1 = document.querySelector("#victory-B");
    element1.style.display = "none";
}

function close_W() {
    console.log("YEs");
    element = document.querySelector(".close");
    element1 = document.querySelector("#victory-W");
    element1.style.display = "none";
}

function refreshed() {
    console.log("Xf");
    window.location.reload(true);
}