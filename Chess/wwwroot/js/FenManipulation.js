function ManipulateFen(piece, dest, currentFEN) {
    // Split FEN into parts
    const parts = currentFEN.split(" ");
    const board = parts[0].split("/"); // Only take board part
    console.log(piece);
    console.log(dest);
    console.log(currentFEN);
    // Get coordinates
    const oldRow = parseInt(piece.getAttribute("data-row"));
    const oldCol = parseInt(piece.getAttribute("data-col"));
    const newRow = parseInt(dest.getAttribute("data-row"));
    const newCol = parseInt(dest.getAttribute("data-col"));
    const pieceSymbol = dest.getAttribute("data-piece");
    console.log(pieceSymbol);
    const color = pieceSymbol[0];
    const pieceName = pieceSymbol[1];


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

    for (let i = 0; i < board.length; i++) {
        let current = expandRow(board[i]);
        if (i === oldRow) {
            current[oldCol] = "";
        } else if (i === newRow) {
            current[newCol] = (color === "W") ? pieceName.toUpperCase() : pieceName.toLowerCase();
        }
        board[i] = collapseRow(current);
    }

    // Join the updated board into the final FEN string
    const newBoard = board.join("/");

    // Replace the old board part in the FEN string
    parts[0] = newBoard;
    const newFen = parts.join(" "); // Reconstruct the full FEN string

    return newFen;
}