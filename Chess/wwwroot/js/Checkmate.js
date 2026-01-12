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
        CheckCase.possibleMoves.push(...checks[0]);
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