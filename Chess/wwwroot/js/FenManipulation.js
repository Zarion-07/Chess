function ManipulateFen(origin, dest, currentFEN) {
    // Split FEN into parts
    const parts = currentFEN.split(" ");
    const board = parts[0].split("/"); // Only take board part
    
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

    for (let i = 0; i < board.length; i++) {
        let current = expandRow(board[i]);

        if (i === origin.row) {
            current[origin.col] = "";
        }

        if (i === dest.row) {
            current[dest.col] = (origin.color === "W") ? origin.pieceType.toUpperCase() : origin.pieceType.toLowerCase();
        }

        board[i] = collapseRow(current);
    }

    if (origin.pieceType === "P" && Math.abs(dest.row - origin.row) === 2) {
        const enPassantRow = (origin.color === "W") ? origin.row - 1 : origin.row + 1;
        parts[3] = `${dest.col}${enPassantRow}`;
        console.log(parts[3]);
    } else {
        parts[3] = "-";
        console.log("no en passant");
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
