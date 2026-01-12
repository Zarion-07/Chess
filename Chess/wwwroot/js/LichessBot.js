class LichessEngine {
    constructor() {
        this.baseUrl = 'https://lichess.org/api/cloud-eval';
    }
    
    async getBestMove(fen, callback, multiPv = 1) {
        try {
            const url = `https://lichess.org/api/cloud-eval?fen=${encodeURIComponent(fen)}&multiPv=1`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.pvs && data.pvs.length > 0) {
                const bestMove = data.pvs[0].moves.split(' ')[0];
                callback(bestMove);
            } else {
                console.error('No moves found in response');
            }
        } catch (error) {
            console.error('Error getting move from Lichess:', error);
        }
    }
}

const engine = new LichessEngine();

function makeBotMove() {
    engine.getBestMove(currentFEN, (move) => {
        console.log('Lichess suggests:', move);
        executeMove(move);
    });
}

function executeMove(uciMove) {
    const fromFile = uciMove[0].charCodeAt(0) - 96; 
    const fromRank = 9 - parseInt(uciMove[1]); 
    const toFile = uciMove[2].charCodeAt(0) - 96;
    const toRank = 9 - parseInt(uciMove[3]);
    
    const fromSquare = document.querySelector(
        `.square[data-row="${fromRank}"][data-col="${fromFile}"]`
    );
    const toSquare = document.querySelector(
        `.square[data-row="${toRank}"][data-col="${toFile}"]`
    );
    
    if (fromSquare && toSquare) {
        playBot(fromSquare);
        setTimeout(() => playBot(toSquare), 150);
    }
}

function triggerBotIfNeeded() {
    const currentPlayer = currentFEN.split(" ")[1];
    
    if (currentPlayer === 'b' && !CheckCase.checkmated) {
        setTimeout(() => {
            makeBotMove();
        }, 500);
    }
}

const player = "W";

function playBot(piece) {
    const item = new Piece(piece);
    const highlighted = document.querySelectorAll(".highlighted, .enemy, .highlightPiece");
    to_Play = currentFEN.split(" ")[1].toUpperCase();
    let moveMade = false;

    if (highlighted.length === 0 && (item.color === to_Play)) {
        
        if (!item.pieceName) return;
        
        if(item.pieceType === "K" && item.color === to_Play) {
            kingMove(item);
            return;
        } else {
            const dict = isPinned(item);
            
            if(dict && dict.size == 1) {
                pinImplementation(dict, item, currentFEN);
                
            } 
            
            else if(dict && dict.size >= 2) {
                return;
            }

            else {
                if(CheckCase.testing === true) {
                    moves = pinCheck(piece);
                    const commonElements = moves.filter(value => CheckCase.possibleMoves.includes(value));
                    
                    if(commonElements.length > 0) {
                        item.node.classList.add('highlightPiece');
                        commonElements.forEach(element => {
                            const node = document.querySelector(`.square[data-row="${element[0]}"][data-col="${element[1]}"]`);
                            const data = node.getAttribute("data-piece");
                            console.log(element);
                            if(data && data[0] === item.oppColor) {
                                node.classList.add('enemy');
                            } else {
                                node.classList.add('highlighted');
                            }
                        })
                    }
                } else {
                    Pieces(item, currentFEN);
                }
            }
        }
    } 
    
    else {
        const selected = document.querySelector(".highlightPiece");

        if(!selected) {
            console.log(item);
            document.querySelectorAll(".highlighted, .enemy")
                .forEach(sq => sq.classList.remove("highlighted", "enemy"));
            return;
        }
        
        const compare = new Piece(selected);
        console.log(item)
        if ((item.pieceName && item.node !== compare.node && item.color === to_Play)) {
            
            document.querySelectorAll(".highlighted, .highlightPiece, .enemy")
                .forEach(sq => sq.classList.remove("highlighted", "highlightPiece", "enemy"));
            
            if(item.pieceType === "K") {
                kingMove(item);
                return;
            } else {
                
                const dict = isPinned(item);

                if(dict && dict.size == 1 && CheckCase.testing === false) {
                    pinImplementation(dict, item, currentFEN);
                }
                
                else if(dict && dict.size >= 2) {
                    return;
                }

                else {
                    if(CheckCase.testing === true) {
                        moves = pinCheck(piece);
                        console.log(CheckCase.possibleMoves);
                        const commonElements = moves.filter(value => CheckCase.possibleMoves.includes(value));
                        
                        if(commonElements.length > 0) {
                            item.node.classList.add('highlightPiece');
                            commonElements.forEach(element => {
                                const node = document.querySelector(`.square[data-row="${element[0]}"][data-col="${element[1]}"]`);
                                const data = node.getAttribute("data-piece");
                                
                                if(data && data[0] === item.oppColor) {
                                    node.classList.add('enemy');
                                } else {
                                    node.classList.add('highlighted');
                                }
                            })
                        }
                    } else {
                        Pieces(item, currentFEN);
                    }
                }
            }
        } 

        else if(item.node === compare.node) {
            document.querySelectorAll(".highlighted, .enemy, .highlightPiece")
                .forEach(sq => sq.classList.remove("highlighted", "enemy", "highlightPiece"));
            return;
        }
        
        // THIS IS THE ACTUAL MOVE EXECUTION BLOCK (was missing!)
        else {
            const newFEN = Move(item, currentFEN);
            moveMade = true;
            
            // Reset check state
            if(CheckCase.testing === true) CheckCase.testing = false;
            CheckCase.checked = false;
            CheckCase.possibleMoves = [];
            CheckCase.kingMoves = [];
            CheckCase.node = [];
            
            const destinationSquare = document.querySelector(
                `.square[data-row="${item.row}"][data-col="${item.col}"]`
            );
            const movedPiece = new Piece(destinationSquare);

            console.log(movedPiece);
            inCheck(movedPiece);
            
            if (newFEN) {
                currentFEN = newFEN;
                
                // Check for checkmate after move
                if(CheckCase.checked === true) {
                    const possibleMoves = isCheckmated(movedPiece);
                    console.log(possibleMoves);
                    if(possibleMoves) CheckCase.checkmated = false;
                    else CheckCase.checkmated = true;
                }
                
                // TRIGGER BOT HERE
                triggerBotIfNeeded();
            }
        }
    }
}