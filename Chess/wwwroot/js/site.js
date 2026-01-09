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
    const item = new Piece(piece);

    const highlighted = document.querySelectorAll(".highlighted, .enemy, .highlightPiece");
    
    to_Play = currentFEN.split(" ")[1].toUpperCase();

    if (highlighted.length === 0 && (item.color === to_Play)) {
        if (!item.pieceName) return;
        
        if(item.pieceType === "K" && item.color === to_Play) {
            kingMove(item);
        } else {
            const dict = isPinned(item);

            if(dict) {
                console.log(dict);
                if(dict.size === 1) {
                    
                    const pinArray = Array.from(dict)[0];
                    const node = new Piece(pinArray[0]);
                    const array = [];
                    const rowDir = pinArray[1][0];
                    const colDir = pinArray[1][1];
                    let dist = 0;
                    while (true) {
                        const allowedRow = node.row + rowDir*dist;
                        const allowedCol = node.col + colDir*dist;
                        const element = `${allowedRow}${allowedCol}`;
                        console.log(element);
                        if (allowedCol > 8 || allowedRow > 8 || allowedCol < 1 || allowedRow < 1) break;
                        array.push(element);
                        dist++;
                    }

                    const pieceArray = pinCheck(item.node);
                    console.log(pieceArray, array);
                    const commonMoves = array.filter(item => pieceArray.includes(item));

                    commonMoves.forEach(move => {
                        const targetNode = document.querySelector(`.square[data-row="${move[0]}"][data-col="${move[1]}"]`);
                        const data = targetNode.getAttribute("data-piece");
                        console.log(targetNode);
                        if(data[0] === piece.oppColor) {
                            targetNode.classList.add('enemy');
                        }

                        else {
                            targetNode.classList.add('highlighted');
                        }

                        
                    })
                    Checkmate(currentFEN);
                    return false;
                }

                else {
                    Move(item, currentFEN);
                }
            }
            Pieces(item, currentFEN);

        }
    } 
    
    else {
        const selected = document.querySelector(".highlightPiece");

        if(!selected) {
            return false;
        }
        const compare = new Piece(selected);
        if ((item.pieceName && item.node !== compare.node && item.color === to_Play)) {
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
    div = document.querySelector(".container-VB");
    div.classList.add("overlay");
    element = document.querySelector("#victory-B");
    element.style.display = "block";
    
}
function victoryWhite() {
    console.log("YEs");
    div = document.querySelector(".container-VW");
    div.classList.add("overlay");
    element = document.querySelector("#victory-W");
    element.style.display = "block";
}
function close_B() {
    console.log("YEs");
    element = document.querySelector(".close");
    element1 = document.querySelector("#victory-B");
    element1.style.display = "none";
    div = document.querySelector(".container-VB");
    div.classList.remove("overlay");
}

function close_W() {
    console.log("YEs");
    element = document.querySelector(".close");
    element1 = document.querySelector("#victory-W");
    element1.style.display = "none";
    div = document.querySelector(".container-VW");
    div.classList.remove("overlay");
}

function refreshed() {
    console.log("Xf");
    div = document.querySelector(".container-VW");
    div.classList.remove("overlay");
    div = document.querySelector(".container-VB");
    div.classList.remove("overlay");
    window.location.reload(true);
}