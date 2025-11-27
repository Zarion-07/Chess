currentFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

class Piece {

    constructor (piece) {
            this.node = piece;
            this.pieceName = piece.getAttribute("data-piece");
            this.row = parseInt(piece.getAttribute("data-row"));
            this.col = parseInt(piece.getAttribute("data-col"));
            this.color = this.pieceName ? this.pieceName[0] : null;
            this.pieceType = this.pieceName ? this.pieceName[1] : null;
            this.oppColor = this.color === "W" ? "B" : "W";
    }
}

function play(piece) {
    var item = new Piece(piece);

    const highlighted = document.querySelectorAll(".highlighted, .enemy, .highlightPiece");
    
    to_Play = currentFEN.split(" ")[1].toUpperCase();

    

    console.log(item.oppColor);
    if (highlighted.length === 0 && (item.color === to_Play)) {
        if (!item.pieceName) return;
        Pieces(item, currentFEN);
    } 
    
    else {
        if ((item.pieceName && item.color === to_Play)) {
            Pieces(item, currentFEN);
        } else {
            const newFEN = Move(item, currentFEN);
            if (newFEN) {
                currentFEN = newFEN;
            }
        }
    }
    
}

function Promotion() {
    const button = document.getElementById("Promotion");
    const Promotion_box = document.getElementById("White_Promotion");
    button.addEventListener('click', () => {
        Promotion_box.style.display = 'block';
    })
}