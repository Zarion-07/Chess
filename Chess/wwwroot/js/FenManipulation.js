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
