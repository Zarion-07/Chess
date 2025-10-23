
function Pieces(pieceid, row, col, currentFEN) {
    const item = document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);
    console.log(currentFEN);
    item.classList.add('highlightPiece');
    if (pieceid === "WP") {
        if (row > 0) {
            const dest = row - 1;
            if (row <= 6 && row > 0) {
                let one = document.querySelector(`.square[data-row="${row - 1}"][data-col="${col}"]`);
                const pieceAtSquare = one.getAttribute("data-piece");
                if (!pieceAtSquare) {
                    one.classList.add('highlighted');
                }
            }

            if (row === 6) {
                let two = document.querySelector(`.square[data-row="${row - 2}"][data-col="${col}"]`);
                const pieceAtSquare1 = two.getAttribute("data-piece");
                if (!pieceAtSquare1) {
                    two.classList.add('highlighted');
                }
            }

            let left = document.querySelector(`.square[data-row="${row - 1}"][data-col="${col - 1}"]`);
            let right = document.querySelector(`.square[data-row="${row - 1}"][data-col="${col + 1}"]`);
            if (left && left.getAttribute("data-piece")[0] === "B") {
                left.classList.add('highlighted');
            }

            if (right && right.getAttribute("data-piece")[0] === "B") {
                right.classList.add('highlighted');
            }

            let data = currentFEN.split(" ")[3];
            console.log(data);
            let enPassantCol = parseInt(data[0]);
            console.log(enPassantCol);
            if (data != "-" && (Math.abs(enPassantCol - col) === 1) && row === 3) {
                let enPassantSq = document.querySelector(`.square[data-row="${row - 1}"][data-col="${enPassantCol}"]`);
                const pieceAtSquare3 = enPassantSq.getAttribute("data-piece");
                if (!pieceAtSquare3) {
                    enPassantSq.classList.add('highlighted');
                }
            }
        }
    }

    if (pieceid === "BP") {
        if (row > 0) {
            const dest = row - 1;
            if (row <= 6 && row > 0) {
                let one = document.querySelector(`.square[data-row="${row + 1}"][data-col="${col}"]`);
                const pieceAtSquare = one.getAttribute("data-piece");
                if (!pieceAtSquare) {
                    one.classList.add('highlighted');
                }
            }

            if (row === 1) {
                let two = document.querySelector(`.square[data-row="${row + 2}"][data-col="${col}"]`);
                const pieceAtSquare1 = two.getAttribute("data-piece");
                if (!pieceAtSquare1) {
                    two.classList.add('highlighted');
                }
            }

            let left = document.querySelector(`.square[data-row="${row + 1}"][data-col="${col - 1}"]`);
            let right = document.querySelector(`.square[data-row="${row + 1}"][data-col="${col + 1}"]`);
            if (left && left.getAttribute("data-piece")[0] === "W") {
                left.classList.add('highlighted');
            }

            if (right && right.getAttribute("data-piece")[0] === "W") {
                right.classList.add('highlighted');
            }

            let data = currentFEN.split(" ")[3];
            console.log(data);
            let enPassantCol = parseInt(data[0]);
            console.log(enPassantCol);
            if (data != "-" && (Math.abs(enPassantCol - col) === 1) && row === 4) {
                let enPassantSq = document.querySelector(`.square[data-row="${row + 1}"][data-col="${enPassantCol}"]`);
                const pieceAtSquare3 = enPassantSq.getAttribute("data-piece");
                if (!pieceAtSquare3) {
                    enPassantSq.classList.add('highlighted');
                }
            }
        }
    }
}

function Move(square, currentFEN) {
    const row = parseInt(square.getAttribute("data-row"));
    const col = parseInt(square.getAttribute("data-col"));
    let avail = false;

    document.querySelectorAll(".highlighted").forEach(sq => {
        if (
            row === parseInt(sq.getAttribute("data-row")) &&
            col === parseInt(sq.getAttribute("data-col"))
        ) {
            avail = true;
        }
    });

    if (avail) {
        const shooter = document.querySelector(".highlightPiece");
        const piece = shooter.getAttribute("data-piece");
        shooter.setAttribute("data-piece", "");
        shooter.innerHTML = "";
        shooter.classList.remove("highlightPiece");

        square.innerHTML = `<img src="/Images/${piece}.png" alt="${piece}" />`;
        square.setAttribute("data-piece", piece);

        

        document.querySelectorAll(".highlighted, .highlightPiece")
            .forEach(sq => sq.classList.remove("highlighted", "highlightPiece"));

        let newFEN = ManipulateFen(shooter, square, currentFEN);
        
        return newFEN;
        
    }

    
    document.querySelectorAll(".highlighted, .highlightPiece")
        .forEach(sq => sq.classList.remove("highlighted", "highlightPiece"));
}

