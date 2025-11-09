
function Pieces(item, currentFEN) {
    const piece = document.querySelector(`.square[data-row="${item.row}"][data-col="${item.col}"]`);
    console.log(currentFEN);
    item.node.classList.add('highlightPiece');

    if (item.pieceName === "WP") {
        if (item.row > 0) {
            const dest = item.row - 1;
            if (item.row <= 6 && item.row > 0) {
                let one = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${item.col}"]`);
                const pieceAtSquare = one.getAttribute("data-piece");
                if (!pieceAtSquare) {
                    one.classList.add('highlighted');
                }
            }

            if (item.row === 6) {
                let two = document.querySelector(`.square[data-row="${item.row - 2}"][data-col="${item.col}"]`);
                if (two) {
                    const pieceAtSquare1 = two.getAttribute("data-piece");
                    if (!pieceAtSquare1) {
                        two.classList.add('highlighted');
                    }
                }
            }

            let left = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${item.col - 1}"]`);
            let right = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${item.col + 1}"]`);

            if (left) {
                const leftPiece = left.getAttribute("data-piece");
                if (leftPiece && leftPiece[0] === "B") {
                    left.classList.add('highlighted');
                }
            }

            if (right) {
                const rightPiece = right.getAttribute("data-piece");
                if (rightPiece && rightPiece[0] === "B") {
                    right.classList.add('highlighted');
                }
            }

            let data = currentFEN.split(" ")[3];
            console.log(data);
            let enPassantCol = parseInt(data[0]);
            console.log(enPassantCol);
            if (data != "-" && (Math.abs(enPassantCol - item.col) === 1) && item.row === 3) {
                let enPassantSq = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${enPassantCol}"]`);
                const pieceAtSquare3 = enPassantSq.getAttribute("data-piece");
                if (!pieceAtSquare3) {
                    enPassantSq.classList.add('highlighted');
                }
            }
        }
    }

    if (item.pieceName === "BP") {
        if (item.row > 0) {
            
            if (item.row <= 6 && item.row > 0) {
                let one = document.querySelector(`.square[data-row="${item.row + 1}"][data-col="${item.col}"]`);
                const pieceAtSquare = one.getAttribute("data-piece");
                if (!pieceAtSquare) {
                    one.classList.add('highlighted');
                }
            }

            if (item.row === 1) {
                let two = document.querySelector(`.square[data-row="${item.row + 2}"][data-col="${item.col}"]`);
                const pieceAtSquare1 = two.getAttribute("data-piece");
                if (!pieceAtSquare1) {
                    two.classList.add('highlighted');
                }
            }

            let left = document.querySelector(`.square[data-row="${item.row + 1}"][data-col="${item.col - 1}"]`);
            let right = document.querySelector(`.square[data-row="${item.row + 1}"][data-col="${item.col + 1}"]`);

            if (left) {
                const leftPiece = left.getAttribute("data-piece");
                if (leftPiece && leftPiece[0] === "W") {
                    left.classList.add('highlighted');
                }
            }

            if (right) {
                const rightPiece = right.getAttribute("data-piece");
                if (rightPiece && rightPiece[0] === "W") {
                    right.classList.add('highlighted');
                }
            }

            let data = currentFEN.split(" ")[3];
            console.log(data);
            let enPassantCol = parseInt(data[0]);
            console.log(enPassantCol);
            if (data != "-" && (Math.abs(enPassantCol - item.col) === 1) && item.row === 4) {
                let enPassantSq = document.querySelector(`.square[data-row="${item.row + 1}"][data-col="${enPassantCol}"]`);
                const pieceAtSquare3 = enPassantSq.getAttribute("data-piece");
                if (!pieceAtSquare3) {
                    enPassantSq.classList.add('highlighted');
                }
            }
        }
    }
}

function Move(square, currentFEN) {
    let avail = false;

    document.querySelectorAll(".highlighted").forEach(sq => {
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

        const piece = shooter.getAttribute("data-piece");
        shooter.setAttribute("data-piece", "");
        shooter.innerHTML = "";
        shooter.classList.remove("highlightPiece");

        square.node.innerHTML = `<img src="/Images/${origin.pieceName}.png" alt="${origin.pieceName}" />`;
        square.node.setAttribute("data-piece", origin.pieceName);

        document.querySelectorAll(".highlighted, .highlightPiece")
            .forEach(sq => sq.classList.remove("highlighted", "highlightPiece"));

        let newFEN = ManipulateFen(origin, square, currentFEN);
        
        return newFEN;
        
    }

    
    document.querySelectorAll(".highlighted, .highlightPiece")
        .forEach(sq => sq.classList.remove("highlighted", "highlightPiece"));
}

