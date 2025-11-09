
let currentFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

class Piece {

    constructor (piece) {
            this.node = piece;
            this.pieceName = piece.getAttribute("data-piece");
            this.row = parseInt(piece.getAttribute("data-row"));
            this.col = parseInt(piece.getAttribute("data-col"));
            this.color = this.pieceName ? this.pieceName[0] : null;
            this.pieceType = this.pieceName ? this.pieceName[1] : null;
    }
}

function play(piece) {

    var item = new Piece(piece);

    const highlighted = document.querySelectorAll(".highlighted");
    console.log(item.col);
    console.log(item.row);
    if (highlighted.length === 0) {
        if (!item.pieceName) return;
        Pieces(item, currentFEN);

    } else {
        const newFEN = Move(item, currentFEN);
        if (newFEN) {
            currentFEN = newFEN;
        }
    }
    
}

