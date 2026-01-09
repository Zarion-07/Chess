let currentFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

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

            if(dict && dict.size == 1) {
                pinImplementation(dict, item, currentFEN);
            } 
            
            else if(dict && dict.size >= 2) {
                return;
            }

            else {
                Pieces(item, currentFEN);
            }
        }
    } 
    
    else {
        const selected = document.querySelector(".highlightPiece");

        if(!selected) {
            
            document.querySelectorAll(".highlighted, .enemy")
                .forEach(sq => sq.classList.remove("highlighted", "enemy"));
            return;
        }
        
        const compare = new Piece(selected);
        
        if ((item.pieceName && item.node !== compare.node && item.color === to_Play)) {
            
            document.querySelectorAll(".highlighted, .highlightPiece, .enemy")
                .forEach(sq => sq.classList.remove("highlighted", "highlightPiece", "enemy"));
            
            if(item.pieceType === "K") {
                kingMove(item);
            } else {
                const dict = isPinned(item);

                if(dict && dict.size == 1) {
                    pinImplementation(dict, item, currentFEN);
                }
                
                else if(dict && dict.size >= 2) {
                    return;
                }

                else {
                    Pieces(item, currentFEN);
                }
            }
        } 
       
        else {
            const newFEN = Move(item, currentFEN);
            if (newFEN) {
                currentFEN = newFEN;
            }
        }
    }
    
    Checkmate(currentFEN);
}

function Checkmate(currentFEN) {
    const parts = currentFEN.split(" ");
    const board = parts[0].split("/");
    let black = 0;  
    let white = 0;  
    
    board.forEach(element => {
        for(let i = 0; i < element.length; i++) {
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

function pinImplementation(dict, item, currentFEN) {
    const pinArray = Array.from(dict)[0];
    const node = new Piece(pinArray[0]);
    const array = [];
    const rowDir = pinArray[1][0];
    const colDir = pinArray[1][1];
    let dist = 0;
    
    while (true) {
        const allowedRow = node.row + rowDir*dist;
        const allowedCol = node.col + colDir*dist;
        
        if (allowedCol > 8 || allowedRow > 8 || allowedCol < 1 || allowedRow < 1) break;
        
        const element = `${allowedRow}${allowedCol}`;
        array.push(element);
        dist++;
    }
    const pieceArray = pinCheck(item.node);
    const commonMoves = array.filter(move => pieceArray.includes(move));

    if (commonMoves.length > 0) {
        item.node.classList.add('highlightPiece');
        
        commonMoves.forEach(move => {
            const targetNode = document.querySelector(`.square[data-row="${move[0]}"][data-col="${move[1]}"]`);
            if (targetNode) {
                const dataPiece = targetNode.getAttribute("data-piece");

                let data = currentFEN.split(" ")[3];
                let file = data[0];
                file = file.charCodeAt(0) - '`'.charCodeAt(0);
                let enPassantCol = parseInt(file);
                
                if (data != "-" && (Math.abs(enPassantCol - item.col) === 1) && item.row === 4 && item.pieceName === "WP") {

                    let enPassantSq = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${enPassantCol}"]`);
                    const pieceAtSquare3 = enPassantSq.getAttribute("data-piece");
                    console.log("W");
                    if (!pieceAtSquare3 && enPassantCol == move[1] && item.row == 4) {
                        targetNode.classList.add('enemy');
                        return;
                    }
                } 

                if (data != "-" && (Math.abs(enPassantCol - item.col) === 1) && item.row === 5 && item.pieceName === "BP") {

                    let enPassantSq = document.querySelector(`.square[data-row="${item.row + 1}"][data-col="${enPassantCol}"]`);
                    const pieceAtSquare3 = enPassantSq.getAttribute("data-piece");
                    
                    if (!pieceAtSquare3 && enPassantCol == move[1] && move[0] == 5) {
                        targetNode.classList.add('enemy');
                        return;
                    }
                }

                if(dataPiece && dataPiece[0] === item.oppColor) {
                    targetNode.classList.add('enemy');
                } else {
                    console.log("a");
                    targetNode.classList.add('highlighted');
                }
            }
        });
        return;
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