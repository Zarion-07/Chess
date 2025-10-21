let currentFEN = localStorage.getItem("chessFEN") ||
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function play(piece) {
    var pieceid = piece.getAttribute("data-piece");
    var row = piece.getAttribute("data-row");
    var col = piece.getAttribute("data-col");
    row = parseInt(row, 10);
    col = parseInt(col, 10);

    const highlighted = document.querySelectorAll(".highlighted");

    if (highlighted.length === 0) {
        if (!pieceid || pieceid === "") return;
        Pieces(pieceid, row, col);
    }
    
    else {
        Move(piece, currentFEN);
        console.log(currentFEN);
    }
}

