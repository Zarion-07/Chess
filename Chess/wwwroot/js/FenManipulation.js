function ManipulateFen(origin, dest, currentFEN) {
    const parts = currentFEN.split(" ");
    const board = parts[0].split("/");
    
    console.log(currentFEN);

    const expandRow = (rowStr) => {
        let arr = [];
        for (let ch of rowStr) {
            if (!isNaN(ch)) {
                arr.push(...Array(parseInt(ch)).fill(""));
            } else {
                arr.push(ch);
            }
        }
        return arr;
    };

    const collapseRow = (arr) => {
        let out = "";
        let empty = 0;
        for (let cell of arr) {
            if (cell === "") empty++;
            else {
                if (empty > 0) {
                    out += empty;
                    empty = 0;
                }
                out += cell;
            }
        }
        if (empty > 0) out += empty;
        return out;
    };
            
    if (origin.pieceType === "P" && (Math.abs(origin.row - dest.row) === 1) && (Math.abs(origin.col - dest.col) === 1) && !(currentFEN.split(" ")[3] === "-")) { 
        
        let current = expandRow(board[origin.row - 1]);
        current[dest.col - 1] = "";
        
        board[origin.row - 1] = collapseRow(current);
    }
    
    for (i = 0; i < board.length; i++) {
        let current = expandRow(board[i]);
        if (i === origin.row - 1) {
            current[origin.col - 1] = "";
        }
        if (i === dest.row - 1) {
            current[dest.col - 1] = (origin.color === "W") ? origin.pieceType.toUpperCase() : origin.pieceType.toLowerCase();
        }
        board[i] = collapseRow(current);
    }
    

    if (origin.pieceType === "P" && Math.abs(dest.row - origin.row) === 2) {
        const enPassantRow = (origin.color === "W") ? dest.row : dest.row;
        const file = "abcdefgh"
        parts[3] = `${file[dest.col - 1]}${enPassantRow}`;
    } else {
        parts[3] = "-";
    }

    parts[1] = (origin.color === "W") ? "b" : "w";
    // Join the updated board into the final FEN string
    const newBoard = board.join("/");

    // Replace the old board part in the FEN string
    parts[0] = newBoard;
    const newFEN = parts.join(" "); // Reconstruct the full FEN string

    console.log(newFEN);
    return newFEN;
}

function whitePromotion() {
    console.log("YE");
    element = document.querySelector("#White_Promotion");
    element.style.display = "inline-block";
}

function changeImage(piece, dest) {
    if(origin.color === "W") {
            const piece = whitePromotion();
            board[1][dest.col] = piece;
            changeImage(piece, dest);
        }
    if(origin.color === "B") {
        const piece = blackPromotion();
        board[8][dest.col] = piece;
        changeImage(piece, dest);
    }


    const square = document.querySelector(`.square[data-row="${dest.row}"][data-col="${dest.col}"]`);
    if(piece === "Q") {
        square.innerHTML = '<img src="~/Images/WQ.png" alt="WQ" />';
        square.dataset.customValue = "WQ";
    }

    else if(piece === "R") {
        square.innerHTML = '<img src="~/Images/WQ.png" alt="WR" />';
        square.dataset.customValue = "WR";
    }

    else if(piece === "B") {
        square.innerHTML = '<img src="~/Images/WB.png" alt="WB" />';
        square.dataset.customValue = "WB";
    }

    else if(piece === "K") {
        square.innerHTML = '<img src="~/Images/WK.png" alt="WK" />';
        square.dataset.customValue = "WK";
    }

    else if(piece === "q") {
        square.innerHTML = '<img src="~/Images/BQ.png" alt="BQ" />';
        square.dataset.customValue = "BQ";
    }

    else if(piece === "r") {
        square.innerHTML = '<img src="~/Images/BR.png" alt="BR" />';
        square.dataset.customValue = "BQ";
    }

    else if(piece === "b") {
        square.innerHTML = '<img src="~/Images/BB.png" alt="BB" />';
        square.dataset.customValue = "BQ";
    }

    else if(piece === "k") {
        square.innerHTML = '<img src="~/Images/BK.png" alt="BK" />';
        square.dataset.customValue = "BQ";
    }
    console.log(square);
}

function castlingFEN(origin, rook, currentFEN) {
    const parts = currentFEN.split(" ");
    const board = parts[0].split("/");
    
    console.log(origin);

    const expandRow = (rowStr) => {
        let arr = [];
        for (let ch of rowStr) {
            if (!isNaN(ch)) {
                arr.push(...Array(parseInt(ch)).fill(""));
            } else {
                arr.push(ch);
            }
        }
        return arr;
    };

    const collapseRow = (arr) => {
        let out = "";
        let empty = 0;
        for (let cell of arr) {
            if (cell === "") empty++;
            else {
                if (empty > 0) {
                    out += empty;
                    empty = 0;
                }
                out += cell;
            }
        }
        if (empty > 0) out += empty;
        return out;
    };

    if (origin.color === "W" && rook.col === 4) {
        let updateRow = expandRow(board[7]);
        updateRow[4] = "";
        updateRow[0] = "";
        updateRow[2] = "K";
        updateRow[3] = "R";
        board[7] = collapseRow(updateRow);
        
        parts[0] = board.join("/");
        parts[1] = (origin.color === "W") ? "b" : "w";
        const newBoard = board.join("/");

        parts[0] = newBoard;
        currentFEN = parts.join(" ");
        return currentFEN;
    }

    else if (origin.color === "W" && rook.col === 6) {
        let updateRow = expandRow(board[7]);
        updateRow[4] = "";
        updateRow[7] = "";
        updateRow[6] = "K";
        updateRow[5] = "R";
        board[7] = collapseRow(updateRow);
        console.log(board);
        parts[0] = board.join("/");
        parts[1] = (origin.color === "W") ? "b" : "w";
        const newBoard = board.join("/");
        
        parts[0] = newBoard;
        currentFEN = parts.join(" ");
        return currentFEN;
    }
    else if (origin.color === "B" && rook.col === 4) {
        let updateRow = expandRow(board[0]);
        updateRow[4] = "";
        updateRow[0] = "";
        updateRow[2] = "k";
        updateRow[3] = "r";
        board[0] = collapseRow(updateRow);
        parts[0] = board.join("/");
        parts[1] = (origin.color === "W") ? "b" : "w";
        const newBoard = board.join("/");
        
        parts[0] = newBoard;
        currentFEN = parts.join(" ");
        return currentFEN;
    }
    else if (origin.color === "B" && rook.col === 6) {
        let updateRow = expandRow(board[0]);
        updateRow[4] = "";
        updateRow[7] = "";
        updateRow[6] = "k";
        updateRow[5] = "r";
        board[0] = collapseRow(updateRow);
        parts[0] = board.join("/");
        parts[1] = (origin.color === "W") ? "b" : "w";
        const newBoard = board.join("/");
        
        parts[0] = newBoard;
        currentFEN = parts.join(" ");
        return currentFEN;
    }

    return null;
}

function White_Castle() {

}
