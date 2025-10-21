
function Pieces(pieceid, row, col) {
    const item = document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);
    item.classList.add('highlightPiece');
    console.log(item);
    if (pieceid === "WP") {
        if (row > 0) {
            const dest = row - 1;
            if (row <= 6 && row > 0) {
                let one = document.querySelector(`.square[data-row="${row - 1}"][data-col="${col}"]`);
                if (!one.getAttribute("[data-piece]")) {
                    one.classList.add('highlighted');
                }
            }

            if (row === 6) {
                let two = document.querySelector(`.square[data-row="${row - 2}"][data-col="${col}"]`);
                if (!two.getAttribute("[data-piece]")) {
                    two.classList.add('highlighted');
                }
                console.log(two);
            }

            let left = document.querySelector(`.square[data-row="${row + 1}"][data-col="${col - 1}"]`);
            let right = document.querySelector(`.square[data-row="${row + 1}"][data-col="${col + 1}"]`);
            if (left.getAttribute("[data-piece]") != null) {
                left.classList.add('highlighted');
            }

            if (right.getAttribute("[data-piece]") != null) {
                right.classList.add('highlighted');
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

        console.log(`Moved ${piece} to [${row}, ${col}]`);
        document.querySelectorAll(".highlighted, .highlightPiece")
            .forEach(sq => sq.classList.remove("highlighted", "highlightPiece"));
        newFEN = ManipulateFen(shooter, square, currentFEN);
        console.log(newFEN);
        localStorage.setItem("chessFEN", newFEN);
        
    }
    document.querySelectorAll(".highlighted, .highlightPiece")
        .forEach(sq => sq.classList.remove("highlighted", "highlightPiece"));
}

