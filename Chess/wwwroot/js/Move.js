function Move(square, currentFEN) {
    let avail = false;
    let special = 0;
    let castleFEN;

    document.querySelectorAll(".highlighted, .enemy").forEach(sq => {
        if (
            square.row === parseInt(sq.getAttribute("data-row")) &&
            square.col === parseInt(sq.getAttribute("data-col"))
        ) {
            avail = true;
        }
    });

    if (avail) {
        const shooter = document.querySelector(".highlightPiece");
        var origin = new Piece(shooter);

        shooter.setAttribute("data-piece", "");
        shooter.innerHTML = "";

        
        if (origin.pieceType === "P") {

            const enPassant_Move = currentFEN.split(" ")[3];

            col = enPassant_Move[0].charCodeAt(0) - '`'.charCodeAt(0);
            enPassantCol = parseInt(col);
            enPassantRow = parseInt(enPassant_Move[1]);
            
            if (enPassantCol === square.col && (Math.abs(enPassantRow - origin.row) === 0) && (Math.abs(enPassantCol - origin.col) === 1) && !(enPassant_Move === "-")) {
                
                enPassantNode = document.querySelector(`.square[data-row="${enPassantRow}"][data-col="${enPassantCol}"]`);
                enPassantNode.setAttribute("data-piece", "");
                enPassantNode.innerHTML = "";
            }
        }

        const parts = currentFEN.split(" ");
        let castling = parts[2].split("");

        if (origin.pieceType === "R" && (castling[0] === "K" || castling[3] === "q") && origin.col === 8) {
            if (origin.color === "W") {
                castling[0] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }

            else {
                castling[3] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }
        }

        if (origin.pieceType === "R" && (castling[1] === "Q" || castling[2] === "k") && origin.col === 1) {
            if (origin.color === "W") {
                castling[1] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }

            else {
                castling[2] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }
        }

        if (origin.pieceName === "WK" && (castling[0] === "K" || castling[1] === "Q")) {

            const Qnode = document.querySelector(`.enemy[data-row="8"][data-col="3"]`);
            const Knode = document.querySelector(`.enemy[data-row="8"][data-col="7"]`);

            if (Qnode && square.col === 3) {
                
                currentRook = document.querySelector(`[data-row="8"][data-col="1"]`);
                currentRook.setAttribute("data-piece", "");
                currentRook.innerHTML = "";

                newRook = document.querySelector(`[data-row="8"][data-col="4"]`);
                newRook.innerHTML = `<img src="/Images/WR.png" alt="WR" />`;
                newRook.setAttribute("data-piece", "WR");

                var Rook = new Piece(newRook);
                castleFEN = castlingFEN(origin, Rook, currentFEN);

                castling[0] = "-";
                castling[1] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }

            else if (Knode && square.col === 7) {

                currentRook = document.querySelector(`[data-row="8"][data-col="8"]`);
                currentRook.setAttribute("data-piece", "");
                currentRook.innerHTML = "";

                newRook = document.querySelector(`[data-row="8"][data-col="6"]`);
                newRook.innerHTML = `<img src="/Images/WR.png" alt="WR" />`;
                newRook.setAttribute("data-piece", "WR");
                
                var Rook = new Piece(newRook);
                castleFEN = castlingFEN(origin, Rook, currentFEN);

                castling[0] = "-";
                castling[1] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }
            special = 1;
        }

        if (origin.pieceName === "BK" && (castling[2] === "k" || castling[3] === "q")) {

            const Qnode = document.querySelector(`.enemy[data-row="1"][data-col="3"]`);
            const Knode = document.querySelector(`.enemy[data-row="1"][data-col="7"]`);

            if (Qnode && square.col === 3) {
                
                currentRook = document.querySelector(`[data-row="1"][data-col="1"]`);
                currentRook.setAttribute("data-piece", "");
                currentRook.innerHTML = "";

                newRook = document.querySelector(`[data-row="1"][data-col="4"]`);
                newRook.innerHTML = `<img src="/Images/BR.png" alt="BR" />`;
                newRook.setAttribute("data-piece", "BR");

                var Rook = new Piece(newRook);
                castleFEN = castlingFEN(origin, Rook, currentFEN);

                castling[2] = "-";
                castling[3] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }

            else if (Knode && square.col === 7) {

                currentRook = document.querySelector(`[data-row="1"][data-col="8"]`);
                currentRook.setAttribute("data-piece", "");
                currentRook.innerHTML = "";

                newRook = document.querySelector(`[data-row="1"][data-col="6"]`);
                newRook.innerHTML = `<img src="/Images/BR.png" alt="BR" />`;
                newRook.setAttribute("data-piece", "BR");

                var Rook = new Piece(newRook);
                castleFEN = castlingFEN(origin, Rook, currentFEN);

                castling[2] = "-";
                castling[3] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }

            special = 1;
        }

        square.node.innerHTML = `<img src="/Images/${origin.pieceName}.png" alt="${origin.pieceName}" />`;
        square.node.setAttribute("data-piece", origin.pieceName);

        document.querySelectorAll(".highlighted, .highlightPiece, .enemy")
            .forEach(sq => sq.classList.remove("highlighted", "highlightPiece", "enemy"));

        if (special === 0) {
            let newFEN = ManipulateFen(origin, square, currentFEN);
            return newFEN;
        }
        
        else {
            let newFEN = castleFEN;
            return newFEN;
        }
    }

    
    document.querySelectorAll(".highlighted, .highlightPiece, .enemy")
        .forEach(sq => sq.classList.remove("highlighted", "highlightPiece", "enemy"));
}