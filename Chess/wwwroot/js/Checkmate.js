function isCheckmated(item) {
    const enemyKing = new Piece(document.querySelector(`.square[data-piece="${item.oppColor}K"]`));
    const kingMoves = kingMoveCheck(enemyKing);
    CheckCase.kingMoves = [];
    console.log(kingMoves)
    if(kingMoves.length > 0) {
        CheckCase.kingMoves.push(...kingMoves);
    }

    const pieces = document.querySelectorAll(`.square[data-piece^="${item.color}"]`);
    const checks = [];
    pieces.forEach ((piece) => {
        let move = possibleMove(piece);
        
        if(move.at(-1) === "1") {
            console.log(move);
            move.splice(-1,1);
            console.log(move);
            checks.push(move);
            CheckCase.node.push(piece);
        }
    })

    if(checks.length === 1) {
        CheckCase.possibleMoves = [];
        checkmate(item);
        console.log(checks[0])
        CheckCase.possibleMoves.push(...checks[0]);
        const statusCheck = checkmate(item);
        if(statusCheck && CheckCase.kingMoves.length === 0) {
            if(item.color === "W") {
                victoryWhite();
                return null;
            } else {
                victoryBlack();
                return null;
            }
        }
        console.log(CheckCase.possibleMoves)
        return CheckCase.possibleMoves;
    }
    console.log(CheckCase.kingMoves)
    console.log(checks)
    if (checks.length > 1 && CheckCase.kingMoves.length === 0) {
        console.log(CheckCase.kingMoves.length === 0)
        console.log(checks.length > 1)
        if(item.color === "W") {
            victoryWhite();
            return null;
        } else {
            victoryBlack();
            return null;
        }
    } else if(checks.length > 1 && CheckCase.kingMoves.length !== 0) {
        return CheckCase.kingMoves;
    }
    return checks[0];
}

function checkmate(item) {
    pieces = document.querySelectorAll(`.square[data-piece^="${item.oppColor}"]`);
    let islost = true;
    for(const piece of pieces) {
        const name = new Piece(piece);
        move = pinCheck(piece);
        if(move.some(element => CheckCase.possibleMoves.includes(element)) && name.pieceType !== "K") {
            console.log(move, piece);
            islost = false;
            break;
        }
    }
    console.log(islost);
    return islost;
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

function inCheck(item) {
    const oppPieces = document.querySelectorAll(`.square[data-piece^="${item.color}"]`);
    for(let move of oppPieces) {
        item = check(move);
        
        if (item.at(-1) == 1) {
            console.log(item, move)
            CheckCase.checked = true;
            CheckCase.testing = true;
            break;
        }
    }
}

function victoryBlack() {
    element = document.querySelector("#victory-B");
    element.style.display = "flex";
    
}
function victoryWhite() {
    element = document.querySelector("#victory-W");
    element.style.display = "flex";
}
function close_B() {
    element1 = document.querySelector("#victory-B");
    element1.style.display = "none";
}

function close_W() {
    element1 = document.querySelector("#victory-W");
    element1.style.display = "none";
}

function refreshed() {
    window.location.reload(true);
}

let pgn = [];
let count = 0;

function createPGN(target) {
    if(target.color === "W") {
        pgn.push(`${count + 1}.`);
    } 

    let move = [];
    let column = target.col + parseInt('`'.charCodeAt(0));

    let array = check(target);
    if(array.at(-1) === 1) {
        move.push("+");
    }

    if(target.node.classList.contains('enemy') && !(move.contains("+"))) {
        move.push("x");
    }

    if(target.pieceName === "P") {
        move.push(column);
        move.push(target.row);
    } else {
        move.push(target.pieceName);
        move.push(column);
        move.push(target.row);
    }

    if(target.node.classList.contains('special')) {
        move = [];
        move.push("O-O");
    }
    pgn.push(move.join());
    pgn.push(' ');
}